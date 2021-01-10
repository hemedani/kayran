import { blogColors } from "@satek/shared-components";
import React, { useState } from "react";
import styled from "styled-components";
import { IQuestionAnswer } from "../../fakeData/QuestionAnswerFakeData";
import { BlogBox } from "../post/BlogBox";
import { Answer } from "./Answer";
import { Question } from "./Question";
//FIXME VERY IMPORTANT: ALWAYS remove un-used imports ⬆️
// by pressing ctrl + shift + o in vscode.

interface IProps {
  onClick: () => void;
  isOpen: boolean;
  QA: IQuestionAnswer;
  questionNumber: number;
}

export const QuestionAnswerItem: React.FC<IProps> = ({
  QA,
  isOpen,
  questionNumber,
  onClick,
}) => {
  return (
    <Wrapper className={(isOpen && "selected") || ""} onClick={onClick}>
      <Question {...QA} questionNumber={questionNumber} />
      <Answer {...QA} />
    </Wrapper>
  );
};

const Wrapper = styled(BlogBox)`
  //FIXME again font-size defined in div. it decreases the code DX
  /* font-size: 1.25em; */

  /* box-shadow: 0px 2px 16px ${blogColors.neutralLighter}; */
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);

  :not(:first-child):not(:last-child) {
    border: none;
    border-radius: 0;
  }
  :first-child {
    border-radius: 10px 10px 0 0;
    border-bottom: none;
  }
  :last-child {
    border-top: none;
    border-radius: 0 0 10px 10px;
  }

  &.selected {
    border-radius: 10px !important;
    margin: 1.5rem 0;
    padding-bottom: 0.5rem;
    box-shadow: 0px 2px 16px ${blogColors.neutralLighter};
  }
  &.selected + & {
    border-radius: 10px 10px 0 0;
  }
`;
