import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // Ensure the user exists in the database
    const existingUser = await prisma.user.findFirst({
      where: { email: session?.user?.email ?? "" },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          message: "User not found in database",
        },
        { status: 404 }
      );
    }

    // Fetch all links associated with the user
    const links = await prisma.link.findMany({
      where: {
        userId: existingUser.id, // Get links for the user by their ID
      },
      select: {
        id: true,
        title: true,
        description: true,
        link: true,
      },
    });
    console.log("Fetched links:", links);

    return NextResponse.json(links);
  } catch (err) {
    console.error("Error occurred while fetching links:", err);

    // Return a 500 Internal Server Error response in case of an error
    return NextResponse.json(
      {
        message: "Error while fetching links",
      },
      { status: 500 } // Internal server error status code
    );
  }
}
