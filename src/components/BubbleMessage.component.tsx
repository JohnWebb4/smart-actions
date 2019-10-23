import styled, { css } from "styled-components";

interface Props {
  isOutgoing: boolean;
}

const BubbleMessage = styled.li<Props>`
  list-style-type: none;
  max-width: var(--rel-medium);
  padding: var(--px-medium) var(--px-large);

  ${({ isOutgoing }: Props) => css`
    align-self: ${isOutgoing ? "flex-end" : "flex-start"};
    border-radius: 10% 10% ${isOutgoing ? "0 10%" : "10% 0"};
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
