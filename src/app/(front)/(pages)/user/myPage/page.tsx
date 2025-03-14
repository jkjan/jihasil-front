import Link from "next/link";
import { unauthorized } from "next/navigation";

import { authService } from "@/app/(back)/application/model/auth-service";
import { Button } from "@/app/(front)/components/ui/button";
import SignOut from "@/app/(front)/widgets/sign-out";
import { roleValue } from "@/app/global/enum/roles";

export default async function PageViewer() {
  const session = await authService.getSession();

  if (!session) {
    unauthorized();
  }

  console.log("session");
  console.log(session);

  return (
    <div className="subgrid my-gap">
      <p className="col-span-full text-2xl font-bold">
        안녕하세요, {session.user.info.name} 님
      </p>
      <p className="col-span-full">권한: {roleValue[session.user.info.role]}</p>
      <div className="col-span-2 flex flex-col grow my-gap">
        <Button className="grow" asChild>
          <Link href={"/user/edit"}>비밀번호 변경</Link>
        </Button>
        {session.user.hasEnoughRole("ROLE_SUPERUSER") ? (
          <Button asChild>
            <Link href="/manage/user">사용자 관리</Link>
          </Button>
        ) : null}
        <SignOut />
      </div>
    </div>
  );
}
