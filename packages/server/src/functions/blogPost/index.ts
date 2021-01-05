import { createBlogPost } from "./createBlogPost.ts";
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { updateBlogPost } from "./updateBlogPost.ts";
import { throwError } from "../../utils/throwErr.ts";

const v = new FastestValidator();
const check = v.compile({
	doit: {
		type: "enum",
		values: ["createBlogPost", "updateBlogPost"],
	},
});

export type BlogPostDoit = "createBlogPost" | "updateBlogPost";

type BlogPostFns = (doit: BlogPostDoit, details: any, context: any) => any;

export const blogPostFns: BlogPostFns = (doit, details, context) => {
	const checkDoit = check({ doit });
	return checkDoit === true
		? {
				["createBlogPost"]: async () => await createBlogPost(details, context),
				["updateBlogPost"]: async () => await updateBlogPost(details, context),
		  }[doit]()
		: throwError(checkDoit[0].message);
};
