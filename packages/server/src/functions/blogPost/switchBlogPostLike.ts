import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";
import { RBlogPost } from "./../../schemas/blogPost.ts";
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { blogPosts, blogPostSelectable } from "../../schemas/blogPost.ts";
import { Context } from "../utils/context.ts";
import { throwError } from "../../utils/throwErr.ts";

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
 * this is input of like/dislike blogPost
 * object "get" for specify user what wants to return
 * object "set" for input value involve(_id of Post)
 * @interface
 */
interface SwitchBlogPostLikeDetails {
	set: {
		_id: string;
	};
	get: RBlogPost;
}

type SwitchBlogPostLike = (
	details: SwitchBlogPostLikeDetails,
	context?: Context
) => any;

/**
 * @function
 * Represent delete blogTag(delete the desired blogTag from DB)
 * @param details
 * @param context
 */
export const switchBlogPostLike: SwitchBlogPostLike = async (
	details,
	context
) => {
	const detailsIsRight = check({ details });
	detailsIsRight !== true && throwError(detailsIsRight[0].message);
	const {
		set: { _id },
		get: {},
	} = details;
	//TODO: auth is needed and user ObjectID should be extracted
	const userIDExtractedFromToken = "";
	const post = await blogPosts.findOne({
		_id: new Bson.ObjectID(_id),
		likeUsers: userIDExtractedFromToken,
	});
	const preTotalLikes = post?.totalLikes ?? 0;
	//if post found means the user likes the post
	//remove user id from array
	//decrement total likes
	//else vice versa
	post
		? await blogPosts.updateOne(
				{ _id: new Bson.ObjectID(_id) },
				{
					$pull: { likedUsers: userIDExtractedFromToken },
					totalLikes: preTotalLikes - 1,
				}
		  )
		: await blogPosts.updateOne(
				{ _id: new Bson.ObjectID(_id) },
				{
					$addToSet: { likedUsers: userIDExtractedFromToken },
					totalLikes: preTotalLikes + 1,
				}
		  );
	return await blogPosts.findOne({ _id: new Bson.ObjectID(_id) });
};
