import Image from "next/image";
import Link from "next/link";

import { authService } from "@/app/(back)/application/model/auth-service";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/(front)/components/ui/sheet";

const TransparentHeader = async () => {
  const session = await authService.getSession();

  const buttonStyle =
    "lg:px-6 md:px-5 px-4 hover:bg-white hover:text-background text-foreground transition-all duration-300 ease-in-out w-full h-full flex items-center justify-center md:py-0 py-4 ";

  let userOnlyButton = buttonStyle;
  let signInButton = buttonStyle;
  if (!session) {
    userOnlyButton += " hidden";
  } else {
    signInButton += "hidden";
  }

  const buttonList = [
    <Link key="myPage" href="/user/myPage" className={userOnlyButton}>
      MYPAGE
    </Link>,
    <Link key="write" href="/post/new" className={userOnlyButton}>
      WRITE
    </Link>,
    <Link key="about" href="/about" className={buttonStyle}>
      ABOUT
    </Link>,
    <Link key="signIn" href="/signIn" className={signInButton}>
      LOGIN
    </Link>,
  ];

  return (
    <header className="col-span-full h-fit bg-background grid grid-cols-subgrid items-center sticky top-0 z-2147483646 my-py">
      <div className="w-full h-full lg:col-span-2 md:col-span-2 col-span-1">
        <button className="h-full">
          <Link href="/">
            <Image
              width={1000}
              height={1000}
              priority={true}
              className="w-full h-auto"
              src="/jihasil_logo.svg"
              alt="Logo"
            />
          </Link>
        </button>
      </div>
      <div className="col-span-2 -col-end-1 hidden w-full h-fit justify-end md:flex items-center ">
        {buttonList}
      </div>

      <div className="col-span-1 -col-end-1 flex w-full justify-end md:hidden">
        <Sheet>
          <SheetTrigger>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </SheetTrigger>
          <SheetContent className="z-2147483647 w-1/2">
            <SheetHeader>
              <SheetTitle className="w-fit">MENU</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col my-6">
              {buttonList.map((button) => (
                <SheetClose key={button.key} asChild>
                  {button}
                </SheetClose>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default TransparentHeader;
