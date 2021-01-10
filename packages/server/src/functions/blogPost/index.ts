import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { throwError } from "../../utils/throwErr.ts";
import { deleteBlogPost } from "./deleteBlogPost.fn.ts";
import { createBlogPost } from "./createBlogPost.fn.ts";
import { updateBlogPost } from "./updateBlogPost.fn.ts";

const v = new FastestValidator();
const check = v.compile({
	doit: {
		type: "enum",
		values: ["createBlogPost", "updateBlogPost", "deleteBlogPost"],
	},
});

export type BlogPostDoit =
	| "createBlogPost"
	| "updateBlogPost"
	| "deleteBlogPost";

type BlogPostFns = (doit: BlogPostDoit, details: any, context: any) => any;

export const blogPostFns: BlogPostFns = (doit, details, context) => {
	const checkDoit = check({ doit });
	return checkDoit === true
		? {
				["createBlogPost"]: async () => await createBlogPost(details, context),
				["updateBlogPost"]: async () => await updateBlogPost(details, context),
				["deleteBlogPost"]: async () => await deleteBlogPost(details, context),
		  }[doit]()
		: throwError(checkDoit[0].message);
};
