import { blogColors } from "@kayran/shared-components";
import React, { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { ItemProps } from "../list/NavLinkItem";
import { NavProps } from "../list/NavList";
import { Triangle } from "../list/NavMenuItem";
import {
  INavMenuItemsDetail,
  navMenuItemsDetail as ListItems,
  subMenuList,
} from "../list/navMenuItemsDetail";

export const NavHamburgerList: React.FC<NavProps> = ({
  activeMenuId,
  setActiveMenuId,
}: // blogCategories,
NavProps) => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  return (
    <Wrapper>
      {ListItems.map((item: INavMenuItemsDetail) =>
        item && item.isMenu ? (
          <>
            <Menu
              key={item.id}
              isActive={isMenuActive}
              onClick={() => {
                handleMenuClick(
                  setActiveMenuId,
                  activeMenuId,
                  setIsMenuActive,
                  isMenuActive
                );
              }}
            >
              <Triangle />
              {item.title}
            </Menu>
            <SubMenuWrapper isActive={isMenuActive}>
              {
                // blogCategories.map(
                subMenuList.map((subMenu) => (
                  <SubMenuList key={subMenu.id}>{subMenu.title}</SubMenuList>
                ))
              }
            </SubMenuWrapper>
          </>
        ) : (
          <List key={item.id} onClick={() => setActiveMenuId(item.id)}>
            {item.title} <a href={item.link}></a>
          </List>
        )
      )}
    </Wrapper>
  );
};

const handleMenuClick = (
  setActiveMenuId: Dispatch<SetStateAction<number>>,
  activeMenuId: number,
  setIsMenuActive: Dispatch<SetStateAction<boolean>>,
  isMenuActive: boolean
) => {
  setActiveMenuId(activeMenuId);
  setIsMenuActive(!isMenuActive);
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const List = styled.li`
  display: block;
  padding: 1rem;
  text-align: right;
  list-style: none;

  color: ${blogColors.neutral};
`;

const Menu = styled(List)`
  color: ${(props: ItemProps) =>
    props.isActive ? ` ${blogColors.white}` : `${blogColors.neutral}`};
  background-color: ${(props: ItemProps) =>
    props.isActive ? ` ${blogColors.primary}` : `${blogColors.white}`};
`;

const SubMenuList = styled(List)`
  padding: 1rem 2rem;
  background-color: ${blogColors.neutralLighter};
  color: ${blogColors.neutral};
`;

const SubMenuWrapper = styled.div`
  padding: 0;
  margin: 0;
  display: ${({ isActive }: ItemProps) => (isActive ? "static" : "none")};
`;
