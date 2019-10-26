import { db } from "../clients/db.client";

async function createNewUser(): Promise<string> {
  const userRef = db.collection("users");

  let uid = localStorage.getItem("uid");

  if (!uid) {
    // Add user with random ID
    const userEntity = await userRef.add({
      created: new Date()
    });

    uid = userEntity.id;

    localStorage.setItem("uid", uid);
  }

  return uid;
}

export { createNewUser };
