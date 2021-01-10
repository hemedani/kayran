import { getBlogPost_getBlogPost } from "@satek/resolvers";
import React from "react";
import { BlogBox } from "../../post/BlogBox";
import { ArticleBody } from "../ShowOne/ArticleBody";
import { ArticleHeader } from "../ShowOne/ArticleHeader";

export const BlogArticleCard: React.FC<{ data: getBlogPost_getBlogPost }> = ({
  data,
}) => {
  return (
    <BlogBox>
      <ArticleHeader {...data} />
      <ArticleBody {...data} />
    </BlogBox>
  );
};
