import React from "react";
import styled from "styled-components";
import { BlogPromotionItem } from "./BlogPromotionItem";

interface IProps {
  isActive: boolean;
  selectedItem: number;
  setSelectedItem: (val: number) => void;
}

export const BlogPromotionSelect: React.FC<IProps> = (props) => {
  return (
    <Container>
      <BlogPromotionItem {...props} itemNumber={1} />
      <BlogPromotionItem {...props} itemNumber={2} />
      <BlogPromotionItem {...props} itemNumber={3} />
      <BlogPromotionItem {...props} itemNumber={4} />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  justify-content: center;

  grid-template-columns: 17.5rem 9.25rem 9.25rem;
  grid-template-rows: 9.375rem 7.5rem;
  gap: 0.5rem 0.5rem;
  grid-template-areas:
    "picture4 picture2 picture1"
    "picture4 picture3 picture3";
`;
