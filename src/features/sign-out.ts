"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { invalidateUser } from "@/entities/user";
import { ACCESS_TOKEN, INVALIDATED, REFRESH_TOKEN } from "@/shared/const/auth";
import { Session } from "@/shared/types/auth-types";

export const signOut = async (session: Session) => {
  if (session === null) return;

  await invalidateUser({
    id: session?.user.id as string,
  });

  const cookieStore = await cookies();
  cookieStore.set(ACCESS_TOKEN, INVALIDATED);
  cookieStore.delete(REFRESH_TOKEN);

  redirect("/");
};
