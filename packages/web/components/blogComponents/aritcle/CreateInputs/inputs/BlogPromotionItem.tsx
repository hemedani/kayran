import { blogColors, Circle } from "@satek/shared-components";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MemoCheckMarkIcon from "../../../../../../image/blog/CheckMarkIcon";

interface IProps {
  itemNumber: number;
  isActive: boolean;
  selectedItem: number;
  setSelectedItem: (val: number) => void;
}

export const BlogPromotionItem: React.FC<IProps> = ({
  itemNumber,
  isActive,
  selectedItem,
  setSelectedItem,
}) => {
  const [IsSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    setIsSelected(itemNumber === selectedItem);
  }, [selectedItem]);

  return (
    <Item
      gridArea={`picture${itemNumber}`}
      isActive={isActive}
      isSelected={IsSelected}
      onClick={() => setSelectedItem(itemNumber)}
    >
      <OuterCircle as={CenterItem} width="6.25rem" isSelected={IsSelected}>
        <InnerCircle as={CenterItem} width="4.75rem" isSelected={IsSelected}>
          <MemoCheckMarkIcon
            fill={blogColors.white}
            width="1.5rem"
            height="1rem"
          />
        </InnerCircle>
      </OuterCircle>
    </Item>
  );
};

const CenterItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OuterCircle = styled(Circle)<{ isSelected: boolean }>`
  background-color: ${blogColors.secondaryLight};
  display: ${({ isSelected }) => (isSelected ? "flex" : "none")};
`;
const InnerCircle = styled(Circle)<{ isSelected: boolean }>`
  background-color: ${({ isSelected }) =>
    isSelected ? blogColors.primary : blogColors.secondary};
  opacity: 0.6;
`;

const Item = styled(CenterItem)<{
  isActive: boolean;
  gridArea: string;
  isSelected: boolean;
}>`
  border-radius: 0.5rem;
  grid-area: ${({ gridArea }) => gridArea};
  position: relative;

  width: 100%;
  height: 100%;

  min-height: 6rem;
  margin: 0.25rem;

  display: flex;
  flex-direction: column;

  border: ${({ isActive, isSelected }) =>
    isActive && isSelected ? `1px solid ${blogColors.primary}` : "none"};
  }

  :hover {
    cursor:${({ isActive }) => (isActive ? "pointer" : "not-allowed")};
    border: ${({ isActive }) =>
      isActive ? `0.8px solid ${blogColors.secondary}` : "none"};
    ${OuterCircle}{
      display:${({ isActive }) => isActive && "flex"};
      opacity:${({ isSelected }) => !isSelected && "0.4"};
    }
  }
  background-color: ${({ isActive }) =>
    isActive ? blogColors.secondaryLighter : blogColors.neutralLightest};
  background-size: cover;
`;
