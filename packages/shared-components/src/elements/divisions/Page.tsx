import styled from "styled-components";
import { colors } from "../../GlobalStyle";

export const Page = styled.div`
  display: flex;
  flex-flow: nowrap row-reverse;
  box-sizing: border-box;
  height: 100vh;
  flex: 1;
  overflow: hidden;
  background: ${colors.aliceBlue};
`;
