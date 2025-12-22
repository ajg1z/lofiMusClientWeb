import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_COOKIE_NAME, getRemoteApiBaseUrl, joinUrl } from "../../_lib/remote-api";

export async function POST() {
  const token = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  // Best-effort upstream logout (optional).
  if (token) {
    const baseUrl = getRemoteApiBaseUrl();
    await fetch(joinUrl(baseUrl, "/auth/logout"), {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }).catch(() => null);
  }

  // Clear cookie on our domain.
  cookies().set({
    name: ACCESS_TOKEN_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return NextResponse.json({ message: "Logged out" });
}

