import React, { useState } from "react";
import { BlogInput } from "./inputs/BlogInput";
import { BlogLabeledItem } from "./inputs/BlogLabeledItem";

export const BlogTitleInput: React.FC = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [hasValue, setHasValue] = useState<boolean>(false);
  return (
    <BlogLabeledItem
      isFocused={isFocused}
      hasValue={hasValue}
      title="عنوان"
      maxLabelWidth="3rem"
    >
      <BlogInput
        width={"100%"}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e: any) =>
          e.target.value.length === 0 ? setHasValue(false) : setHasValue(true)
        }
      />
    </BlogLabeledItem>
  );
};
