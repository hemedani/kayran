import { updateBlogTag } from "./updateBlogTag.ts";
import { createBlogTag } from "./createBlogTag.ts";
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { throwError } from "../../utils/throwErr.ts";
import { BlogTag } from "../../schemas/blogTag.ts";
import { deleteBlogTag } from "./deleteBlogTag.ts";
const v = new FastestValidator();
const check = v.compile({
	doit: {
		type: "enum",
		values: ["createBlogTag", "updateBlogTag", "deleteBlogTag"],
	},
});

export type BlogTagDoit = "createBlogTag" | "updateBlogTag" | "deleteBlogTag";

type BlogTagFns = (
	doit: BlogTagDoit,
	details: any,
	context: any
) => Promise<Partial<BlogTag>>;

export const blogTagFns: BlogTagFns = (doit, details, context) => {
	const checkDoit = check({ doit });
	return checkDoit === true
		? {
				["createBlogTag"]: async () => await createBlogTag(details, context),
				["updateBlogTag"]: async () => await updateBlogTag(details, context),
				["deleteBlogTag"]: async () => await deleteBlogTag(details, context),
		  }[doit]()
		: throwError(checkDoit[0].message);
};
