import { blogColors, deviceMedia } from "@kayran/shared-components";
import React from "react";
import styled from "styled-components";
import { ISize } from "../../nav/search/NavSearchResult";
import { BlogPostListTitle as Title } from "../../texts/BlogPostListTitle";
import { BlogBox } from "../BlogBox";
import {
  BlogNewPostCard,
  getBlogPosts_getBlogPosts,
} from "../cards/BlogNewPostCard";

export const BlogNewPostList: React.FC<{
  data: getBlogPosts_getBlogPosts[];
}> = ({ data: posts }) => {
  return (
    <Box>
      <Title as="h2">جدید ترین مطالب</Title>
      <Separator style={{ margin: "1.5rem 0" }} />
      {
        <PostsWrapper>
          {posts.map((post, i) => (
            <BlogNewPostCard {...post} key={i} />
          ))}
        </PostsWrapper>
      }
    </Box>
  );
};

const PostsWrapper = styled.div`
  display: grid;
  gap: 2.25rem;
`;

export const Separator = styled.div<ISize>`
  border: 1px solid ${blogColors.neutralLighter};

  width: 100%;
  max-width: ${({ width }) => width};

  justify-self: flex-end;
`;

const Box = styled(BlogBox)`
  max-width: 84.25rem;

  padding: 1.5rem 2rem;

  margin-top: 1rem;

  * {
    margin-block-start: 0;
    margin-block-end: 0;
  }

  @media ${deviceMedia.lg} {
    margin-top: 0;
  }
`;
