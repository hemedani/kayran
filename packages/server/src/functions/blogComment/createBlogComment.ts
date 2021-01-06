import { Context } from "./../utils/context.ts";
import {
	BlogComment,
	blogComments,
	blogCommentSelectable,
	BlogCommentStatus,
	RBlogComment,
} from "./../../schemas/blogComment.ts";
import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";
import { throwError } from "../../utils/throwErr.ts";
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { getBlogComment } from "./funcs/getBlogComment.ts";
import { User } from "../../schemas/user.ts";
import { blogPosts } from "../../schemas/blogPost.ts";
// TODO:Check it with satek
const v = new FastestValidator();
const check = v.compile({
	details: {
		type: "object",
		props: {
			set: {
				type: "object",
				props: {
					name: { type: "string" },
					email: { type: "email" },
					content: { type: "string" },
					blogPostId: { type: "string" },
					blogCommentStatus: {
						type: "enum",
						values: ["ACCEPT", "PENDING", "REJECT"],
					},
					isReplierBlogComment: { type: "boolean", optional: true },
					repliedBlogCommentId: { type: "string", optional: true },
				},
			},
			get: {
				type: "object",
				optional: true,
				props: blogCommentSelectable(2),
			},
		},
	},
});

export interface createBlogCommentDetails {
	set: {
		name: string;
		email: string;
		content: string;
		blogPostId: string;
		blogCommentStatus: BlogCommentStatus;
		isReplierBlogComment: boolean;
		repliedBlogCommentId?: string;
	};
	get: RBlogComment;
}

type CreateBlogComment = (
	details: createBlogCommentDetails,
	context: Context
) => Promise<Partial<BlogComment>>;

/**
 * @function
 * Represent createWareClass (insert wareClass to db)
 * @param details
 * @param context
 */
export const createBlogComment: CreateBlogComment = async (
	details,
	context
) => {
	//  context ? await isAuthFn(context.token) : throwError("your token is empty");
	// await isAdminFn(user);
	const detailsIsRight = check({ details });
	detailsIsRight !== true && throwError(detailsIsRight[0].message);
	const {
		set: {
			name,
			email,
			content,
			blogPostId,
			blogCommentStatus,
			isReplierBlogComment,
			repliedBlogCommentId,
		},
		get,
	} = details;
	if (
		(isReplierBlogComment && !repliedBlogCommentId) ||
		(!isReplierBlogComment && repliedBlogCommentId)
	) {
		throw new Error(
			"if this comment is replied to another comment, the id of the parent comment should be specified, and if this comment is not a reply it should not have the parent Id"
		);
	}
	/**
	 * step1: creating the new comment in db, with all the fields even if empty
	 */

	const createdBlogCommentID = await blogComments.insertOne({
		name,
		email,
		content,
		blogPostId, //this is the id of blogPost
		blogCommentStatus,
		isReplierBlogComment,
		repliedBlogCommentId,
	});

	/**
	 * step2: adding the new comment to post document
	 */

	const createdBlogComment = await blogComments.findOne({
		_id: new Bson.ObjectID(createdBlogCommentID),
	});
	await blogPosts.updateOne(
		{ _id: new Bson.ObjectID(blogPostId) },
		{ $addToSet: { blogComments: createdBlogComment } }
	);
	/**
	 * step3: if the comment is replied to another comment, add the child commentId to the replierBlogCommentRefs of the parent
	 */

	isReplierBlogComment
		? await blogComments.updateOne(
				{ _id: new Bson.ObjectID(repliedBlogCommentId) },
				{
					$addToSet: { replierBlogCommentRefs: createdBlogCommentID },
				}
		  )
		: null;
	const ob = new Bson.ObjectID(createdBlogCommentID);
	return get ? getBlogComment({ _id: ob, get }) : { _id: ob };
};
