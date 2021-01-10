import { convertDateToShamsi } from "@satek/functions";
import { Avatar, blogColors, P } from "@satek/shared-components";
import React from "react";
import styled from "styled-components";
import AvatarImage from "../../../fakeData/img/avatar.png";

interface Props {
  // author: IAuthor;
  authorName: string;
  date: string; // this is for test. use Date type
}

export const ArticleSign: React.FC<Props> = ({ authorName, date }) => {
  return (
    <Wrapper>
      <DetailWrapper>
        <SignItem color={blogColors.neutral}>{authorName}</SignItem>
        <SignItem color={blogColors.neutralLight}>
          {convertDateToShamsi(date)}
        </SignItem>
      </DetailWrapper>
      <AvatarSign src={AvatarImage} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const AvatarSign = styled(Avatar)`
  width: 4rem;
  height: 4rem;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SignItem = styled(P)`
  margin: 0.25rem 0 0.5rem 0.75rem;
`;
