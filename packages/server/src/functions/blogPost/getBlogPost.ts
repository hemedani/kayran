import { getBlogPost } from "./funcs/getBlogPost.ts";
import { handleBlogPostPromotion } from "./utills/handleBlogPostPromotion.ts";
import { blogTags } from "./../../schemas/blogTag.ts";
import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";
import { throwError } from "./../../utils/throwErr.ts";
import { User } from "./../../schemas/user.ts";
import {
	BlogPost,
	blogPosts,
	blogPostSelectable,
	RBlogPost,
} from "./../../schemas/blogPost.ts";
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { getDocumentsFromDocumentRefs } from "./utills/getDocumentsFromDocumentsRef.ts";
import { blogCategories } from "../../schemas/blogCategory.ts";

const v = new FastestValidator();
const check = v.compile({
	details: {
		type: "object",
		props: {
			set: {
				type: "object",
				props: {
					title: { type: "string" },
					summary: { type: "string" },
					content: { type: "string" },
					blogCategories: { type: "array", items: "string" },
					blogTags: { type: "array", items: "string" },
				},
			},
			get: {
				type: "object",
				optional: true,
				props: blogPostSelectable(2),
			},
		},
	},
});

interface getBlogPostDetails {
	set: {
		title?: string;
		summary?: string;
		content?: string;
		blogCategories?: string[];
		blogTags?: string[];
	};
	get: RBlogPost;
}

// interface createBlogPostContext {
// 	token: string | null;
// 	user?: User;
// }

type GetBlogPost = (details: getBlogPostDetails) => Promise<Partial<BlogPost>>;

/**
 * @function
 * Represent create BlogPost(insert a new blogPost to DB)
 * @param details
 * @param context
 */
export const getBlogPostFn: GetBlogPost = async (details) => {
	//  context ? await isAuthFn(context.token) : throwError("your token is empty");
	// await isAdminFn(user);
	//TODO: take the token extract the userId and create the blogPost with that Uset Id
	const detailsIsRight = check({ details });
	detailsIsRight !== true && throwError(detailsIsRight[0].message);
	const {
		set: { title, summary, content, blogCategories, blogTags },
		get,
	} = details;

	return get ? getBlogPost({ _id: ob, get }) : { _id: ob };
};
