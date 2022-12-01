// avoid user with jwt token going to login

import { NextRequest, NextResponse } from "next/server";

const NEXT_PUBLIC_JWT_STORAGE_KEY: string = process.env
  .NEXT_PUBLIC_JWT_STORAGE_KEY as string;
const NEXT_PUBLIC_STRAPI_URL: string = process.env
  .NEXT_PUBLIC_STRAPI_URL as string;

export function middleware(req: NextRequest) {
  let cookie = req.cookies.get(NEXT_PUBLIC_JWT_STORAGE_KEY);

  //PRIVATE PAGES LOGIC

  if (req.nextUrl.pathname.startsWith("/upload")) {
    return NextResponse.rewrite(
      new URL(req.nextUrl.pathname, NEXT_PUBLIC_STRAPI_URL)
    );
  }

  return NextResponse.next();
}
