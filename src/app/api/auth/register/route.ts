import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_COOKIE_NAME, getRemoteApiBaseUrl, joinUrl } from "../../_lib/remote-api";

export async function POST(request: Request) {
  const baseUrl = getRemoteApiBaseUrl();
  const body = await request.json().catch(() => null);

  const upstream = await fetch(joinUrl(baseUrl, "/auth/register"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : null,
  });

  const text = await upstream.text();
  const contentType = upstream.headers.get("content-type") || "application/json";

  if (!upstream.ok) {
    return new NextResponse(text, { status: upstream.status, headers: { "Content-Type": contentType } });
  }

  // Upstream returns { access_token, user }. Store token in httpOnly cookie.
  const data = JSON.parse(text) as { access_token?: string; user?: unknown };
  const token = data?.access_token;

  if (token) {
    cookies().set({
      name: ACCESS_TOKEN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  }

  return NextResponse.json({ user: data?.user ?? null });
}

