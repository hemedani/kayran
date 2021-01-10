import { BlogCommentStatus } from "../../../schemas/blogComment.ts";
import { blogPosts } from "../../../schemas/blogPost.ts";
/**
 * change totalComments in BlogPost collection)
 * @function
 * @param postId
 * @param previousCommentStatus
 * @param newCommentStatus
 * @param isCommentDeleted
 */
export const changeTotalBlogCommentsForPost = async (
	postId: any, //it should be object id but it does not work
	previousCommentStatus?: BlogCommentStatus,
	newCommentStatus?: BlogCommentStatus,
	isCommentDeleted?: boolean
) => {
	previousCommentStatus === BlogCommentStatus.ACCEPT && isCommentDeleted
		? await blogPosts.updateOne(
				{ _id: postId },
				{ $inc: { totalBlogComments: -1 } }
		  )
		: (previousCommentStatus === BlogCommentStatus.PENDING ||
				previousCommentStatus == BlogCommentStatus.REJECT) &&
		  newCommentStatus === BlogCommentStatus.ACCEPT
		? await blogPosts.updateOne(
				{ _id: postId },
				{ $inc: { totalBlogComments: 1 } }
		  )
		: previousCommentStatus === BlogCommentStatus.ACCEPT &&
		  (newCommentStatus === BlogCommentStatus.PENDING ||
				newCommentStatus === BlogCommentStatus.REJECT)
		? await blogPosts.updateOne(
				{ _id: postId },
				{ $inc: { totalBlogComments: -1 } }
		  )
		: null;
};
