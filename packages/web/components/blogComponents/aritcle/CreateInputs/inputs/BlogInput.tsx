import { blogColors, Input } from "@satek/shared-components";
import styled from "styled-components";

export const BlogInput = styled(Input)`
  background-color: ${blogColors.white};
  height: 3rem;
  padding: 0.5rem 1rem;
  border-radius: 32px;
  border: 1px solid ${blogColors.neutralLighter};

  &:focus {
    border-radius: 32px;
    border-color: ${blogColors.primary};
  }
`;
