import * as dialogflow from "dialogflow";

interface User {
  created: string;
  currentInvoice: string;
  email: string;
  name: string;
  contexts: dialogflow.Context[];
}

export { User };
