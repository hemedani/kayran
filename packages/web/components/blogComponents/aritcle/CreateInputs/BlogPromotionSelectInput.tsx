import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BlogCheckBoxInput } from "./inputs/BlogCheckBoxInput";
import { BlogPromotionSelect } from "./inputs/BlogPromotionSelect";

export const BlogPromotionSelectInput: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const [isChecked, setChecked] = useState<boolean>(false);
  useEffect(() => {
    !isChecked && setSelectedItem(0);
  }, [isChecked]);
  return (
    <Wrapper>
      <BlogCheckBoxInput
        text="انتخاب به عنوان پست شاخص"
        checked={isChecked}
        setChecked={setChecked}
      />
      <BlogPromotionSelect
        isActive={isChecked}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
