import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { throwError } from "../../utils/throwErr.ts";
import { createBlogComment } from "./createBlogComment.ts";
const v = new FastestValidator();
const check = v.compile({
	doit: {
		type: "enum",
		values: ["createBlogComment"],
	},
});

export type BlogCommentDoit = "createBlogComment";

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
		  }[doit]()
		: throwError(checkDoit[0].message);
};
