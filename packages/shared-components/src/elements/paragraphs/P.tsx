import styled from "styled-components";
import { colors, Fonts } from "../../GlobalStyle";
import { IColor } from "../../interfaces/IColor";
import { IFont } from "../../interfaces/IFont";

export interface IP extends IColor, IFont {
  flex?: number;
  center?: boolean;
  ltr?: boolean;
  align?: "center" | "left" | "right" | "justify";
}

export const P = styled.p<IP>`
  font-family: ${({ fontFamily }) => fontFamily || Fonts.primaryFont};
  font-weight: ${({ fontWeight }) => fontWeight};
  font-size: ${(props) => props.fontSize || "1.25em"};
  text-align: ${(props) => props.align};

  color: ${(props) => (props.color ? props.color : colors.black)};
  background: ${(props) => props.bg};
  border: ${(props) => props.borderColor && `1px solid ${props.borderColor}`};

  flex: ${(props) => props.flex};

  display: flex;
  align-items: center;
  justify-content: ${(props) => props.center && "center"};
  direction: ${(props) => props.ltr && "ltr"};
`;
