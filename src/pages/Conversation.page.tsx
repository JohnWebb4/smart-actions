import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";

import { db } from "../clients/db.client";
import { BubbleMessage } from "../components/BubbleMessage.component";
import { Message } from "../types/message";

interface Props {
  uid?: string;
}

function Conversation({ uid }: Props) {
  const [messages, setMessages] = useState<
    firebase.firestore.QueryDocumentSnapshot[]
  >([]);
  const [text, setText] = useState<string>("");

  function updateMessages(messagesSnapshot: firebase.firestore.QuerySnapshot) {
    setMessages(messagesSnapshot.docs);
  }

  useEffect(() => {
    const messagesCollection = db
      .collection("users")
      .doc(uid)
      .collection("messages");

    const onMessageRef = messagesCollection.onSnapshot(updateMessages);

    return () => {
      onMessageRef();
    };
  }, []);

  function onSubmit(e: any): void {
    const created = new Date();

    db.collection("users")
      .doc(uid)
      .collection("messages")
      .doc(created.toISOString())
      .set({
        created,
        isOutgoing: true,
        text
      });

    e.preventDefault();
    setText("");
  }

  function onTextChange(e: ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  return (
    <div>
      <MessageContainer>{messages.map(renderMessage)}</MessageContainer>
      <form onSubmit={onSubmit}>
        <input
          autoFocus
          type="text"
          name="message"
          value={text}
          onChange={onTextChange}
        />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

function renderMessage(message: firebase.firestore.QueryDocumentSnapshot) {
  const { isOutgoing, text } = message.data() as Message;

  return (
    <BubbleMessage key={message.id} isOutgoing={isOutgoing}>
      {text}
    </BubbleMessage>
  );
}

const MessageContainer = styled.ol`
  display: flex;
  flex-direction: column;
  margin: var(--rel-xxsmall) var(--rel-xsmall);
  padding: 0px 0px;
`;

export { Conversation };
