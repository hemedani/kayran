import { P } from "@kayran/shared-components";
import React from "react";
import styled from "styled-components";
import { BlogQuestionsList } from "../../../components/blogComponents/questions/BlogQuestionsList";
import { fakeQuestions } from "../../../fakeData/QuestionAnswerFakeData";

export const BlogQuestions: React.FC = () => {
  const questionListItems = fakeQuestions; // TODO: must fetch from database
  return (
    <Wrapper>
      <Title as="h1"> سوالات متداول</Title>
      <BlogQuestionsList QAList={questionListItems} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(P)`
  margin-top: 3.5rem;
  margin-bottom: 3rem;

  font-size: 2em;
`;
