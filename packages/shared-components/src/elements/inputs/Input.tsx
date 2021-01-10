import styled from "styled-components";
import { colors, Fonts } from "../../GlobalStyle";
import { IColor } from "../../interfaces/IColor";
import { IFont } from "../../interfaces/IFont";
import { ISize } from "../../interfaces/ISize";

interface IProps extends IColor, ISize, IFont {
  flex?: number;
  enableFocus?: boolean;
  center?: boolean;
  direction?: "rtl" | "ltr";
  error?: boolean;
}

//TODO Fix properties to share between all apps
export const Input = styled.input<IProps>`
  display: flex;
  align-items: center;

  flex: ${(props) => props.flex || 0};

  border: 0;
  width: ${(props) => props.width};

  height: ${(props) => props.height || "2.5rem"};
  min-height: ${(props) => props.height || "2.5rem"};

  border-radius: 1rem;

  background: ${(props) => props.bg || colors.aliceBlue};

  border: ${(props) => (props.error ? `1px solid ${colors.red}` : "")};

  direction: ${(props) => props.direction || "rtl"};
  font-size: ${(props) => props.fontSize || "1rem"};
  font-family: ${(props) => props.fontWeight || Fonts.primaryFont};
  text-align: ${(props) => (props.center ? "center" : "")};

  &:disabled {
    cursor: not-allowed;
  }

  &:focus {
    border-radius: 1rem;
    outline: none;
    border: 1px solid ${colors.primaryBlue};
  }
`;
