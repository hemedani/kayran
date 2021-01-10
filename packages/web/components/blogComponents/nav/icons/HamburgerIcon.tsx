import { deviceMedia } from "@kayran/shared-components";
import styled from "styled-components";
import { BaseIcon, BaseIconPath } from "./BaseIcon";

export const HamburIcon = styled(BaseIcon).attrs({
  viewBox: "0 0 20 13",
  width: "2rem",
  height: "2rem",
})`
  margin: 0 0.3rem 0 1.5rem;

  display: static;
  @media ${deviceMedia.lg} {
    display: none;
  }
`;

export const HamburgerIconPath = styled(BaseIconPath).attrs({
  d:
    "M18.78 7.37H.84a.84.84 0 010-1.68h17.94a.84.84 0 010 1.68zM18.78 1.68H.84A.85.85 0 010 .84.85.85 0 01.84 0h17.94a.84.84 0 010 1.68zM18.78 13.25H.84a.84.84 0 010-1.68h17.94a.84.84 0 110 1.68z",
})``;

export const NavCrossIcon = styled(BaseIcon).attrs({
  viewBox: "0 0 600 600",
  width: "1rem",
  height: "1rem",
})`
  margin: 1.5rem 0 0 calc(100% - 2.5rem);
  display: block;
`;

export const CrossIconPath = styled(BaseIconPath).attrs({
  d:
    "M612 36.004L576.521.603 306 270.608 35.478.603 0 36.004l270.522 270.007L0 575.997l35.478 35.4L306 341.411l270.521 269.986 35.479-35.4-270.541-269.986z",
})``;
