import React from "react";
import { blogColors } from "@kayran/shared-components";
import styled from "styled-components";
import { BlogDetailParagraph as Description } from "../../texts/BlogDetailParagraph";
import { BlogBox } from "../BlogBox";

interface IProps {
  id: string;
  createdAt: string;
  title: string;
  image: string;
}

export const BlogPopularPostCard: React.FC<IProps> = ({
  id,
  createdAt,
  title,
  image,
}) => {
  return (
    <Box
      onClick={() => console.log("click on BOX BlogPopularPostCard")}
      as="div"
    >
      <ImageContainer>
        <Image src={image} />
      </ImageContainer>

      <ContentWrapper>
        <Description>{title}</Description>
        <Date>{createdAt}</Date>
      </ContentWrapper>
    </Box>
  );
};

const Box = styled(BlogBox)`
  display: flex;
  flex-direction: column;

  height: 24.75rem;

  overflow: hidden;

  :hover {
    cursor: pointer;
  }
`;

const Date = styled(Description)`
  align-self: flex-end;
  color: ${blogColors.neutralLight};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  padding: 1rem;
`;

const ImageContainer = styled.div`
  position: relative;

  width: 100%;
  height: 18rem;
`;

const Image = styled.img`
  position: absolute;

  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: center;
`;
