import { deviceMedia } from "@kayran/shared-components";
import React from "react";
import styled from "styled-components";
import { BlogNewPostList } from "./postList/BlogNewPostList";
import { BlogPopularPosts } from "./postList/BlogPopularPosts";

export const BlogPostList = () => {
  return (
    <Wrapper>
      <BlogPopularPosts data={[]} />
      <BlogNewPostList data={[]} />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;

  @media ${deviceMedia.lg} {
    flex-direction: row-reverse;
    justify-content: center;
  }

  margin-top: 3rem;

  width: 100%;
`;
