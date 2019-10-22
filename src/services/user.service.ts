import { db } from "../clients/db.client";

async function createNewUser(): Promise<string> {
  const userRef = db.collection("users");

  let uid = localStorage.getItem("uid");

  if (!uid) {
    const userEntity = await userRef.add({
      created: new Date()
    });

    uid = userEntity.id;

    localStorage.setItem("uid", uid);
  }

  return uid;
}

export { createNewUser };
