import styled, { css } from "styled-components";

type RowType = {
  type?: string;
  children?: JSX.Element | JSX.Element[];
};

const Row = styled.div<RowType>`
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

Row.defaultProps = {
  type: "vertical",
};

export default Row;
