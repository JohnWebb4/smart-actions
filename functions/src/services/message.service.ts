import * as firebase from "firebase-admin";

import { sessionClient } from "../clients/dialogflow.client";
import { logger } from "../utils/logger.util";
import { Message } from "../types/message";
import { User } from "../types/user";

const db = firebase.firestore();

async function handleIncomingMessage(
  env: string,
  uid: string,
  message: Message,
  snapshot: firebase.firestore.DocumentSnapshot
) {
  sessionClient.setSessionPath(uid);

  const userRef = await db
    .collection("env")
    .doc(env)
    .collection("users")
    .doc(uid)
    .get();

  const user: User = userRef.data() as any;

  if (user) {
    const intent = await sessionClient.getIntent(message.text, user.contexts);

    const name = "Name";
    const created = new Date();

    await db
      .collection("env")
      .doc(env)
      .collection("users")
      .doc(uid)
      .update({
        name,
        contexts: intent.queryResult.outputContexts,
        updated: new Date()
      });

    logger.info("Sending response");
    await snapshot.ref.parent.doc(created.toISOString()).set({
      created,
      isOutgoing: false,
      text: intent.queryResult.fulfillmentText
    });
  }
}

export { handleIncomingMessage };
