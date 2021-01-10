import { blogColors } from "@kayran/shared-components";
import styled from "styled-components";
export interface ItemProps {
  isActive: boolean;
}

export const NavLinkItem = styled.li`
  margin: 0;
  padding: 1.4rem 1rem;
  height: 1rem;

  text-align: center;
  color: ${(props: ItemProps) =>
    props.isActive ? ` ${blogColors.primary}` : `${blogColors.neutral}`};
  &:hover {
    color: ${blogColors.primary};
  }

  border-bottom: ${(props: ItemProps) =>
    props.isActive ? `0.1875rem solid ${blogColors.primary}` : "white"};
  list-style: none;
`;
