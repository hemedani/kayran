import { getBlogCategoriesSelector_getBlogCategories } from "@satek/resolvers";
import { getOptions } from "@satek/shared-components";
import { getBlogCategoriesSelectorThunk } from "@satek/states";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputActionMeta } from "react-select";
import { BlogLabeledItem } from "./inputs/BlogLabeledItem";
import { BlogSelector } from "./inputs/BlogSelector";

export const BlogCategoryInput: React.FC = () => {
  const { control } = useForm();

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [hasValue, setHasValue] = useState<boolean>(false);
  const [options, setOptions] = useState<
    getBlogCategoriesSelector_getBlogCategories[]
  >([]);

  const onInputChange = (inputValue: string, actionMeta: InputActionMeta) => {
    if (actionMeta.action === "input-change") {
      getBlogCategoriesSelectorThunk({ name: [inputValue] }).then(
        (selectorOptions) => {
          selectorOptions && setOptions(selectorOptions);
        }
      );
    }
  };

  useEffect(() => {
    (async function () {
      try {
        const selectorOptions = await getBlogCategoriesSelectorThunk({});
        selectorOptions && setOptions(selectorOptions);
      } catch (e) {
        console.log("error on fetching selector options", e);
      }
    })();
  }, []);

  return (
    <BlogLabeledItem
      isFocused={isFocused}
      hasValue={hasValue}
      title={isFocused || hasValue ? "دسته بندی" : "دسته بندی را انتخاب کنید"}
      maxLabelWidth="14rem"
    >
      <Controller
        name="categoryId"
        control={control}
        as={BlogSelector}
        options={getOptions(options)}
        isClearable={true}
        onInputChange={onInputChange}
        width={"100%"}
        onFocus={() => setIsFocused(true)}
        onBlur={(e: any) => setIsFocused(false)}
        onChange={(option: any) => {
          if (option[0]) setHasValue(true);
          else setHasValue(false);
        }}
      />
    </BlogLabeledItem>
  );
};
