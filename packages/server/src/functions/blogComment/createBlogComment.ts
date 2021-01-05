import {
	BlogComment,
	blogComments,
	blogCommentSelectable,
	RBlogComment,
} from "./../../schemas/blogComment.ts";
import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";
import { throwError } from "../../utils/throwErr.ts";
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { getBlogComment } from "./funcs/getBlogComment.ts";
import { User } from "../../schemas/user.ts";
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
					// blogPost: { type: "string" },
					isReplierBlogComment: { type: "boolean" },
					repliedBlogCommentId: { type: "string" },
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

interface createBlogCommentDetails {
	set: {
		name: string;
		email: string;
		content: string;
		blogPost: string;
		isReplierBlogComment: boolean;
		repliedBlogCommentId?: string;
	};
	get: RBlogComment;
}

interface createBlogCommentContext {
	token: string | null;
	user?: User;
}

type CreateBlogComment = (
	details: createBlogCommentDetails,
	context: createBlogCommentContext
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
			blogPost,
			isReplierBlogComment,
			repliedBlogCommentId,
		},
		get,
	} = details;

	const createdBlogComment = await blogComments.insertOne({
		name,
		email,
		content,
		blogPost, //this is the id of blogPost
		isReplierBlogComment,
		repliedBlogCommentId,
	});

	const ob = new Bson.ObjectID(createdBlogComment);
	// await blogPosts.updateOne(
	// 	{ _id: blogPost },
	// 	{ $addToSet: { blogComments: createdBlogComment } }
	// );

	isReplierBlogComment
		? await blogComments.updateOne(
				{ _id: repliedBlogCommentId },
				{
					$addToSet: { replierBlogCommentRefs: createdBlogComment._id },
				}
		  )
		: null;
	return get ? getBlogComment({ _id: ob, get }) : { _id: ob };
};
