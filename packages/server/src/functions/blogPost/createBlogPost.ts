import { Context } from "./../utils/context.ts";
import { getBlogPost } from "./funcs/getBlogPost.ts";
import { handleBlogPostPromotion } from "./utills/handleBlogPostPromotion.ts";
import { BlogTag, blogTags } from "./../../schemas/blogTag.ts";
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
					photo: { type: "string", optional: true },
					blogCategoriesRef: { type: "array", items: "string" },
					blogTagsRef: { type: "array", items: "string" },
					promotion: { type: "number" },
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

interface createBlogPostDetails {
	set: {
		title: string;
		summary: string;
		content: string;
		photo?: string;
		blogCategoriesRef: string[];
		blogTagsRef?: string[];
		promotion: number;
	};
	get: RBlogPost;
}

type CreateBlogPost = (
	details: createBlogPostDetails,
	context: Context
) => Promise<Partial<BlogPost>>;

/**
 * @function
 * Represent create BlogPost(insert a new blogPost to DB)
 * @param details
 * @param context
 */
export const createBlogPost: CreateBlogPost = async (details, context) => {
	//  context ? await isAuthFn(context.token) : throwError("your token is empty");
	// await isAdminFn(user);
	//TODO: take the token extract the userId and create the blogPost with that Uset Id
	const detailsIsRight = check({ details });
	detailsIsRight !== true && throwError(detailsIsRight[0].message);
	const {
		set: {
			title,
			summary,
			content,
			photo,
			blogCategoriesRef,
			blogTagsRef,
			promotion,
		},
		get,
	} = details;
	const postBlogCategories = blogCategoriesRef
		? await getDocumentsFromDocumentRefs(blogCategoriesRef, blogCategories)
		: null;
	const postBlogTags = blogTagsRef
		? await getDocumentsFromDocumentRefs(blogTagsRef, blogTags)
		: null;
	promotion ? await handleBlogPostPromotion(promotion) : null; // const fullBlogCategories = blogCategories

	const createdBlogPost = await blogPosts.insertOne({
		title,
		summary,
		content,
		photo,
		blogCategories: postBlogCategories,
		blogTags: postBlogTags,
		promotion,
		//TODO:the user should be specified
	});

	const ob = new Bson.ObjectID(createdBlogPost);

	return get ? getBlogPost({ _id: ob, get }) : { _id: ob };
};
