import { deviceMedia } from "@satek/shared-components";
import styled from "styled-components";

export const MainArticleImage = styled.div<{ url: string }>`
  background: url(${({ url }) => url}) no-repeat;
  background-size: cover;
  background-position-y: center;

  width: 100%;
  margin: 0;
  padding: 0;

  min-height: 15rem;
  @media ${deviceMedia.lg} {
    min-height: 25rem;
  }
  @media ${deviceMedia.xl} {
    min-height: 35rem;
  }
`;
