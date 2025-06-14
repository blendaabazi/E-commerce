// app/api/create-user/route.ts
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/clerk-sdk-node";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { emailAddress, password, firstName, lastName, role } = body;

    if (!emailAddress || !password || !firstName) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    const user = await clerkClient.users.createUser({
      emailAddress, // ✅ VETËM kjo formë lejohet
      password,
      firstName,
      lastName,
      publicMetadata: { role: role || "user" },
    });

    return NextResponse.json({
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      firstName: user.firstName,
    });
  } catch (err: any) {
    console.error("Error creating user:", err);
    return NextResponse.json(
      { error: err?.errors?.[0]?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
