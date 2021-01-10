import React, { useCallback } from "react";
import { NavLinkItem as LinkItem } from "./NavLinkItem";
import {
  NavMenuItem as MenuItem,
  NavMenuItemLink as SubMenuLink,
  NavMenuItemLinkWrapper as SubListWrapper,
  Triangle,
} from "./NavMenuItem";
import {
  INavMenuItemsDetail,
  navMenuItemsDetail as ListItems,
  subMenuList,
} from "./navMenuItemsDetail";
import { NavListWrapper } from "./NavWrapper";

export interface NavProps {
  setActiveMenuId: React.Dispatch<React.SetStateAction<number>>;
  activeMenuId: number;
  // blogCategories: getBlogCategories_getBlogCategories[];
}

export const NavList: React.FC<NavProps> = ({
  activeMenuId,
  setActiveMenuId,
}: // blogCategories
NavProps) => {
  const isActive = useCallback(
    (id: number, activeMenuId: number) => id === activeMenuId,
    [activeMenuId]
  );
  return (
    <NavListWrapper>
      {ListItems.map((item: INavMenuItemsDetail) =>
        item && item.isMenu ? (
          <MenuItem
            key={item.id}
            isActive={isActive(item.id, activeMenuId)}
            onClick={() => setActiveMenuId(item.id)}
          >
            {item.title}
            <Triangle />
          </MenuItem>
        ) : (
          <LinkItem
            key={item.id}
            isActive={isActive(item.id, activeMenuId)}
            onClick={() => setActiveMenuId(item.id)}
          >
            {item.title} <a href={item.link}></a>
          </LinkItem>
        )
      )}
      <SubListWrapper>
        {subMenuList.map((subMenu) => (
          <SubMenuLink key={subMenu.id}>{subMenu.title}</SubMenuLink>
        ))}
      </SubListWrapper>
    </NavListWrapper>
  );
};
