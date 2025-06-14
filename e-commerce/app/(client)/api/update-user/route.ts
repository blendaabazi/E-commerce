import { clerkClient } from "@clerk/clerk-sdk-node";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId, firstName, lastName, role } = await request.json();

    await clerkClient.users.updateUser(userId, {
      firstName,
      lastName,
      publicMetadata: {
        role, // këtu vendos rolin që vjen nga client
      },
    });

    const updatedUser = await clerkClient.users.getUser(userId);

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Failed to update user", error);
    return new NextResponse("Error updating user", { status: 500 });
  }
}
