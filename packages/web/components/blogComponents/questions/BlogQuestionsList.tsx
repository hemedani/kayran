import { blogColors, deviceMedia } from "@satek/shared-components";
import React, { useState } from "react";
import styled from "styled-components";
import { IQuestionAnswer } from "../../fakeData/QuestionAnswerFakeData";
import { QuestionAnswerItem } from "./QuestionAnswerItem";

interface IProps {
  QAList: IQuestionAnswer[];
}

//TODO The name of QA is more common and better for all component.
// I suggest you to update the names. for example BlogQAList
export const BlogQuestionsList: React.FC<IProps> = ({ QAList }) => {
  const [selectedItem, setSelectedItem] = useState<number | undefined>();

  const onItemClick = (index: number) =>
    setSelectedItem(selectedItem === index ? undefined : index);

  return (
    <Wrapper>
      {QAList.map((QA, i) => (
        <QuestionAnswerItem
          key={i}
          questionNumber={i + 1}
          QA={QA}
          isOpen={selectedItem === i}
          onClick={() => onItemClick(i)}
        />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* box-shadow: 0px 2px 16px ${blogColors.neutralLighter}; */
  @media ${deviceMedia.lg} {
    width: 53rem;
  }
  @media ${deviceMedia.xl} {
    width: 73rem;
  }
`;
