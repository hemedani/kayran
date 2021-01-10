import { blogColors, P } from "@kayran/shared-components";
import React from "react";
import styled from "styled-components";
import MemoCommentIcon from "../image/CommentIcon";
import MemoHeartIcon from "../image/HeartIcon";

interface IProps {
  count: number;
  type: "comment" | "like";
  color?: blogColors;
}

export const PromotionReactionCount: React.FC<IProps> = ({
  count,
  type,
  color,
}) => {
  return (
    //FIXME convert icons to font icon
    <Wrapper>
      {type === "comment" ? (
        <MemoCommentIcon fill={color} width="1.25rem" height="1.25rem" />
      ) : (
        <MemoHeartIcon fill={color} width="1.25rem" height="1.25rem" />
      )}
      <P style={{ marginRight: "0.5rem" }} color={color}>
        {count}
      </P>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  margin: 0 0.25rem;
  padding: 0 0.25rem;
`;
