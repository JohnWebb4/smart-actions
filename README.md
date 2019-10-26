# Smart Action and Replies

![Original John's Cupcakes](/public/original_johns_cupcakes.png)

Goal: Create a messaging platform where a small baking.
business can start a new conversation with a customer.
and take them through the entire sales process autonomously.

## Infrastructure

- Website tied directly to [Firebase Firestore](https://firebase.google.com/docs/firestore)
- [Cloud Function Trigger](https://firebase.google.com/docs/functions/firestore-events) for reading new messages and sending to DialogFlow
- [DialogFlow](https://dialogflow.com/) project for reading message, parsing, and returning response message.

# Link to Slides

[Slides](https://drive.google.com/open?id=1j4inhCIM8vckNxyArLozpqAlyHMlE6zDWnLwSMXfWjU)

## Files of Note

- [Converation Page](/src/pages/Conversation.page.tsx)
- [Messages Service](/functions/src/services/message.service.ts)

## Requirements

- [Node 8](https://nodejs.org/en/) or newer
- [Firebase Project](https://firebase.google.com/)
- [DialogFlow project](https://dialogflow.com/)

## Setup

Clone the Repo.

```sh
git clone https://github.com/JohnWebb4/smart-actions.git && cd smart-actions
```

Install libraries.

```sh
npm i
```

```sh
cd functions && npm i
```

[Setup DialogFlow Service Account](https://dialogflow.com/docs/reference/v2-auth-setup). Add variables: DIALOGFLOW_CLIENT_EMAIL, DIALOGFLOW_PRIVATE_KEY and DIALOGFLOW_PROJECT_ID to new file in /functions/src/constants/env.constant.ts

[Setup Firebase Project and obtain app credentials](https://firebase.google.com/docs/storage/web/start). Add variables DEV=false and FIREBASE_CONFIG to /src/constants/env.constant.ts

In order for Firebase to make HTTP requests to DialogFlow, your Firebase Project must be on a PAID plan. I reccomend the Blaze plan. Its pay as you go and for low traffic it is FREE. [Pricing](https://firebase.google.com/pricing/?gclid=EAIaIQobChMIodvZ3--65QIVfh6tBh1csg3-EAAYASABEgIbO_D_BwE).

## Run locally frontend

To complile and build the frontend

```sh
npm run serve
```

To 'Compile on save` you need to open two terminals. In the first one run

```sh
npm run build:watch
```

And in the second run

```sh
npm run serve
```

## Run backend locally using HTTP Request

The backend is triggered when a change is made to the database. As such, you cannot test the actual trigger locally.

I created a [HTTP cloud function](https://cloud.google.com/functions/docs/writing/http) and made requests to that endpoint with the appropriate data to mock the trigger. I started the cloud function by running

```sh
cd functions && npm run serve
```

# License

[MIT](/LICENSE)
