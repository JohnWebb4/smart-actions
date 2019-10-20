import styled, { css } from "styled-components";

interface Props {
  isOutgoing: boolean;
}

const BubbleMessage = styled.li<Props>`
  border-radius: var(--rel-medium);
  list-style-type: none;
  max-width: var(--rel-medium);
  padding: var(--px-medium) var(--px-large);

  ${({ isOutgoing }: Props) => css`
    background: radial-gradient(
      circle at var(--px-medium) var(--px-medium),
      var(${isOutgoing ? "--light-blue" : "--light-gray"}),
      var(${isOutgoing ? "--blue" : "--gray"})
    );
    box-shadow: var(--px-xsmall) var(--px-xsmall) var(--px-xxsmall)
      rgba(${isOutgoing ? "var(--rgb-blue)" : "var(--rgb-gray)"}, 0.2);
    ${isOutgoing ? "justify-self: flex-end" : undefined}
  `}
`;

export { BubbleMessage };
