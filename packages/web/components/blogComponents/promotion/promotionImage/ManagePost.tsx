import { blogColors } from "@kayran/shared-components";
import React from "react";
import styled from "styled-components";
import { DeleteToolsBox } from "./DeleteToolsBox";
import { EditToolsBox } from "./EditToolsBox";
import { MoreToolsBox } from "./MoreToolsBox";

interface IProps {
  iconsHeight: string;
  iconsWidth: string;
}

export const ManagePost: React.FC<IProps> = ({ iconsWidth, iconsHeight }) => {
  return (
    <Wrapper>
      <MoreToolsBox height={iconsHeight} width={iconsWidth} />
      <EditToolsBox
        color={blogColors.primary}
        height={iconsHeight}
        width={iconsWidth}
      />
      <DeleteToolsBox
        color={blogColors.primary}
        height={iconsHeight}
        width={iconsWidth}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  direction: ltr;
  margin: 1.25rem;
`;
