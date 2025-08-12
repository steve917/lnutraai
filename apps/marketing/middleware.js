import { NextResponse } from "next/server";

export function middleware(req) {
  const basicAuth = req.headers.get("authorization");
  const u = process.env.SITE_GATE_USER;
  const p = process.env.SITE_GATE_PASS;
  if (!u || !p) return NextResponse.next();
  if (basicAuth) {
    const [scheme, b64] = basicAuth.split(" ");
    if (scheme === "Basic") {
      const [user, pass] = Buffer.from(b64, "base64").toString().split(":");
      if (user === u && pass === p) return NextResponse.next();
    }
  }
  return new NextResponse("Auth required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Marketing"' }
  });
}
