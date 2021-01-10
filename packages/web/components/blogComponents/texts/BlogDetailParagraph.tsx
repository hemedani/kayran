import { blogColors, deviceMedia, P } from "@kayran/shared-components";
import styled from "styled-components";

export const BlogDetailParagraph = styled(P)`
  color: ${blogColors.neutral};
  font-size: 0.75em;

  @media ${deviceMedia.md} {
    font-size: 1em;
  }
`;
