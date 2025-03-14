"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/(front)/components/ui/form";
import { Input } from "@/app/(front)/components/ui/input";
import { Navigation } from "@/app/(front)/components/ui/navigation";
import SubmitButton from "@/app/(front)/components/ui/submit-button";
import { fetchR } from "@/app/(front)/shared/lib/request";
import PreventRoute from "@/app/(front)/widgets/prevent-route";
import { RoleUnion, roleSelection } from "@/app/global/enum/roles";
import { signUpSchema } from "@/app/global/types/user-types";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignUp() {
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Define your form.
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      id: "",
      name: "",
      password: "",
      role: roleSelection[0].value,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    if (isUploading) return;
    setIsUploading(true);

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    try {
      const response = await fetchR("/api/user", {
        method: "POST",
        body: JSON.stringify(values),
      });
      const body = await response.json();
      if (response.ok) {
        toast.info(body.message);
        const redirectTo = searchParams.get("from") ?? "manage/user";
        router.push(redirectTo);
      } else {
        toast.error(body.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error("회원가입 실패. 개발자에게 문의하세요.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="col-span-4 lg:col-start-5 md:col-start-3 w-full grid grid-cols-subgrid">
      <PreventRoute isUploading={isUploading} />
      <Toaster />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="col-span-full grid grid-cols-subgrid my-gap"
        >
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>ID</FormLabel>
                <FormControl>
                  <Input placeholder="ID를 입력해주세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>이름</FormLabel>
                <FormControl>
                  <Input placeholder="홍길동" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={() => (
              <FormItem className="col-span-full">
                <FormLabel>역할</FormLabel>
                <FormControl>
                  <Navigation
                    onValueChange={(value: RoleUnion) => {
                      form.setValue("role", value);
                    }}
                    selects={roleSelection.slice(0, -1)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton isUploading={isUploading} text={"가입하기"} />
        </form>
      </Form>
    </div>
  );
}
