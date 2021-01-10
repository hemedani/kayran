import { blogColors, FontWeights } from "@kayran/shared-components";
import React from "react";
import styled from "styled-components";
import { BlogCreateArticleCard } from "../../../components/blogComponents/aritcle/cards/BlogCreateArticleCard";
import { BlogBox } from "../../../components/blogComponents/post/BlogBox";

export const BlogCreateArticle: React.FC = () => {
  return (
    <Wrapper>
      <CreateBox>
        <TitleWrapper>
          <Title>پست جدید</Title>
        </TitleWrapper>
        <BodyWrapper>
          <BlogCreateArticleCard />
        </BodyWrapper>
      </CreateBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const CreateBox = styled(BlogBox)`
  //FIXME the colour shouldn't be static
  box-shadow: 0px 4px 16px #0000001a;
  border-radius: 20px;

  max-width: 83.5rem;
  margin-top: 2.25rem;

  display: flex;
  flex-direction: column;
`;

const TitleWrapper = styled.div`
  width: 100%;
  margin: 0;
  border-radius: 20px 20px 0px 0px;
  background-color: ${blogColors.primary};
  display: flex;
  justify-content: start;
`;

const Title = styled.h1`
  font-size: 1.25em;
  font-weight: ${FontWeights.light};
  color: ${blogColors.white};
  margin: 1.25rem 2rem;
`;

const BodyWrapper = styled.div`
  padding: 4.5rem 3rem;
`;
