// /src/app/api/login/route.ts
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { cookies } from "next/headers";

const usersFile = path.join(process.cwd(), "users.json");

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const usersData = await fs.readFile(usersFile, "utf-8");
    const users = JSON.parse(usersData);

    const user = users.find(
      (user: any) => user.email === email && user.password === password
    );

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials." },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set("session", email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return NextResponse.json({ message: "Login successful." });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
