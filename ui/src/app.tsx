import React, { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { Card } from "./components/Card";

import Urbit from "@urbit/http-api";
import { Charges, ChargeUpdateInitial, scryCharges } from "@urbit/api";

const api = new Urbit("", "", window.desk);
api.ship = window.ship;

type IProps = {
  history?: History;
};

const Page = styled.div`
  padding: 0 12px;
  background: var(--rlm-window-color);
  font-family: var(--rlm-font);
  color: var(--rlm-text-color);
`;

const H1 = styled.h1`
  font-family: var(--rlm-font);
  color: var(--rlm-text-color);
`;

export const App: FC<IProps> = observer((props: IProps) => {
  const [apps, setApps] = useState<Charges>();

  useEffect(() => {
    async function init() {
      const charges = (await api.scry<ChargeUpdateInitial>(scryCharges))
        .initial;
      setApps(charges);
    }

    init();
  }, []);
  console.log(api);

  return (
    <Page>
      <H1>Test App</H1>
      <Card style={{ marginTop: 12 }}>This is a card</Card>
      {/* <Card style={{ marginTop: 12 }}>This is a card 2</Card> */}
    </Page>
  );
});
