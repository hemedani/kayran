import { deviceMedia, P } from "@kayran/shared-components";
import styled from "styled-components";

export const BlogTitleParagraph = styled(P)`
  font-size: 1.25em;
  @media ${deviceMedia.md} {
    font-size: 1.75em;
  }
`;
