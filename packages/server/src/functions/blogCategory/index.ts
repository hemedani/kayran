import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { throwError } from "../../utils/throwErr.ts";
import { createBlogCategory } from "./createBlogCategory.ts";
const v = new FastestValidator();
const check = v.compile({
	doit: {
		type: "enum",
		values: ["createBlogCategory"],
	},
});

export type BlogCategoryDoit = "createBlogCategory";

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
		  }[doit]()
		: throwError(checkDoit[0].message);
};
