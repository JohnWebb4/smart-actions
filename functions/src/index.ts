import * as firebase from "firebase-admin";
import * as functions from "firebase-functions";

firebase.initializeApp();

import { Message } from "./types/message";
import { handleIncomingMessage } from "./services/message.service";
import { logger } from "./utils/logger.util";

const onCreateMessage = functions.firestore
  .document("/env/{env}/users/{uid}/messages/{messageID}")
  .onCreate((snapshot, context) => {
    const { env, uid } = context.params;
    const message: Message | undefined = snapshot.data() as any;

    if (message && message.isOutgoing && snapshot.ref.parent) {
      return handleIncomingMessage(env, uid, message, snapshot).catch(e => {
        logger.error("Failed to respond to incoming message", e);
      });
    }

    return null;
  });

export { onCreateMessage };
