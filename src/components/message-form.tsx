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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { type AppRouter } from "@/server/api/root";
import { type inferRouterInputs } from "@trpc/server";
import { sendMessageSchema } from "@/schemas/send-message-schema";

type MessageFormInput = inferRouterInputs<AppRouter>["email"]["sendMessage"];
type MessageFormProps = React.HTMLAttributes<HTMLDivElement>;

export function MessageForm({}: MessageFormProps) {
  const mutation = api.email.sendMessage.useMutation();
  const { setStatus, isLoading } = useStatus();
  const form = useZodForm({
    schema: sendMessageSchema,
    defaultValues: {},
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
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Enter your name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="from"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              <FormDescription>Enter your email address</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Input placeholder="Hi, do you have any flowers?" {...field} />
              </FormControl>
              <FormDescription>Enter your message</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Send message
        </Button>
      </form>
    </Form>
  );
}
