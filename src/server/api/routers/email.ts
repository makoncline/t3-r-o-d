import nodemailer from "nodemailer";
import AWS from "aws-sdk";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { templateConfig } from "@/config/template";
import { env } from "@/env.mjs";
import { getErrorMessage } from "@/lib/utils";
import { TRPCError } from "@trpc/server";
import { sendMessageSchema } from "@/schemas/send-message-schema";
import { siteConfig } from "@/config/site";

AWS.config.update({
  accessKeyId: env.AWS_ACCESS_KEY_ID,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  region: env.AWS_REGION,
});

const transporter = nodemailer.createTransport({
  SES: new AWS.SES({ apiVersion: "2010-12-01" }),
});

export const emailRouter = createTRPCRouter({
  sendMessage: publicProcedure
    .input(sendMessageSchema)
    .mutation(async ({ input }) => {
      const mailOptions = {
        from: siteConfig.fromEmail,
        to: templateConfig.email,
        bcc: siteConfig.adminEmails,
        subject: `Message from ${input.name}`,
        text: input.text,
      };

      try {
        await transporter.sendMail(mailOptions);
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: errorMessage,
        });
      }
    }),
});
