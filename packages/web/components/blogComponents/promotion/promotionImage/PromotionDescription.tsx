import { blogColors, deviceMedia } from "@kayran/shared-components";
import React from "react";
import styled from "styled-components";
import { getBlogPosts_getBlogPosts } from "../../post/cards/BlogNewPostCard";
import { PromotionReactions } from "../../reactions/PromotionReactions";
import { BlogDetailParagraph } from "../../texts/BlogDetailParagraph";
import { BlogTitleParagraph } from "../../texts/BlogTitleParagraph";

export const PromotionDescription: React.FC<getBlogPosts_getBlogPosts> = ({
  title,
  totalBlogComments,
  totalFeedBacks,
  summary,
}) => {
  return (
    <DescriptionWrapper>
      <TitleWrapper>
        <DescriptionTitle as="h2" color={blogColors.white}>
          {title}
        </DescriptionTitle>
        <PromotionReactions
          commentsCount={totalBlogComments || 0}
          likesCount={totalFeedBacks || 0}
          style={{ flex: "1" }}
          color={blogColors.white}
        />
      </TitleWrapper>
      <DescriptionDetail>{summary}</DescriptionDetail>
    </DescriptionWrapper>
  );
};

const DescriptionWrapper = styled.div<{ color?: blogColors }>`
  display: flex;
  flex: 1;

  align-items: flex-end;
  align-content: flex-end;

  color: ${(props) => props.color || blogColors.white};

  z-index: 1;
  position: relative;
  overflow: hidden;

  height: 100%;

  justify-content: space-between;
  flex-wrap: wrap;
`;

const DescriptionTitle = styled(BlogTitleParagraph)<{ color?: blogColors }>`
  margin: 0.5rem 2rem;
  color: ${(props) => props.color || blogColors.black};
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;

  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);

  @media ${deviceMedia.lg} {
    transform: translate(0, 5rem);
  }
`;

export const DescriptionDetail = styled(BlogDetailParagraph)`
  color: ${blogColors.white};
  line-height: 1.75;

  margin: 0 2rem 2rem;

  height: 5rem;
  transform: translate(0, 20rem);

  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  display: none;
  @media ${deviceMedia.lg} {
    display: -webkit-box;
  }
  overflow: hidden;

  transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: display 0.5 linear 0.8;
`;
