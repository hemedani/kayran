import { blogColors, deviceMedia } from "@kayran/shared-components";
import React from "react";
import styled from "styled-components";
import { PromotionReactions } from "../../reactions/PromotionReactions";
import { BlogDescriptionParagraph as CDescription } from "../../texts/BlogDescriptionParagraph";
import { BlogDetailParagraph as Detail } from "../../texts/BlogDetailParagraph";
import { BlogTitleParagraph } from "../../texts/BlogTitleParagraph";
import { Separator } from "../postList/BlogNewPostList";

const imageSrc = "../../../../fakeData/img/1.jpg";

export interface getBlogPosts_getBlogPosts_blogCategories {
  __typename: "BlogCategory";
  id: any | null;
  name: string;
}
export interface getBlogPosts_getBlogPosts {
  __typename: "BlogPost";
  id: any | null;
  createdAt: any | null;
  title: string;
  summary: string;
  authorName: string;
  totalFeedBacks: number | null;
  totalBlogComments: number | null;
  promotion: number | null;
  blogCategories: getBlogPosts_getBlogPosts_blogCategories[];
}

export const BlogNewPostCard: React.FC<getBlogPosts_getBlogPosts> = ({
  id,
  totalBlogComments,
  totalFeedBacks,
  summary,
  authorName,
  blogCategories,
  createdAt,
  title,
}) => {
  // const history = useHistory();
  // const navigate = () => history.push(`/blog/posts/${id}`);

  return (
    <Wrapper>
      <ImageContainer onClick={() => console.log("onClick ImageContainer")}>
        <Image src={imageSrc} />
      </ImageContainer>
      <ContentWrapper>
        <Detail style={{ marginBottom: "1rem" }}>
          {blogCategories.map((category) => category.name + "\t")}
        </Detail>
        <Title
          onClick={() => console.log("onClick ImageContainer")}
          style={{ marginBottom: "1rem" }}
        >
          {title}
        </Title>
        <Detail style={{ marginBottom: "2rem" }}>
          {authorName} {"  "} {createdAt}
        </Detail>
        <Description style={{ marginBottom: "1rem" }}>{summary}</Description>
        <PromotionReactions
          commentsCount={totalBlogComments || 0}
          likesCount={totalFeedBacks || 0}
          color={blogColors.neutralLight}
          style={{ margin: "auto 0 2rem 0.5rem" }}
        />
      </ContentWrapper>
      <Separator
        width="58rem"
        style={{ marginTop: "2.25rem", marginRight: "auto" }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  flex: 2;

  margin-right: 1.5rem;

  @media ${deviceMedia.lg} {
    min-width: 18rem;
  }
`;

const Title = styled(BlogTitleParagraph)`
  :hover {
    cursor: pointer;
  }
`;

const Description = styled(CDescription)`
  display: none;

  @media ${deviceMedia.lg} {
    display: block;
  }
`;

const ImageContainer = styled.div`
  position: relative;

  width: 11rem;
  height: 11rem;

  :hover {
    cursor: pointer;
  }

  @media ${deviceMedia.lg} {
    width: 16rem;
    height: 16rem;
  }

  @media ${deviceMedia.xl} {
    width: 21.75rem;
    height: 21.75rem;
  }
`;

const Image = styled.img`
  border-radius: 0.75rem;

  position: absolute;

  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: center;
`;
