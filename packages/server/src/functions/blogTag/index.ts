import { createBlogTag } from "./createBlogTag.ts";
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { throwError } from "../../utils/throwErr.ts";
const v = new FastestValidator();
const check = v.compile({
	doit: {
		type: "enum",
		values: ["createBlogTag"],
	},
});

export type BlogTagDoit = "createBlogTag";

type BlogTagFns = (doit: BlogTagDoit, details: any, context: any) => any;

export const blogTagFns: BlogTagFns = (doit, details, context) => {
	const checkDoit = check({ doit });
	return checkDoit === true
		? {
				["createBlogTag"]: async () => await createBlogTag(details, context),
		  }[doit]()
		: throwError(checkDoit[0].message);
};
