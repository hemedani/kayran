import React from "react";
import styled from "styled-components";
import { deviceMedia } from "@kayran/shared-components";
import { BlogArticleCard } from "../../../components/blogComponents/aritcle/cards/BlogArticleCard";
import { BlogPopularPosts } from "../../../components/blogComponents/post/postList/BlogPopularPosts";

export const BlogArticle: React.FC = () => {
  return (
    <Wrapper>
      <BlogArticleCard
        data={{
          authorName: "",
          blogCategories: [],
          blogTags: [],
          content: "",
          createdAt: "",
          id: "",
          photo: "",
          summary: "",
          title: "",
          totalBlogComments: 0,
          totalFeedBacks: 0,
          totalViews: 0,
          __typename: "BlogPost",
        }}
      />
      <BlogPopularPosts data={[]} />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;

  @media ${deviceMedia.lg} {
    flex-direction: row;
  }

  margin-top: 3rem;

  width: 100%;
`;
