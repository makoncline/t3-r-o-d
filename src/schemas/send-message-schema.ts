import { z } from "zod";

export const sendMessageSchema = z.object({
  from: z
    .string()
    .email({ message: "Invalid email address" })
    .trim()
    .toLowerCase(),
  name: z.string().min(1, { message: "Must be 1 or more characters long" }),
  text: z.string().min(1, { message: "Must be 1 or more characters long" }),
});
