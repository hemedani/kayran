import { deviceMedia } from "@kayran/shared-components";
import React, { useState } from "react";
import styled from "styled-components";
import { NavHamburger as Hamburger } from "./hamburger/NavHamburger";
import { NavList } from "./list/NavList";
import {
  NavContainer as Container,
  NavSection as Section,
  NavWrapper as Wrapper,
} from "./list/NavWrapper";
import { MainLogo } from "./logo/MainLogo";
import { NavSearch as Search } from "./search/NavSearch";

export interface getBlogCategories_getBlogCategories {
  __typename: "BlogCategory";
  id: any | null;
  name: string;
  iconUrl: string | null;
  description: string | null;
}

interface CategoryProps {
  data?: getBlogCategories_getBlogCategories[];
}

export const BlogNav: React.FC<CategoryProps> = ({ data }: CategoryProps) => {
  const [activeMenuId, setActiveMenuId] = useState(0);
  return (
    <Container>
      <Wrapper>
        {/* <SideWrapper /> */}
        <Section>
          <Hamburger
            activeMenuId={activeMenuId}
            setActiveMenuId={setActiveMenuId}
            // blogCategories={{ ...data }}
          />
        </Section>
        <Section flexGrow={0.1}>
          <MainLogo />
        </Section>
        <Section flexGrow={5}>
          <NavList
            activeMenuId={activeMenuId}
            setActiveMenuId={setActiveMenuId}
            // blogCategories={{ ...data }}
          />
        </Section>
        <Section flexGrow={3.5}>
          <Search />
        </Section>
        {/* <SideWrapper /> */}
      </Wrapper>
    </Container>
  );
};

const SideWrapper = styled.div`
  @media ${deviceMedia.xl} {
    flex: 25 25 auto;
  }
`;
