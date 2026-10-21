import MailComposer from "nodemailer/lib/mail-composer";
import { SESClient, SendRawEmailCommand } from "@aws-sdk/client-ses";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { templateConfig } from "@/config/template";
import { env } from "@/env.mjs";
import { getErrorMessage } from "@/lib/utils";
import { TRPCError } from "@trpc/server";
import { sendMessageSchema } from "@/schemas/send-message-schema";
import { siteConfig } from "@/config/site";

const ses = new SESClient({
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
  region: env.AWS_REGION,
});

export const emailRouter = createTRPCRouter({
  sendMessage: publicProcedure
    .input(sendMessageSchema)
    .mutation(async ({ input }) => {
      try {
        const message = new MailComposer({
          from: siteConfig.fromEmail,
          to: templateConfig.email,
          bcc: siteConfig.adminEmails,
          subject: `Message from ${input.name}`,
          text: input.text,
          newline: "windows",
        }).compile();
        message.keepBcc = false;
        const envelope = message.getEnvelope();
        const raw = await message.build();
        await ses.send(
          new SendRawEmailCommand({
            Source: siteConfig.fromEmail,
            Destinations: envelope.to,
            RawMessage: { Data: raw },
          }),
        );
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: errorMessage,
        });
      }
    }),
});
