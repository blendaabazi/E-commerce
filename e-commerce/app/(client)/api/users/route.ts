// app/api/users/route.ts
import { clerkClient } from "@clerk/clerk-sdk-node";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await clerkClient.users.getUserList();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Failed to fetch users", error);
    return new NextResponse("Error fetching users", { status: 500 });
  }
}
