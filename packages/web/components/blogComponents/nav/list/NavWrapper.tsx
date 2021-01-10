import { blogColors, deviceMedia } from "@kayran/shared-components";
import styled from "styled-components";

export const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  /* position: relative; */
`;

export const NavWrapper = styled.nav`
  display: flex;
  /* position: sticky; */

  z-index: 3;

  height: 4rem;
  direction: rtl;

  flex: 1;

  box-shadow: -0.125rem 0.1875rem 0.625rem #0000001a;

  margin: 0;
  display: flex;
  background-color: ${blogColors.white};
  padding: 0 1rem;

  @media ${deviceMedia.lg} {
    padding: 0 4rem;
  }
`;

export const NavListWrapper = styled.ul`
  display: none;
  padding: 0;
  margin: 0;
  flex: 1 1 auto;

  @media ${deviceMedia.lg} {
    display: flex;
  }
`;

interface SectionProps {
  flexGrow?: number;
  flexShrink?: number;
}

export const NavSection = styled.section<SectionProps>`
  display: flex;
  flex-grow: ${(props) => props.flexGrow || 0};
  flex-shrink: ${(props) => props.flexGrow || 1};

  align-items: center;
`;
