import { blogColors, Selector } from "@satek/shared-components";
import styled from "styled-components";

export const BlogSelector = styled(Selector).attrs({
  placeholder: "",
})`
  & > div[class$="control"] {
    background-color: ${blogColors.white};
    border: 1px solid ${blogColors.neutralLighter};
    padding-right: 1rem;
    height: 3rem;
    border-radius: 2rem;
    &:focus {
      border-radius: 32px;
      border-color: ${blogColors.primary};
    }
  }
`;
