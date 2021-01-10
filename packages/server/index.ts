import { BlogPostDoit, blogPostFns } from "./src/functions/blogPost/index.ts";

import {
	BlogCommentDoit,
	blogCommentFns,
} from "./src/functions/blogComment/index.ts";
import {
	BlogCategoryDoit,
	blogCategoryFns,
} from "./src/functions/blogCategory/index.ts";
import { BlogTagDoit, blogTagFns } from "./src/functions/blogTag/index.ts";
import { serve } from "https://deno.land/std/http/server.ts";
import {
	CountryDoit,
	countryFns,
	UserDoit,
	usrFns,
} from "./src/functions/index.ts";
import { parsBody } from "./src/utils/index.ts";

const s = serve({ port: 8000 });
console.log("http://localhost:8000/");

type model =
	| "User"
	| "State"
	| "City"
	| "Category"
	| "Country"
	| "BlogTag"
	| "BlogCategory"
	| "BlogComment"
	| "BlogPost";

for await (const req of s) {
	try {
		const reqBody = await parsBody(req);
		const response: (
			{
				model,
				doit,
			}: {
				model: model;
				doit: UserDoit | BlogTagDoit | BlogCategoryDoit | string;
			},
			details: any,
			context: any
		) => Promise<any> = async ({ model, doit }, details, context) =>
			({
				["User"]: async () => await usrFns(doit as UserDoit, details),
				["Country"]: async () => await countryFns(doit as CountryDoit, details),
				["State"]: () => ({ _id: "state" }),
				["City"]: () => ({ _id: "city" }),
				["Category"]: () => ({ _id: "category" }),
				["BlogTag"]: async () =>
					await blogTagFns(doit as BlogTagDoit, details, context),
				["BlogCategory"]: async () =>
					await blogCategoryFns(doit as BlogCategoryDoit, details, context),
				["BlogComment"]: async () =>
					await blogCommentFns(doit as BlogCommentDoit, details, context),
				["BlogPost"]: async () =>
					await blogPostFns(doit as BlogPostDoit, details, context),
			}[model]());

		req.respond({
			body: JSON.stringify({
				success: true,
				body: await response(reqBody.wants, reqBody.details, reqBody.context),
			}),
			status: 200,
		});
	} catch (error) {
		req.respond({
			body: JSON.stringify({
				success: false,
				body: error.message || "nothing ...",
			}),

			status: 500,
		});
	}
}
