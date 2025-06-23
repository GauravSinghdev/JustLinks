import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    await prisma.user.findFirst();

    return NextResponse.json(
      { message: "DB pinged successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Ping error:", error);
    return NextResponse.json({ message: "DB ping failed" }, { status: 500 });
  }
}
