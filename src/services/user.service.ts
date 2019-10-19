import { User } from "firebase";

import { db } from "../clients/db.client";

async function createNewUser(user: User) {
  const userRef = db.collection("users").doc(user.uid);

  const userSnapshot = await userRef.get();

  if (!userSnapshot.exists) {
    userRef.set({
      created: new Date()
    });
  }
}

export { createNewUser };
