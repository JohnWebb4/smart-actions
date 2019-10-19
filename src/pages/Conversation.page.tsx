import { User } from "firebase";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { db } from "../clients/db.client";
import { BubbleMessage } from "../components/BubbleMessage.component";
import { Message } from "../types/message";

interface Props {
  user: User;
}

function Conversation({ user }: Props) {
  const [messages, setMessages] = useState<
    firebase.firestore.QueryDocumentSnapshot[]
  >([]);

  function updateMessages(messagesSnapshot: firebase.firestore.QuerySnapshot) {
    setMessages(messagesSnapshot.docs);
  }

  useEffect(() => {
    const messagesCollection = db
      .collection("users")
      .doc(user.uid)
      .collection("messages");

    const onMessageRef = messagesCollection.onSnapshot(updateMessages);

    return () => {
      onMessageRef();
    };
  }, []);

  return (
    <div>
      <MessageContainer>{messages.map(renderMessage)}</MessageContainer>
      <form>
        <input type="text" name="message" />
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
  flex: 1;
`;

export { Conversation };
