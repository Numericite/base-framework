// avoid user with jwt token going to login

import { NextRequest, NextResponse } from "next/server";

const NEXT_PUBLIC_STRAPI_URL: string = process.env
  .NEXT_PUBLIC_STRAPI_URL as string;

export async function middleware(req: NextRequest) {
  const cookie = req.headers.get("cookie");

  //PRIVATE PAGES LOGIC

  if (req.nextUrl.pathname.startsWith("/dashboard/bo")) {
    if (!cookie) {
      return NextResponse.redirect(
        new URL("/dashboard/login", req.nextUrl.href)
      );
    } else if (req.nextUrl.pathname === "/dashboard/bo") {
      return NextResponse.redirect(
        new URL("/dashboard/bo/home", req.nextUrl.href)
      );
    } else {
      return NextResponse.next();
    }
  }
  if (req.nextUrl.pathname.startsWith("/dashboard/login") && cookie) {
    return NextResponse.rewrite(new URL("/dashboard/bo", req.nextUrl.href));
  }

  if (req.nextUrl.pathname.startsWith("/upload")) {
    return NextResponse.rewrite(
      new URL(req.nextUrl.pathname, NEXT_PUBLIC_STRAPI_URL)
    );
  }

  return NextResponse.next();
}
