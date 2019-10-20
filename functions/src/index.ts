import * as firebase from "firebase-admin";
import * as functions from "firebase-functions";

import { logger } from "./utils/logger.util";

firebase.initializeApp();
const db = firebase.firestore();

interface Message {
  created: Date;
  isOutgoing: boolean;
  text: string;
}

const onCreateMessage = functions.firestore
  .document("/env/{env}/users/{uid}/messages/{messageID}")
  .onCreate((snapshot, context) => {
    const { env, uid } = context.params;
    const message: Message | undefined = snapshot.data() as any;

    if (message && message.isOutgoing && snapshot.ref.parent) {
      const text = "Firebase text";
      const name = "Name";
      const created = new Date();

      db.collection("env")
        .doc(env)
        .collection("users")
        .doc(uid)
        .set({
          name
        })
        .catch(logger.error);

      logger.debug("Set name and response");

      return snapshot.ref.parent.doc(created.toISOString()).set({
        created,
        isOutgoing: false,
        text
      });
    }

    return null;
  });

export { onCreateMessage };
