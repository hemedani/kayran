import { blogComments } from "./../../schemas/blogComment.ts";
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";
import {
	blogPosts,
	blogPostSelectable,
	RBlogPost,
} from "../../schemas/blogPost.ts";
import { throwError } from "../../utils/throwErr.ts";
import { Context } from "../utils/context.ts";
const v = new FastestValidator();
const check = v.compile({
	details: {
		type: "object",
		props: {
			set: {
				type: "object",
				props: {
					_id: { type: "string" },
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
/**
 * Represent Input details
 * this is input of deleting BlogPost
 * object "get" for specify user what wants to return
 * object "set" for input value involve(name)
 * @interface
 */
interface DeleteBlogPostDetails {
	set: {
		_id: string;
	};
	get: RBlogPost;
}

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
	const detailsIsRight = check({ details });
	detailsIsRight !== true && throwError(detailsIsRight[0].message);
	const {
		set: { _id },
		get: {},
	} = details;

	const deletedBlogPost = await blogPosts.findOne({
		_id: new Bson.ObjectID(_id),
	});
	console.log(deletedBlogPost, "-----------------this is deleted blog post");
	// step1: delete the comments of this blogPost
	// blogPostId
	const a = await blogComments.deleteMany({
		blogPostId: deletedBlogPost!._id.toString(),
	});
	console.log(a);
	//step 2: delete the post itself
	await blogPosts.deleteOne({ _id: new Bson.ObjectID(_id) });
	return deletedBlogPost;
};
