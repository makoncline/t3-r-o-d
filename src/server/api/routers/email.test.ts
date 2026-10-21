// @vitest-environment node
import { afterAll, beforeEach, expect, test, vi } from "vitest";
import type * as SES from "@aws-sdk/client-ses";
import { db } from "@/server/db";
import { siteConfig } from "@/config/site";
import { templateConfig } from "@/config/template";

const wire = vi.hoisted(() => {
  const bodies: string[] = [];
  return { bodies, fail: false };
});

vi.mock("@aws-sdk/client-ses", async (importOriginal) => {
  const actual = await importOriginal<typeof SES>();
  return {
    ...actual,
    SESClient: class extends actual.SESClient {
      constructor(options: ConstructorParameters<typeof actual.SESClient>[0]) {
        super({
          ...options,
          maxAttempts: 1,
          requestHandler: {
            handle(request: { body?: unknown }) {
              if (wire.fail) return Promise.reject(new Error("SES control failure"));
              if (typeof request.body !== "string") {
                return Promise.reject(new Error("Expected serialized SES query"));
              }
              wire.bodies.push(request.body);
              return Promise.resolve({
                response: {
                  statusCode: 200,
                  headers: { "content-type": "text/xml" },
                  body: Buffer.from(
                    '<SendRawEmailResponse xmlns="http://ses.amazonaws.com/doc/2010-12-01/"><SendRawEmailResult><MessageId>control-message</MessageId></SendRawEmailResult><ResponseMetadata><RequestId>control-request</RequestId></ResponseMetadata></SendRawEmailResponse>',
                  ),
                },
              });
            },
          },
        });
      }
    },
  };
});

import { emailRouter } from "./email";

const caller = emailRouter.createCaller({ db });
const input = { from: "customer@example.com", name: "Customer", text: "Hello garden" };

beforeEach(() => {
  wire.bodies.length = 0;
  wire.fail = false;
});

afterAll(async () => {
  await db.$disconnect();
});

function sentMessage() {
  const body = wire.bodies.at(-1);
  if (!body) throw new Error("No serialized SES request");
  const query = new URLSearchParams(body);
  const raw = query.get("RawMessage.Data");
  if (!raw) throw new Error("Missing raw MIME message");
  return { query, mime: Buffer.from(raw, "base64").toString("utf8") };
}

test("the real MIME and SES serializers keep the raw-mail action and hidden BCC", async () => {
  await expect(caller.sendMessage(input)).resolves.toBeUndefined();
  expect(wire.bodies).toHaveLength(1);
  const { query, mime } = sentMessage();
  expect(query.get("Action")).toBe("SendRawEmail");
  expect(query.get("Source")).toBe(siteConfig.fromEmail);
  const destinations = [...query.entries()]
    .filter(([key]) => key.startsWith("Destinations.member."))
    .map(([, value]) => value);
  expect(destinations).toEqual([templateConfig.email, ...siteConfig.adminEmails]);
  expect(mime).toContain(`From: ${siteConfig.fromEmail}\r\n`);
  expect(mime).toContain(`To: ${templateConfig.email}\r\n`);
  expect(mime).toContain("Subject: Message from Customer\r\n");
  expect(mime).toContain("Hello garden");
  expect(mime).not.toMatch(/^Bcc:/im);
  expect(mime).not.toMatch(/^Reply-To:/im);
});

test("Unicode and CRLF names stay message data and cannot change recipients", async () => {
  await caller.sendMessage({
    ...input,
    name: "Jos\u00e9\r\nBcc: intruder@example.com",
    text: "Bonjour caf\u00e9",
  });
  const { query, mime } = sentMessage();
  expect(mime).toMatch(/^Subject: =\?UTF-8\?[BQ]\?/im);
  expect(mime).not.toMatch(/^Bcc:/im);
  expect(query.get("Destinations.member.1")).toBe(templateConfig.email);
  expect(query.get("Destinations.member.2")).toBe(siteConfig.adminEmails[0]);
  expect(query.get("Destinations.member.3")).toBeNull();
  expect(mime).toMatch(/caf=C3=A9|Qm9uam91ciBjYWbDqQ==/);
});

test("SES failure keeps the router error contract", async () => {
  wire.fail = true;
  await expect(caller.sendMessage(input)).rejects.toMatchObject({
    code: "INTERNAL_SERVER_ERROR",
    message: "SES control failure",
  });
});

test("invalid email input cannot reach the delivery boundary", async () => {
  await expect(caller.sendMessage({ ...input, from: "invalid" })).rejects.toMatchObject({
    code: "BAD_REQUEST",
  });
  expect(wire.bodies).toHaveLength(0);
});
