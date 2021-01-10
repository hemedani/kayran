import { blogComments } from "./../../schemas/blogComment.ts";
import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";
import { blogPosts } from "../../schemas/index.ts";
import { throwError } from "../../utils/throwErr.ts";
import { Context } from "../utils/context.ts";
import {
	checkDeleteBlogPost,
	DeleteBlogPostDetails,
} from "./deleteBlogPost.type.ts";

type DeleteBlogPost = (
	details: DeleteBlogPostDetails,
	context?: Context
) => any;

/**
 * @function
 * Represent delete blogTag(delete the desired blogTag from DB)
 * @param details
 * @param context
 */
export const deleteBlogPost: DeleteBlogPost = async (details, context) => {
	const detailsIsRight = checkDeleteBlogPost({ details });
	detailsIsRight !== true && throwError(detailsIsRight[0].message);
	const {
		set: { _id },
		get: {},
	} = details;

	const deletedBlogPost = await blogPosts.findOne({
		_id: new Bson.ObjectID(_id),
	});
	// step1: delete the comments of this blogPost
	// blogPostId
	await blogComments.deleteMany({
		blogPostId: deletedBlogPost!._id.toString(),
	});
	//step 2: delete the post itself
	await blogPosts.deleteOne({ _id: new Bson.ObjectID(_id) });
	return deletedBlogPost;
};
