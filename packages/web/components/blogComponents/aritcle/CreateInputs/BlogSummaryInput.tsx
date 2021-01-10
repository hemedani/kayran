import React, { useState } from "react";
import { BlogInput } from "./inputs/BlogInput";
import { BlogLabeledItem } from "./inputs/BlogLabeledItem";

export const BlogSummaryInput: React.FC = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [hasValue, setHasValue] = useState<boolean>(false);
  return (
    <BlogLabeledItem
      isFocused={isFocused}
      hasValue={hasValue}
      title="چکیده"
      maxLabelWidth="3rem"
    >
      <BlogInput
        as={"textarea"}
        width={"100%"}
        style={{ padding: "1rem", borderRadius: "12px" }}
        height={"16rem"}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e: any) =>
          e.target.value.length === 0 ? setHasValue(false) : setHasValue(true)
        }
      />
    </BlogLabeledItem>
  );
};
