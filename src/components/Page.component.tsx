import styled, { css } from "styled-components";

interface Props {
  center?: boolean;
  flex?: boolean;
}

const Page = styled.div`
  flex-direction: column;
  padding: 0 var(--rel-small);

  ${({ center, flex }: Props) =>
    css`
      ${center && "align-content: center;"}
      ${flex &&
        `
        display: flex;
        flex: 1;
      `}
    `}
`;

export { Page };
