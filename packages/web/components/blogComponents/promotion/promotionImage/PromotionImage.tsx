import React from "react";
import { getBlogPosts_getBlogPosts } from "../../post/cards/BlogNewPostCard";
import { ManagePost } from "./ManagePost";
import { PromotionDescription } from "./PromotionDescription";
import { PromotionImageWrapper } from "./PromotionImageWrapper";

const imageSrc = "../../../../fakeData/img/1.jpg";

interface IProps {
  data: getBlogPosts_getBlogPosts;
  gridArea: string;
}

export const PromotionImage: React.FC<IProps> = ({ data, gridArea }) => {
  const isAdmin = true;

  return (
    // FIXME fix image source
    <PromotionImageWrapper
      onClick={() => console.log("PromotionImageWrapper Click")}
      url={imageSrc}
      gridArea={gridArea}
      isAdmin={isAdmin}
    >
      {isAdmin && <ManagePost iconsHeight="1.25rem" iconsWidth="1.25rem" />}
      <PromotionDescription {...data} />
    </PromotionImageWrapper>
  );
};
