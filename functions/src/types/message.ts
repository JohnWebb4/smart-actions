interface Message {
  created: Date;
  isOutgoing: boolean;
  text: string;
}

export { Message };
