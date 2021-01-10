import React from "react";
import { blogColors } from "@kayran/shared-components";
import styled from "styled-components";
import { BlogDetailParagraph as Detail } from "../../texts/BlogDetailParagraph";
import { BlogTitleParagraph as Title } from "../../texts/BlogTitleParagraph";
import { IPost } from "../../../../fakeData/PostsFakeData";

export interface ISize {
  width?: string;
  height?: string;
}

export const NavSearchResultCard: React.FC<IPost> = ({
  img,
  category,
  title,
  date,
}: IPost) => {
  return (
    <Wrapper>
      <Image src={img} />
      <ContentWrapper>
        <STitle>{title}</STitle>
        <DateAndName>
          <SDetail>{category}</SDetail>
          <SDetail>{date}</SDetail>
        </DateAndName>
        <SSeparator />
      </ContentWrapper>
    </Wrapper>
  );
};

/* used in new search design */
const DateAndName = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  display: flex;
  padding: 0.5rem;
  margin: 0;
`;

const ContentWrapper = styled.div`
  flex: 1;

  flex-direction: column;

  margin: 0 0.5rem;
  padding: 0rem;
  border-radius: 0.3rem;
`;

const Image = styled.img`
  border-radius: 0.3rem;

  width: 3rem;
  height: 3rem;
`;

const STitle = styled(Title)`
  font-size: 0.8em;
  margin-top: 0;
`;

const SDetail = styled(Detail)`
  font-size: 0.7em;
  margin-top: 0;
  font-weight: lighter;
`;

const SSeparator = styled.div<ISize>`
  border: 1px solid ${blogColors.neutralLighter};

  width: 100%;
  max-width: ${({ width }) => width};

  justify-self: flex-end;
`;
