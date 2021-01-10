import { changeTotalBlogCommentsForPost } from "./changeTotalBlogCommentsForPost.ts";
import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";

//bidirectional delete comment
//steps:
//1 remove comment ref from blogPost collection into field  blog comments ref
//2 delete replier comments
//3 remove comment ref from replied comment
//4 delete comment from comment collection
//5 decrement total comment in blog post collection
import { blogComments } from "../../../schemas/blogComment.ts";
import { blogPosts } from "../../../schemas/blogPost.ts";

//5 decrement total comment in blog post collection
export const bidirectionalDeleteBlogComment = async (_id: any) => {
	const deletedBlogComment = await blogComments.findOne({
		_id: new Bson.ObjectID(_id),
	});
	if (!deletedBlogComment) {
		throw new Error();
	}

	//step 1
	await blogPosts.updateOne(
		{ _id: new Bson.ObjectID(deletedBlogComment!.blogPostId) },
		{ $pull: { blogComments: { _id: deletedBlogComment!._id } } }
	);

	//step 2
	deletedBlogComment.replierBlogCommentRefs
		? await Promise.all(
				deletedBlogComment.replierBlogCommentRefs.map(
					async (replierBlogComment) => {
						await bidirectionalDeleteBlogComment(replierBlogComment);
					}
				)
		  )
		: null;

	//step 3
	deletedBlogComment.isReplierBlogComment
		? await blogComments.updateOne(
				{ replierBlogCommentRefs: new Bson.ObjectID(deletedBlogComment._id) },
				{
					$pull: {
						replierBlogCommentRefs: new Bson.ObjectID(deletedBlogComment._id),
					},
				}
		  )
		: null;

	//step 4
	await blogComments.deleteOne({ _id: new Bson.ObjectID(_id) });
	//step 5
	await changeTotalBlogCommentsForPost(
		deletedBlogComment!.blogPostId,
		deletedBlogComment.blogCommentStatus,
		undefined,
		true
	);

	return deletedBlogComment;
};
