// import { clerkClient } from "@clerk/clerk-sdk-node";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { userId, role } = await req.json();

//     if (!userId || !role) {
//       return NextResponse.json({ error: "Missing userId or role" }, { status: 400 });
//     }

//     await clerkClient.users.updateUser(userId, {
//       publicMetadata: {
//         role,
//       },
//     });

//     return NextResponse.json({ success: true, message: `Role '${role}' set for user ${userId}` });
//   } catch (error) {
//     console.error("Error updating user role:", error);
//     return NextResponse.json({ error: "Failed to update user role" }, { status: 500 });
//   }
// }
import { clerkClient } from "@clerk/clerk-sdk-node";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, role } = await req.json();

    if (!userId || !role) {
      return NextResponse.json({ error: "Missing userId or role" }, { status: 400 });
    }

    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        role,
      },
    });

    return NextResponse.json({ success: true, message: `Role '${role}' set for user ${userId}` });
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json({ error: "Failed to update user role" }, { status: 500 });
  }
}
