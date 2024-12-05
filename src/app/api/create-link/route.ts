import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Define the schema for the incoming link data
const LinkSchema = z.object({
  title: z.string(),
  description: z.string(),
  link: z.string().url(), // Ensure it's a valid URL
});

// API route to handle POST requests to create a link
export async function POST(req: NextRequest) {
  try {
    // Get the session from the server side using getServerSession
    const session = await getServerSession();

    const user = await prisma.user.findFirst({
      where: {
        email: session?.user?.email ?? "" // Use the email from the session
      },
    });

    // If there is no session (user is not logged in), return a 401 Unauthorized response
    if (!user) {
      return NextResponse.json(
        {
          message: "Unauthorized", // Unauthorized message
        },
        { status: 403 } // Unauthorized status code
      );
    }

    // Parse the incoming request body to validate it against the schema
    const data = LinkSchema.parse(await req.json());

    // Ensure that the link is provided (even though the schema requires it)
    if (!data.link) {
      return NextResponse.json(
        {
          message: "Link Missing",
        },
        { status: 400 }
      );
    }

    // Check if the link already exists for this user
    const existingLink = await prisma.link.findFirst({
      where: {
        userId: user.id,
        link: data.link,
      },
    });

    // If the link already exists, return a 400 Bad Request response
    if (existingLink) {
      return NextResponse.json(
        {
          message: "This link already exists.",
        },
        { status: 400 }
      );
    }

    // Create the new link in the database using Prisma
    const newLink = await prisma.link.create({
      data: {
        title: data.title,
        description: data.description,
        link: data.link,
        userId: user.id, // Use the userId from the database
      },
    });

    // Return a success response with the created link data
    return NextResponse.json(
      {
        message: "Link successfully added",
        link: newLink, // Return the created link in the response
      },
      { status: 201 } // Created status code
    );
  } catch (e) {
    // Log the error for debugging
    console.error("Error occurred in POST request:", e);

    // Return an error response if something goes wrong
    return NextResponse.json(
      {
        message: "Error while adding the link",
      },
      { status: 500 } // Internal server error status
    );
  }
}
