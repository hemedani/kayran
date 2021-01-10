import React from "react";
import { blogColors, deviceMedia } from "@kayran/shared-components";
import styled from "styled-components";
import {
  CrossIconPath as CrossPath,
  HamburgerIconPath as HamburgerPath,
  HamburIcon,
  NavCrossIcon as CrossIcon,
} from "../icons/HamburgerIcon";
import { NavProps } from "../list/NavList";
import { MainLogo } from "../logo/MainLogo";
import { NavHamburgerList as List } from "./NavHamburgerList";

export const NavHamburger: React.FC<NavProps> = (props: NavProps) => {
  const [isHamburgerActive, setIsHamburgerActive] = React.useState(false);
  return isHamburgerActive ? (
    <>
      <Container>
        <CrossIcon onClick={() => setIsHamburgerActive(!isHamburgerActive)}>
          <CrossPath />
        </CrossIcon>
        <LogoWrapper>
          <MainLogo />
        </LogoWrapper>
        <List {...props} />
      </Container>
      <DarkLayer
        onClick={() => setIsHamburgerActive(!isHamburgerActive)}
      ></DarkLayer>
    </>
  ) : (
    <HamburIcon onClick={() => setIsHamburgerActive(!isHamburgerActive)}>
      <HamburgerPath />
    </HamburIcon>
  );
};

const DarkLayer = styled.div`
  display: fixed;
  position: fixed;
  height: 100%;
  width: 100%;

  background-color: ${blogColors.neutral};
  opacity: 0.5;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Container = styled.div`
  position: fixed;
  height: 100%;
  width: 85%;
  left: 15%;
  top: 0;
  right: 0;
  bottom: 0;

  z-index: 3;
  opacity: 1;

  direction: ltr;
  overflow: auto;

  background-color: ${blogColors.white};
  @media ${deviceMedia.lg} {
    display: none;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin: 0 0 2rem 0;
  padding: 0;
`;
