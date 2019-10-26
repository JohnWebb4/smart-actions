import * as firebase from "firebase-admin";

import { sessionClient } from "../clients/dialogflow.client";
import { logger } from "../utils/logger.util";
import { Message } from "../types/message";
import { User } from "../types/user";
import { fieldsToPojo } from "../utils/dialogflow.util";

const db = firebase.firestore();

// Specific intents I am looking for
enum DialogTreeMapping {
  getEmail = "projects/smart-actions-b7e6d/agent/intents/1fe26a18-fc0c-4532-9ae3-2f21bef66f4a",
  getName = "projects/smart-actions-b7e6d/agent/intents/e28610ce-1f94-4f30-95d3-682d8b30636d",
  getPastry = "projects/smart-actions-b7e6d/agent/intents/b7aa0bbd-a826-47f9-aa87-60071820704c"
}

async function handleIncomingMessage(
  env: string,
  uid: string,
  message: Message,
  snapshot: firebase.firestore.DocumentSnapshot
) {
  sessionClient.setSessionPath(uid);

  // Lookup current user
  const userDoc = db
    .collection("env")
    .doc(env)
    .collection("users")
    .doc(uid);

  const userRef = await userDoc.get();

  const user: User = userRef.data() as any;

  if (user) {
    // Pass to DialogFlow
    const intent = await sessionClient.getIntent(message.text, user.contexts);

    // Destructure result
    const intentName = intent.queryResult.intent.name;
    const fields = fieldsToPojo(intent.queryResult.parameters.fields);
    const {
      email,
      flavor,
      "given-name": givenName,
      "last-name": lastName,
      pastry,
      quantity,
      topping
    } = fields;

    // Handle actions
    if (intentName === DialogTreeMapping.getName && givenName) {
      // If gave name
      logger.debug("Updating name");
      const name = [givenName, lastName].join(" ");

      await userDoc.update({
        ...(name && { name })
      });
    } else if (intentName === DialogTreeMapping.getEmail && email) {
      // If gave email
      logger.debug("Updating email");
      await userDoc.update({
        ...(email && { email })
      });
    } else if (intentName === DialogTreeMapping.getPastry) {
      // If gave invoice item
      if (user.currentInvoice) {
        // If already working on an invoice
        logger.debug("Updating current invoice");
        await userDoc
          .collection("invoices")
          .doc(user.currentInvoice)
          .update({
            ...(flavor && { flavor }),
            ...(pastry && { pastry }),
            ...(topping && { topping }),
            ...(quantity && { quantity })
          });
      } else {
        // No invoice, create new one
        logger.debug("Creating new invoice");
        const { id } = await userDoc.collection("invoices").add({
          updated: new Date(),
          ...(flavor && { flavor }),
          ...(pastry && { pastry }),
          ...(topping && { topping }),
          ...(quantity && { quantity })
        });

        await userDoc.update({
          currentInvoice: id
        });
      }
    }

    // Save the new context of the conversation
    await db
      .collection("env")
      .doc(env)
      .collection("users")
      .doc(uid)
      .update({
        contexts: intent.queryResult.outputContexts,
        updated: new Date()
      });

    // Send response
    logger.info("Sending response");
    const created = new Date();
    await snapshot.ref.parent.doc(created.toISOString()).set({
      created,
      isOutgoing: false,
      text: intent.queryResult.fulfillmentText
    });
  }
}

export { handleIncomingMessage };
