import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const file = path.join(process.cwd(), "users.json");

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (!email.endsWith("@go-bbg.com")) {
    return NextResponse.json(
      { message: "Use company email." },
      { status: 400 }
    );
  }
  const users = JSON.parse(fs.readFileSync(file, "utf-8"));
  if (users.find((u: any) => u.email === email)) {
    return NextResponse.json({ message: "User exists." }, { status: 400 });
  }
  users.push({ email, password });
  fs.writeFileSync(file, JSON.stringify(users, null, 2));
  return NextResponse.json({ message: "Registered." });
}
