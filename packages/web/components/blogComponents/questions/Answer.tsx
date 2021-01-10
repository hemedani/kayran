import { P } from "@satek/shared-components";
import React from "react";
import styled from "styled-components";

interface IProps {
  answer: string;
}

export const Answer: React.FC<IProps> = ({ answer }) => {
  return <AnswerWrapper>{answer}</AnswerWrapper>;
};

const AnswerWrapper = styled(P)`
  text-align: justify;
  text-justify: inter-word;

  margin: 2.5rem 1.5rem 3rem;

  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);

  display: none;
  .selected > & {
    display: block;
  }
`;
