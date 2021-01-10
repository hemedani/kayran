import { Context } from "./../utils/context.ts";
import { getBlogPost } from "./funcs/getBlogPost.ts";
import { handleBlogPostPromotion } from "./utills/handleBlogPostPromotion.ts";
import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";
import { throwError } from "./../../utils/throwErr.ts";
import {
	blogCategories,
	BlogPost,
	blogPosts,
	blogTags,
} from "./../../schemas/index.ts";
import { getDocumentsFromDocumentRefs } from "./utills/getDocumentsFromDocumentsRef.ts";
import {
	checkCreateBlogPost,
	createBlogPostDetails,
} from "./createBlogPost.type.ts";

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
	const detailsIsRight = checkCreateBlogPost({ details });
	detailsIsRight !== true && throwError(detailsIsRight[0].message);
	const {
		set: {
			title,
			summary,
			content,
			photo,
			blogCategoryIDs,
			blogTagIDs,
			promotion,
		},
		get,
	} = details;
	const postBlogCategories = blogCategoryIDs
		? await getDocumentsFromDocumentRefs(blogCategoryIDs, blogCategories)
		: null;
	const postBlogTags = blogTagIDs
		? await getDocumentsFromDocumentRefs(blogTagIDs, blogTags)
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
