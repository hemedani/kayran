import { blogColors } from "@kayran/shared-components";
import styled from "styled-components";
import { BaseIcon } from "./BaseIcon";

export const SearchIconPath = styled.path.attrs({
  fill: blogColors.neutral,
  d:
    "M5.76 11.51a5.73 5.73 0 01-4.07-1.68 5.77 5.77 0 114.07 1.68zM5.76 1a4.76 4.76 0 00-3.38 8.12A4.76 4.76 0 105.75 1zM12.26 12.76a.47.47 0 01-.35-.15l-1.53-1.55a.495.495 0 11.7-.7l1.55 1.55a.5.5 0 01-.35.85z",
})``;

export const SearchIcon = styled(BaseIcon).attrs({
  viewBox: "0 0 12 12",
})`
  flex: 0 1 auto;
  position: absolute;
  left: 0.7rem;
  margin: 0;
`;
