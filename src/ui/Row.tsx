import styled, { css } from "styled-components";

interface Props {
  type: "horizontal" | "vertical";
  children?: React.ReactElement | React.ReactElement[];
}

const Row = styled.div<Props>`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

export default Row;
