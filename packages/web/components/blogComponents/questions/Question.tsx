import { blogColors, P } from "@satek/shared-components";
import React from "react";
import styled from "styled-components";

interface IProps {
  question: string;
  questionNumber: number;
}

export const Question: React.FC<IProps> = ({
  questionNumber,
  question: question,
}) => {
  return (
    <Wrapper>
      <QuestionNumber>{questionNumber}</QuestionNumber>
      <QuestionText as="h2">{question}</QuestionText>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;

  padding: 0 1.5rem;

  border-bottom: 1px solid ${blogColors.neutralLighter};

  .selected > & {
    background-color: ${blogColors.secondaryLight};
    border-bottom: none;
    border-radius: 10px 10px 0 0;
  }
`;

const QuestionNumber = styled(P)`
  background-color: ${blogColors.secondaryLight};
  color: ${blogColors.primaryDark};
  .selected > ${Wrapper} > & {
    background-color: ${blogColors.primary};
    color: ${blogColors.secondaryLight};
  }

  //TODO i didn't see the result. I don't think setting width and height
  // for P is right.
  width: 3rem;
  height: 3rem;
  border-radius: 1.5rem;

  justify-content: center;
`;

//TODO It's a text while called as h2
const QuestionText = styled(P)`
  margin: 0 2rem;

  .selected > ${Wrapper} > & {
    color: ${blogColors.primaryDark};
  }
`;
