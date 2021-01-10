import React from "react";
import styled from "styled-components";
import { blogColors, P } from "@kayran/shared-components";

const logoSrc = "../../../../public/images/Sateklogo.svg";
const Logo = styled.img.attrs({
  src: `${logoSrc}`,
})`
  height: 2rem;
  margin: 1rem 0 1rem 1rem;
`;

const Name = styled(P)`
  font-size: 2em;
  color: ${blogColors.neutral};
  margin: 0 0 0 1rem;
`;

const HomeLink = styled.a.attrs({
  href: "/",
})`
  display: flex;
  align-items: center;
`;

export const MainLogo: React.FC = () => {
  return (
    <HomeLink>
      <Logo />
      <Name>کاریان</Name>
    </HomeLink>
  );
};
