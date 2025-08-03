import liveblocks from "@/lib/livebocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "../../../firebase-admin";

export async function POST(req: NextRequest) {
  auth.protect();

  const { sessionClaims } = await auth();
  const { room } = await req.json();

  if (!sessionClaims) {
    return new Response("Unauthorized", { status: 401 });
  }

  const session = liveblocks.prepareSession(sessionClaims?.email, {
    userInfo: {
      name: sessionClaims?.fullName,
      email: sessionClaims?.email,
      avatar: sessionClaims?.image,
    },
  });

  const usersInRoom = await adminDb()
    .collectionGroup("rooms")
    .where("userId", "==", sessionClaims?.email)
    .get();

  const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

  if (userInRoom?.exists) {
    session.allow(room, session.FULL_ACCESS);
    const { body, status } = await session.authorize();

    console.log(`User ${sessionClaims?.email} authorized for room ${room}`);

    return new Response(body, { status });
  } else {
    return NextResponse.json(
      {
        message: "You are not in this room.",
      },
      {
        status: 403,
      }
    );
  }
}
