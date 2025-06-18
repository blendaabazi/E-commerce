import { clerkClient } from "@clerk/clerk-sdk-node";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId, firstName, lastName, role } = await request.json();

    await clerkClient.users.updateUser(userId, {
      firstName,
      lastName,
      publicMetadata: {
        role,
      },
    });

    const updatedUser = await clerkClient.users.getUser(userId);

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Failed to update user", error);
    return NextResponse.json(
      { error: "Error updating user" },
      { status: 500 }
    );
  }
}
