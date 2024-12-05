import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

// Define the expected structure of the body
interface DeleteLinkRequest {
  linkId: string;
}

export async function DELETE(request: NextRequest) {
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
      return NextResponse.json({ message: "User not found in database" }, { status: 404 });
    }

    // Get the link ID from the request body (use the appropriate method to extract the link ID)
    const { linkId }: DeleteLinkRequest = await request.json(); // Assuming the request body contains the linkId

    // Validate if linkId is provided
    if (!linkId) {
      return NextResponse.json({ message: "Link ID is required" }, { status: 400 });
    }

    // Find the link by its ID
    const linkToDelete = await prisma.link.findUnique({
      where: { id: linkId },
    });

    // Check if the link exists
    if (!linkToDelete) {
      return NextResponse.json({ message: "Link not found" }, { status: 404 });
    }

    // Ensure that the link belongs to the authenticated user
    if (linkToDelete.userId !== existingUser.id) {
      return NextResponse.json(
        { message: "Forbidden: You cannot delete this link" },
        { status: 403 }
      );
    }

    // Delete the link
    await prisma.link.delete({
      where: { id: linkId },
    });

    return NextResponse.json({ message: "Link deleted successfully" });
  } catch (err) {
    console.error("Error occurred while deleting link:", err);
    return NextResponse.json({ message: "Error while deleting the link" }, { status: 500 }); // Internal Server Error
  }
}
