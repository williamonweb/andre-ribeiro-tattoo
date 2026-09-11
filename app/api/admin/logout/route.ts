import { NextResponse } from "next/server"; import { CMS_COOKIE } from "@/lib/admin";
export function GET(request:Request){const response=NextResponse.redirect(new URL("/",request.url));response.cookies.set(CMS_COOKIE,"",{path:"/",maxAge:0});return response;}
