interface Invoice {
  flavor: string;
  pastry: string;
  quantity: number;
  topping?: string;
  updated: Date;
}

export { Invoice };
