import React from "react";
import styled from "styled-components";
import { Page } from "../components/Page.component";

function Home() {
  return (
    <Page center>
      <HeroContainer></HeroContainer>

      <TitleContainer>
        <Title>Pastries that you love.</Title>
        <Title>A price you can't beat.</Title>
      </TitleContainer>

      <Caption>Start an order today</Caption>
    </Page>
  );
}

const Caption = styled.h2`
  text-align: center;
`;

const HeroContainer = styled.div`
  background-attachment: fixed;
  background-image: url(bakery.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 500px;
`;

const Title = styled.h1`
  text-align: center;
`;

const TitleContainer = styled.div`
  margin: var(--rel-small) 0;
`;

export { Home };
