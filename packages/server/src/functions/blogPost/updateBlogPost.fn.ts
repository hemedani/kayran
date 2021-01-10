import { handleBlogPostPromotion } from "./utills/handleBlogPostPromotion.ts";
import {
	blogTags,
	blogPosts,
	RBlogPost,
	blogCategories,
} from "./../../schemas/index.ts";
import {
	checkUpdateBlogPost,
	UpdateBlogPostDetails,
} from "./updateBlogPost.type.ts";
import { Context } from "../utils/context.ts";
import { throwError } from "../../utils/throwErr.ts";
import { Bson } from "https://deno.land/x/mongo@v0.20.1/mod.ts";
import { getDocumentsFromDocumentRefs } from "./utills/getDocumentsFromDocumentsRef.ts";

type UpdateBlogPost = (
	details: UpdateBlogPostDetails,
	context?: Context
) => any;

/**
 * Represent updateCategory (update category on db)
 * @function
 * @param details
 * @param context
 */
export const updateBlogPost: UpdateBlogPost = async (details, context) => {
	// TODO:authentication should be done

	const detailsIsRight = checkUpdateBlogPost({ details });
	detailsIsRight !== true && throwError(detailsIsRight[0].message);
	const {
		set: {
			_id,
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

	//get blogCategory Documents from blogCategoryIDs array
	const newBlogCategories = blogCategoryIDs
		? await getDocumentsFromDocumentRefs(blogCategoryIDs, blogCategories)
		: null;

	//get blogTag Documents from blogTagIDs array
	const newBlogTags = blogTagIDs
		? await getDocumentsFromDocumentRefs(blogTagIDs, blogTags)
		: null;

	//handle the promotion rating
	promotion ? await handleBlogPostPromotion(promotion) : null;

	await blogPosts.updateOne(
		{ _id: new Bson.ObjectID(_id) },
		{
			$set: {
				title,
				summary,
				content,
				photo,
				blogCategories: newBlogCategories,
				blogTags: newBlogTags,
				promotion,
			},
		}
	);

	const foundNewBlogPost = await blogPosts.findOne({
		_id: new Bson.ObjectID(_id),
	});

	return foundNewBlogPost;
	// TODO: handle the get part!(I need to return the foundNewBlogPost and the get part)
	// return get
	// 	? getBlogPost({ _id: foundNewBlogPost!._id, get })
	// 	: foundNewBlogPost;
};
