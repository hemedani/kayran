import { blogColors } from "@satek/shared-components";
import React, { CSSProperties } from "react";
import styled from "styled-components";
import { PromotionReactionCount } from "./PromotionReactionCount";

interface IProps {
  likesCount: number;
  commentsCount: number;
  color?: blogColors;
  style?: CSSProperties;
}

export const PromotionReactions: React.FC<IProps> = ({
  likesCount,
  commentsCount,
  color,
  style,
}) => {
  return (
    <Wrapper style={style}>
      <PromotionReactionCount
        type="comment"
        count={commentsCount}
        color={color}
      />
      <PromotionReactionCount type="like" count={likesCount} color={color} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0.5rem 2rem;
`;
