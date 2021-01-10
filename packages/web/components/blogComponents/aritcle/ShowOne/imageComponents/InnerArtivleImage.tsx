import { deviceMedia } from "@satek/shared-components";
import styled from "styled-components";

export const InnerArticleImage = styled.div<{ url: string }>`
  background: url(${({ url }) => url}) no-repeat;
  background-size: cover;
  background-position-y: center;

  width: 100%;
  margin: 2rem 0;
  padding: 0;

  border-radius: 10px;

  min-height: 12rem;
  @media ${deviceMedia.lg} {
    min-height: 22rem;
  }
  @media ${deviceMedia.xl} {
    min-height: 32rem;
  }
`;
