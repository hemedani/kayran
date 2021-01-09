import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { throwError } from "../../utils/throwErr.ts";
import { createBlogComment } from "./createBlogComment.ts";
import { deleteBlogComment } from "./deleteBlogComment.ts";
import { updateBlogComment } from "./updateBlogComment.ts";
const v = new FastestValidator();
const check = v.compile({
	doit: {
		type: "enum",
		values: ["createBlogComment", "updateBlogComment", "deleteBlogComment"],
	},
});

export type BlogCommentDoit =
	| "createBlogComment"
	| "updateBlogComment"
	| "deleteBlogComment";

type BlogCommentFns = (
	doit: BlogCommentDoit,
	details: any,
	context: any
) => any;

export const blogCommentFns: BlogCommentFns = (doit, details, context) => {
	const checkDoit = check({ doit });
	return checkDoit === true
		? {
				["createBlogComment"]: async () =>
					await createBlogComment(details, context),
				["updateBlogComment"]: async () =>
					await updateBlogComment(details, context),
				["deleteBlogComment"]: async () =>
					await deleteBlogComment(details, context),
		  }[doit]()
		: throwError(checkDoit[0].message);
};
