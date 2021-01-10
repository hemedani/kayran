import { blogColors } from "@kayran/shared-components";
import styled from "styled-components";

export const ToolsIconWrapper = styled.div<{ bgColor?: blogColors }>`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ bgColor }) => bgColor || blogColors.secondaryLight};
  border: ${({ bgColor }) =>
    bgColor ? `none` : `1px solid ${blogColors.neutralLight}`};
  border-radius: 50%;

  opacity: 0.6;

  width: 3.25rem;
  height: 3.25rem;

  margin: 0 0.25rem;
`;
