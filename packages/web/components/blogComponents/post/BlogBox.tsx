import { blogColors } from "@kayran/shared-components";
import styled from "styled-components";
import { ISize } from "../nav/search/NavSearchResult";

export const BlogBox = styled.section<ISize>`
  background: ${blogColors.white};
  border-radius: 0.75rem;

  /* remove this and add to global css of web */
  box-sizing: border-box;

  width: ${({ width }) => width || "100%"};
`;
