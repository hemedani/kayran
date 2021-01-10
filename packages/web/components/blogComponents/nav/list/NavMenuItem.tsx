import { blogColors } from "@kayran/shared-components";
import styled from "styled-components";
import { NavLinkItem } from "./NavLinkItem";

export const Triangle = styled.span`
  padding-right: 0.3rem;
  font-size: 0.7em;
  ::after {
    content: "🞃";
  }
`;

export const NavMenuItemLink = styled.li`
  margin: 0;
  padding: 1rem 2rem;
  display: flex;

  background-color: ${blogColors.white};
  list-style: none;
  text-align: right;

  color: ${blogColors.neutralDarker};
  &:hover {
    color: ${blogColors.primary};
  }
`;

export const NavMenuItemLinkWrapper = styled.ul`
  margin: 4rem 0;
  padding: 0;
  position: absolute;
  z-index: 1;

  border-radius: 1rem;
  border-collapse: separate;
  display: none;
  &:hover {
    display: block;
  }
`;

export const NavMenuItem = styled(NavLinkItem)`
  &:hover ~ ${NavMenuItemLinkWrapper} {
    display: block;
  }
`;
