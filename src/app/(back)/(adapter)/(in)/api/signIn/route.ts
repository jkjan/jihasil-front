import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { userService } from "@/app/(back)/application/model/user-service";
import { AuthenticationException } from "@/app/(back)/shared/error/exception";
import {
  UserSignInRequestDTO,
  signInSchema,
} from "@/app/global/types/user-types";

export const POST = async (nextRequest: NextRequest) => {
  const credentials: UserSignInRequestDTO = await nextRequest.json();

  try {
    const validationResult = signInSchema.safeParse(credentials);
    if (!validationResult.success) {
      throw validationResult.error;
    }

    const validCredentials = validationResult.data;

    const user = await userService.userSignIn(validCredentials);

    return new NextResponse(
      JSON.stringify({ message: `환영합니다. ${user.name} 님` }),
      {
        status: 200,
      },
    );
  } catch (e: any) {
    console.error(e);

    if (e instanceof AuthenticationException) {
      return new NextResponse(
        JSON.stringify({ message: "아이디나 비밀번호를 확인해주세요." }),
        {
          status: 401,
        },
      );
    } else if (e instanceof ZodError) {
      return new NextResponse(JSON.stringify({ message: e.message }), {
        status: 400,
      });
    }
    return new NextResponse(
      JSON.stringify({ message: "로그인에 실패하였습니다." }),
      {
        status: 500,
      },
    );
  }
};
