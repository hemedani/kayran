import React from "react";
import styled from "styled-components";
import { deviceMedia } from "@kayran/shared-components";
import { BlogPostListTitle as Title } from "../../texts/BlogPostListTitle";
import { getBlogPosts_getBlogPosts } from "../cards/BlogNewPostCard";
import { BlogPopularPostCard } from "../cards/BlogPopularPostCard";

const imageSrc = "../../../../fakeData/img/2.jpg";

export const BlogPopularPosts: React.FC<{
  data: getBlogPosts_getBlogPosts[];
}> = ({ data }) => {
  return (
    <Wrapper>
      <Title>محبوب‌ترین پست‌ها</Title>
      <PostsWrapper>
        {data.map((post, i) => (
          <BlogPopularPostCard {...post} key={i} image={imageSrc} />
        ))}
      </PostsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;

  @media ${deviceMedia.lg} {
    margin-right: 2.5rem;
    max-width: 24rem;
  }
`;

const PostsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  @media ${deviceMedia.lg} {
    flex-direction: column;
    > *:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`;
