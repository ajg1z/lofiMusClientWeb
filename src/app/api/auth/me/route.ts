import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_COOKIE_NAME, getRemoteApiBaseUrl, joinUrl } from "../../_lib/remote-api";

export async function GET() {
  const token = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized", error: "Unauthorized", statusCode: 401 }, { status: 401 });
  }

  const baseUrl = getRemoteApiBaseUrl();
  const upstream = await fetch(joinUrl(baseUrl, "/auth/me"), {
    headers: { Authorization: `Bearer ${token}` },
  });

  const text = await upstream.text();
  const contentType = upstream.headers.get("content-type") || "application/json";

  return new NextResponse(text, { status: upstream.status, headers: { "Content-Type": contentType } });
}

