import { ChangeEvent } from "react";
import styled from "styled-components";

interface StyledSelectProps {
  type: string;
}

const StyledSelect = styled.select<StyledSelectProps>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

interface Props {
  options: {
    value: string;
    label: string;
  }[];
  value: string;
  type: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

function Select({ options, value, onChange, ...props }: Props) {
  return (
    <StyledSelect onChange={onChange} value={value} {...props}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
