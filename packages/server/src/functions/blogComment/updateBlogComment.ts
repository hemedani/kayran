import { changeTotalBlogCommentsForPost } from "./utils/changeTotalBlogCommentsForPost.ts";
import { throwError } from "./../../utils/throwErr.ts";
import { Context } from "../utils/context.ts";
import {
	blogComments,
	BlogCommentStatus,
	RBlogComment,
} from "./../../schemas/blogComment.ts";
import { checkUpdateBlogComment } from "./updateBlogComment.val.ts";
import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";
import { getBlogComment } from "./funcs/getBlogComment.ts";
/**
 * Represent Input details
 * this is input of updating BlogComment
 * object "get" for specify user what wants to return
 * object "set" for input value involve(blogCommentStatus)
 * @interface
 */
interface UpdateBlogCommentDetails {
	set: {
		//this is the _id of the blogComment that we want to update
		_id: string;
		//this field is the field that can be modified on blogComment
		BlogCommentStatus: BlogCommentStatus;
	};
	get: RBlogComment;
}

type UpdateBlogComment = (
	details: UpdateBlogCommentDetails,
	context?: Context
) => any;

/**
 * Represent updateBlogComment (update blogComment status on db)
 * @function
 * @param details
 * @param context
 */
export const updateBlogComment: UpdateBlogComment = async (
	details,
	context
) => {
	// TODO:authentication should be done

	const detailsIsRight = checkUpdateBlogComment({ details });
	detailsIsRight !== true && throwError(detailsIsRight[0].message);
	const {
		set: { _id, BlogCommentStatus: newBlogCommentStatus },
		get,
	} = details;
	console.log(newBlogCommentStatus);
	const blogComment = await blogComments!.findOne({
		_id: new Bson.ObjectID(_id),
	});
	console.log(blogComment, "------blogComment");

	//change totalComment in BlogPost collection
	await changeTotalBlogCommentsForPost(
		blogComment?.blogPost._id,
		blogComment?.blogCommentStatus, //previous comment status
		newBlogCommentStatus //new blog status
	);

	await blogComments.updateOne(
		{ _id: new Bson.ObjectID(_id) },
		{
			blogCommentStatus: newBlogCommentStatus,
		}
	);

	const updatedBlogComment = await blogComments!.findOne({
		_id: new Bson.ObjectID(_id),
	});
	console.log(updatedBlogComment, "---------------updatedBlogComment");
	return updatedBlogComment;
	// TODO: handle the get part!(I need to return the foundNewBlogCategory and the get part)
	// return get
	// 	 ? getBlogComment({ _id: updatedBlogComment!._id, get })
	// 	: updatedBlogComment;
};
