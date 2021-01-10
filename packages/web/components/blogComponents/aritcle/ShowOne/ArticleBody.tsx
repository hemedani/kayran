import React from "react";
import styled from "styled-components";
import mainImage from "../../../fakeData/img/post1.jpg";
import innerImage from "../../../fakeData/img/post2.jpg";
import { BlogDescriptionParagraph } from "../../texts/BlogDescriptionParagraph";
import { InnerArticleImage } from "./imageComponents/InnerArtivleImage";
import { MainArticleImage } from "./imageComponents/MainArticleImage";

//TODO: add images of Article as props
interface Props {
  content: string;
}

export const ArticleBody: React.FC<Props> = ({ content }) => {
  return (
    <Wrapper>
      <MainArticleImage url={mainImage} />
      <ParagraphWrapper>
        <ArticleParagraphPart>{content}</ArticleParagraphPart>
        <InnerArticleImage url={innerImage} />
        <ArticleParagraphPart>{content}</ArticleParagraphPart>
      </ParagraphWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  margin: 0;
`;

const ParagraphWrapper = styled.div`
  margin: 3.5rem 7rem;
  text-align: justify;
  text-justify: inter-word;
`;

const ArticleParagraphPart = styled(BlogDescriptionParagraph)`
  margin: 3.5rem 0;
`;
