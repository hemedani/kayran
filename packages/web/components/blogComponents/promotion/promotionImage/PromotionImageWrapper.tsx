import { deviceMedia } from "@kayran/shared-components";
import styled from "styled-components";
import { DescriptionDetail, TitleWrapper } from "./PromotionDescription";

export const PromotionImageWrapper = styled.div<{
  url: string;
  gridArea: string;
  isAdmin: boolean;
}>`
  border-radius: 10px;
  grid-area: ${({ gridArea }) => gridArea};
  position: relative;

  width: 100%;
  height: 100%;

  min-height: 15rem;
  margin: 0.5rem 0.25rem;

  display: flex;
  flex-direction: column;
  justify-content: ${({ isAdmin }) => (isAdmin ? `space-between` : `flex-end`)};

  :hover {
    cursor: pointer;
  }

  @media ${deviceMedia.lg} {
    margin: 0;

    &:hover {
      ::after {
        background: transparent
          linear-gradient(180deg, #00000000 0%, #00000017 42%, #000000 100%) 0%
          0% no-repeat padding-box;
      }

      ${DescriptionDetail} {
        transform: translate(0, 0);
      }

      ${TitleWrapper} {
        transform: translate(0, 0);
      }
    }
  }

  background: url(${({ url }) => url}) no-repeat;
  background-size: cover;

  ::after {
    content: " ";
    position: absolute;

    width: 100%;
    height: 100%;

    border-radius: 0 0 0.625rem 0.625rem;
    background: transparent
      linear-gradient(180deg, #00000000 0%, #0000001a 63%, #000000 100%) 0% 0%
      no-repeat padding-box;

    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    top: 0;
    left: 0;
  }
`;
