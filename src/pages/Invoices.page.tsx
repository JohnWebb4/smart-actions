import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { db } from "../clients/db.client";
import { Page } from "../components/Page.component";
import { Invoice } from "../types/invoice";

interface Props {
  uid?: string;
}

const PASTRY_COST = 6; // dollars;

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

    const arrayText = [quantity, flavor, pastry, topping];
    if (topping) {
      arrayText.push(topping);
    }

    return (
      <Invoice key={invoice.id}>
        <h3>Invoice</h3>

        <ul>
          {pastry ? <li>Pasty: {pastry}</li> : null}
          {flavor ? <li>Flavor: {flavor}</li> : null}
          {quantity ? <li>Quantity: {quantity}</li> : null}
        </ul>

        <p> Cost: {quantity ? `$${PASTRY_COST * quantity}.00` : "N/A"}</p>
      </Invoice>
    );
  }

  return (
    <Page>
      <h2>Invoices</h2>

      <div>{invoices.map(renderInvoice)}</div>
    </Page>
  );
}

const Invoice = styled.div`
  border: 1px solid var(--gray);
  border-radius: var(--px-medium);
  box-shadow: var(--px-xsmall) var(--px-xsmall) var(--px-xxsmall)
    rgba(var(--rgb-gray), 0.2);
  display: flex;
  flex-shrink: 1;
  flex-direction: column;
  padding: var(--rel-xxsmall);
`;

export { Invoices };
