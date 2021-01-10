import { deviceMedia } from "@satek/shared-components";
import React from "react";
import styled from "styled-components";
import { BlogCategoryInput } from "../CreateInputs/BlogCategoryInput";
import { BlogContentInput } from "../CreateInputs/BlogContentInput";
import { BlogPromotionSelectInput } from "../CreateInputs/BlogPromotionSelectInput";
import { BlogSummaryInput } from "../CreateInputs/BlogSummaryInput";
import { BlogTitleInput } from "../CreateInputs/BlogTitleInput";

interface IProps {}

export const BlogCreateArticleCard: React.FC<IProps> = () => {
  return (
    <Wrapper>
      <Row>
        <Column>
          <BlogCategoryInput />
        </Column>
        <Column>
          <BlogTitleInput />
        </Column>
      </Row>
      <Row>
        <BlogSummaryInput />
      </Row>
      <Row>
        <BlogContentInput />
      </Row>
      <Row>
        <Column>
          <BlogPromotionSelectInput />
        </Column>
        <Column></Column>
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Column = styled.div`
  margin: 0;
  width: 100%;
`;

const Row = styled.div`
  padding: 2rem 2rem;
  display: flex;
  flex-direction: column;
  @media ${deviceMedia.lg} {
    flex-direction: row-reverse;
    justify-content: center;
    & > div:not(:last-child) {
      margin-right: 3.5rem;
    }
  }
`;
