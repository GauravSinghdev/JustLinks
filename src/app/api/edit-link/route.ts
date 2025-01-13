import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface EditLinkRequest {
  linkId: string;
  newLink?: string; // Optional new URL
  newTitle?: string;
  newDescription?: string; // Optional description update
}

export async function PUT(req: NextRequest) {
  try {
    // Get the session to authenticate the user
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Ensure the user exists in the database
    const existingUser = await prisma.user.findFirst({
      where: { email: session?.user?.email ?? "" },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "User not found in database" },
        { status: 404 }
      );
    }

    // Get the link ID and other update data from the request body
    const { linkId, newLink, newTitle, newDescription }: EditLinkRequest =
      await req.json();

    // Validate if linkId is provided
    if (!linkId) {
      return NextResponse.json(
        { message: "Link ID is required" },
        { status: 400 }
      );
    }

    // Find the link by its ID
    const linkToEdit = await prisma.link.findUnique({
      where: { id: linkId },
    });

    // Check if the link exists
    if (!linkToEdit) {
      return NextResponse.json({ message: "Link not found" }, { status: 404 });
    }

    // Ensure that the link belongs to the authenticated user
    if (linkToEdit.userId !== existingUser.id) {
      return NextResponse.json(
        { message: "Forbidden: You cannot edit this link" },
        { status: 403 }
      );
    }

    // Check if the user already has a link with the same URL (newLink)
    if (newLink) {
      const existingLink = await prisma.link.findFirst({
        where: {
          userId: existingUser.id,
          link: newLink,
        },
      });

      if (existingLink) {
        return NextResponse.json(
          { message: "You already have this link saved" },
          { status: 400 }
        );
      }
    }

    // Update the link with new data
    const updatedLink = await prisma.link.update({
      where: { id: linkId },
      data: {
        link: newLink ?? linkToEdit.link, // Retain old link if newLink is not provided
        title: newTitle ?? linkToEdit.title, // Retain old title if newTitle is not provided
        description: newDescription ?? linkToEdit.description, // Retain old description if newDescription is not provided
      },
    });

    return NextResponse.json(updatedLink, { status: 200 });
  } catch (err) {
    console.error("Error occurred while updating link:", err); // Improved logging
    return NextResponse.json(
      { message: "Error while updating the link" },
      { status: 500 }
    ); // Internal Server Error
  }
}
