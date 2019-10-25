import React, { useEffect, useState } from "react";

import { db } from "../clients/db.client";
import { Invoice } from "../types/invoice";

interface Props {
  uid?: string;
}

function Invoices({ uid }: Props) {
  const [invoices, setInvoices] = useState<
    firebase.firestore.QueryDocumentSnapshot[]
  >([]);

  useEffect(() => {
    if (uid) {
      db.collection("users")
        .doc(uid)
        .collection("invoices")
        .onSnapshot(invoicesSnapshot => {
          setInvoices(invoicesSnapshot.docs);
        });
    }
  }, [uid]);

  function renderInvoice(invoice: firebase.firestore.QueryDocumentSnapshot) {
    const { flavor, pastry, quantity, topping } = invoice.data() as Invoice;

    const text = `${quantity} ${flavor} ${pastry}(s) ${
      topping ? `with ${topping}` : ""
    }`;

    return (
      <div key={invoice.id}>
        <h3>Invoice</h3>
        <p>{text}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Invoices</h2>
      <div>{invoices.map(renderInvoice)}</div>
    </div>
  );
}

export { Invoices };
