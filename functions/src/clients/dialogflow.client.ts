import * as dialogflow from "dialogflow";

import {
  DIALOGFLOW_CLIENT_EMAIL,
  DIALOGFLOW_PRIVATE_KEY,
  DIALOGFLOW_PROJECT_ID
} from "../constants/env.constant";

class SessionClient {
  public sessionClient = new dialogflow.SessionsClient({
    credentials: {
      client_email: DIALOGFLOW_CLIENT_EMAIL,
      private_key: DIALOGFLOW_PRIVATE_KEY
    },
    projectId: DIALOGFLOW_PROJECT_ID
  });
  private sessionPath = "";

  setSessionPath(sessionID: string) {
    this.sessionPath = this.sessionClient.sessionPath(
      DIALOGFLOW_PROJECT_ID,
      sessionID
    );
  }

  async getIntent(
    query: string,
    contexts: dialogflow.Context[],
    languageCode = "en"
  ): Promise<dialogflow.DetectIntentResponse> {
    const request: dialogflow.DetectIntentRequest = {
      session: this.sessionPath,
      queryInput: {
        text: {
          text: query,
          languageCode: languageCode
        }
      }
    };

    if (contexts && contexts.length > 0) {
      request.queryParams = {
        contexts
      };
    }

    const intents = await this.sessionClient.detectIntent(request);

    return intents[0];
  }
}

const sessionClient = new SessionClient();

export { sessionClient };
