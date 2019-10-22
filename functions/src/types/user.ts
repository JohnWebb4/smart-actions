import * as dialogflow from "dialogflow";

interface User {
  created: string;
  name: string;
  contexts: dialogflow.Context[];
}

export { User };
