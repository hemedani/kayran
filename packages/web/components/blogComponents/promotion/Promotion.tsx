import { getBlogPosts_getBlogPosts } from "@satek/resolvers";
import { deviceMedia } from "@kayran/shared-components";
import React from "react";
import styled from "styled-components";
import { PromotionImage } from "./promotionImage/PromotionImage";

export const Promotion: React.FC<{
  data: getBlogPosts_getBlogPosts[];
}> = ({ data: promotions }) => {
  return (
    <GridContainer>
      <PromotionImage gridArea="picture1" data={promotions[0]} />
      <PromotionImage gridArea="picture2" data={promotions[1]} />
      <PromotionImage gridArea="picture3" data={promotions[2]} />
      <PromotionImage gridArea="picture4" data={promotions[3]} />
    </GridContainer>
  );
};

const GridContainer = styled.section`
  display: flex;
  flex-direction: column;

  @media ${deviceMedia.lg} {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fit, minmax(9rem, 31rem));
    grid-template-rows: 22rem 22rem;
    gap: 1rem 1rem;
    grid-template-areas:
      "picture1 picture2 "
      "picture3 picture4 ";
  }

  @media ${deviceMedia.xl} {
    grid-template-columns:
      minmax(28.5rem, 52.5rem)
      minmax(10rem, 28.5rem) minmax(10rem, 28.5rem);
    grid-template-rows: 28.5rem 23rem;
    grid-template-areas:
      "picture4 picture2 picture1"
      "picture4 picture3 picture3";
  }
`;
