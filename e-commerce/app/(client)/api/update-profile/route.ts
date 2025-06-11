import { clerkClient } from "@clerk/clerk-sdk-node";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, firstName, lastName, username } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    // Përditëso përdoruesin me Clerk SDK
    await clerkClient.users.updateUser(userId, {
      firstName,
      lastName,
      username,
    });

    return NextResponse.json({ success: true, message: "Profile updated" });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
