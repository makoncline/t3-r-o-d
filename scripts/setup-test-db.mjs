import { execFileSync } from "node:child_process";

const url = new URL(process.env.DATABASE_URL ?? "");
if (
  url.protocol !== "postgresql:" ||
  !["localhost", "127.0.0.1"].includes(url.hostname) ||
  url.pathname !== "/security_test"
) {
  throw new Error("Catalog fixtures require a local security_test database");
}

execFileSync(
  "npm",
  [
    "exec",
    "--",
    "prisma",
    "db",
    "execute",
    "--file",
    "tests/fixtures/catalog.sql",
    "--schema",
    "prisma/schema.prisma",
  ],
  { stdio: "inherit" },
);
