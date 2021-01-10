import { blogColors, FontWeights } from "@satek/shared-components";
import React from "react";
import styled from "styled-components";

interface IProps {
  text: string;
  checked: boolean;
  setChecked: (val: boolean) => void;
}

export const BlogCheckBoxInput: React.FC<IProps> = ({
  text,
  checked,
  setChecked,
}) => {
  return (
    <Wrapper>
      <Label checked={checked}>{text}</Label>
      <CheckBoxInput
        onChange={(event: any) => setChecked(event?.target?.checked || false)}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  align-items: center;
  margin: 0.5rem;
`;

const Label = styled.label<{ checked: boolean }>`
  font-size: 1.25em;
  font-weight: ${FontWeights.light};
  color: ${({ checked }) =>
    checked ? `${blogColors.neutral}` : `${blogColors.neutralLight}`};

  margin: 0 0.5rem;
`;
const CheckBoxInput = styled.input.attrs({ type: "checkbox" })``;
