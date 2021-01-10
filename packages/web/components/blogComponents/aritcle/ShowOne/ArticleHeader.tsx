import { blogColors } from "@satek/shared-components";
import React from "react";
import styled from "styled-components";
import { PromotionReactions } from "../../reactions/PromotionReactions";
import { BlogTitleParagraph } from "../../texts/BlogTitleParagraph";
import { ArticleSign } from "./ArticleSign";

interface Props {
  title: string;
  authorName: string;
  createdAt: any | null;
  totalFeedBacks: number | null;
  totalBlogComments: number | null;
}

export const ArticleHeader: React.FC<Props> = ({
  title,
  authorName,
  createdAt,
  totalBlogComments,
  totalFeedBacks,
}) => {
  const reactions = {
    likesCount: totalFeedBacks || 0,
    commentsCount: totalBlogComments || 0,
  };
  return (
    <Wrapper>
      <TitleWrapper>
        <Title as="h1">{title}</Title>
        <PromotionReactions {...reactions} color={blogColors.neutral} />
      </TitleWrapper>
      <ArticleSign authorName={authorName || "بدون نام"} date={createdAt} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 2rem 0 0 2rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled(BlogTitleParagraph)`
  margin: 0 2rem;
`;
