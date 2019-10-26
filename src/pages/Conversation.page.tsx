import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { db } from "../clients/db.client";
import { BubbleMessage } from "../components/BubbleMessage.component";
import { Page } from "../components/Page.component";
import { Message } from "../types/message";
import { scrollTo } from "../utils/scroll.util";

interface Props {
  uid?: string;
}

function Conversation({ uid }: Props) {
  const [messages, setMessages] = useState<
    firebase.firestore.QueryDocumentSnapshot[]
  >([]);
  const [text, setText] = useState<string>("");
  const pageRef = useRef<HTMLDivElement | null>(null);
  const previousMessages = useRef<firebase.firestore.QueryDocumentSnapshot[]>(
    []
  );

  // Load messages
  useEffect(() => {
    const messagesCollection = db
      .collection("users")
      .doc(uid)
      .collection("messages");

    // Callback to continuously update
    const onMessageRef = messagesCollection.onSnapshot(function onMessage(
      messagesSnapshot
    ) {
      setMessages(messagesSnapshot.docs);
    });

    return () => {
      onMessageRef();
    };
  }, []);

  useEffect(() => {
    // If new message then scroll
    if (
      messages.length !== previousMessages.current.length &&
      previousMessages.current.length !== 0 &&
      pageRef.current
    ) {
      scrollTo(0, pageRef.current.scrollHeight);
    }

    previousMessages.current = messages;
  }, [messages]);

  function onSubmit(e: any): void {
    const created = new Date();

    // Send message
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
    <>
      <Page ref={pageRef} center flex id="messagePage">
        <MessageContainer>{messages.map(renderMessage)}</MessageContainer>
      </Page>

      <InputContainer onSubmit={onSubmit}>
        <InputText
          autoFocus
          name="message"
          value={text}
          onChange={onTextChange}
        />

        <SubmitButton type="submit" value="Send" />
      </InputContainer>
    </>
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
  flex: 1;
  min-height: 75vh;
  flex-direction: column;
  margin: var(--rel-xxsmall) var(--rel-xsmall);
  padding: 0;
`;

const InputContainer = styled.form`
  display: flex;
  flex: 1;
  flex-direction: row;
  margin: 0;
  padding: 0;
  position: sticky;
  bottom: 0;
`;

const InputText = styled.input`
  border: 1px solid var(--black);
  display: flex;
  font-size: 1.2em;
  padding: var(--px-small);
  flex: 8;
`;

const SubmitButton = styled.input`
  border-radius: 0 var(--rel-small) var(--rel-small) 0;
  justify-content: center;
  background-color: var(--blue);
  display: flex;
  flex: 1;
  font-size: 1.5em;
  padding: var(--px-small);
`;

export { Conversation };
