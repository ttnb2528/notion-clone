"use server";

import { auth } from "@clerk/nextjs/server";
import { adminDb } from "../firebase-admin";
import liveblocks from "@/lib/livebocks";

export async function createNewDocument() {
  auth.protect();

  const { sessionClaims } = await auth();

  if (!sessionClaims || !sessionClaims.email) {
    throw new Error("User email not found in session claims");
  }

  try {
    const docCollectionRef = adminDb().collection("documents");
    const docRef = await docCollectionRef.add({
      title: "New Doc",
    });

    if (!sessionClaims.email) {
      throw new Error("User email not found in session claims");
    }

    await adminDb()
      .collection("users")
      .doc(sessionClaims.email)
      .collection("rooms")
      .doc(docRef.id)
      .set({
      userId: sessionClaims.email,
      role: "owner",
      createdAt: new Date(),
      roomId: docRef.id,
    });

    return { docId: docRef.id };
  } catch (error) {
    console.error("Error creating document:", error);
    throw new Error("Failed to create document. Please check Firebase configuration.");
  }
}

export async function deleteDocument(roomId: string) {
  auth.protect();

  console.log("Deleting document with roomId:", roomId);

  try {
    // delete the document reference itself
    await adminDb().collection("documents").doc(roomId).delete();

    const query = await adminDb()
      .collectionGroup("rooms")
      .where("roomId", "==", roomId)
      .get();

    const batch = adminDb().batch();

    // delete all user references to the document
    query.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    // delete the room in liveblocks
    await liveblocks.deleteRoom(roomId);

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function inviteUserToDocument(roomId: string, email: string) {
  auth.protect();

  console.log(
    "Inviting user to document with roomId:",
    roomId,
    "and email:",
    email
  );

  try {
    await adminDb()
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .set({
        userId: email,
        role: "editor",
        createdAt: new Date(),
        roomId,
      });

    return { success: true };
  } catch (error) {
    console.error("Error inviting user:", error);
    return { success: false };
  }
}

export async function removeUserFromDocument(roomId: string, email: string) {
  auth.protect();

  console.log("Removing user from document with roomId:");

  try {
    await adminDb()
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .delete();

    return { success: true };
  } catch (error) {
    console.error("Error removing user:", error);
    return { success: false };
  }
}
