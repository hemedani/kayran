import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { throwError } from "../../utils/throwErr.ts";
import { createBlogCategory } from "./createBlogCategory.ts";
import { updateBlogCategory } from "./updateBlogCategory.ts";
const v = new FastestValidator();
const check = v.compile({
	doit: {
		type: "enum",
		values: ["createBlogCategory", "updateBlogCategory"],
	},
});

export type BlogCategoryDoit = "createBlogCategory" | "updateBlogCategory";

type BlogCategoryFns = (
	doit: BlogCategoryDoit,
	details: any,
	context: any
) => any;

export const blogCategoryFns: BlogCategoryFns = (doit, details, context) => {
	const checkDoit = check({ doit });
	return checkDoit === true
		? {
				["createBlogCategory"]: async () =>
					await createBlogCategory(details, context),
				["updateBlogCategory"]: async () =>
					await updateBlogCategory(details, context),
		  }[doit]()
		: throwError(checkDoit[0].message);
};
