import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import { useZodForm } from "@/hooks/use-zod-form";
import { useStatus } from "@/hooks/use-status";
import { api } from "@/utils/api";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { type AppRouter } from "@/server/api/root";
import { type inferRouterInputs } from "@trpc/server";
import { sendMessageSchema } from "@/schemas/send-message-schema";
import { Textarea } from "./ui/textarea";

type MessageFormInput = inferRouterInputs<AppRouter>["email"]["sendMessage"];
type MessageFormProps = React.HTMLAttributes<HTMLDivElement>;

export function MessageForm({}: MessageFormProps) {
  const mutation = api.email.sendMessage.useMutation();
  const { setStatus, isLoading } = useStatus();
  const form = useZodForm({
    schema: sendMessageSchema,
    defaultValues: {
      name: "",
      from: "",
      text: "",
    },
  });
  const onSubmit = async (data: MessageFormInput) => {
    setStatus("loading");
    const result = await mutation
      .mutateAsync(data)
      .then(() => true)
      .catch(() => false);
    if (!result) {
      setStatus("error");
      return toast({
        title: "Something went wrong.",
        description: "Your message failed to send. Please try again.",
        variant: "destructive",
      });
    }
    setStatus("idle");
    form.reset();
    return toast({
      title: "Message sent!",
      description: "Your message has been sent.",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your name</FormLabel>
              <FormControl>
                <Input placeholder="Lily Bloom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="from"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your email</FormLabel>
              <FormControl>
                <Input placeholder="Lily.Bloom@example.comm" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="How do I care for daylilies?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Sending..." : "Send"}
        </Button>
      </form>
    </Form>
  );
}
