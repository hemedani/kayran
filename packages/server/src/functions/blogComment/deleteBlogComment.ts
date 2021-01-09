import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";
import { blogComments, RBlogComment } from "./../../schemas/blogComment.ts";
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { blogCommentSelectable } from "../../schemas/blogComment.ts";
import { Context } from "../utils/context.ts";
import { throwError } from "../../utils/throwErr.ts";
import { bidirectionalDeleteBlogComment } from "./utils/bidirectionalDeleteBlogComment.ts";

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
				props: blogCommentSelectable(2),
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
interface DeleteBlogCommentDetails {
	set: {
		_id: string;
	};
	get: RBlogComment;
}

type DeleteBlogComment = (
	details: DeleteBlogCommentDetails,
	context?: Context
) => any;

/**
 * @function
 * Represent delete blogTag(delete the desired blogTag from DB)
 * @param details
 * @param context
 */
export const deleteBlogComment: DeleteBlogComment = async (
	details,
	context
) => {
	const detailsIsRight = check({ details });
	detailsIsRight !== true && throwError(detailsIsRight[0].message);
	const {
		set: { _id },
		get: {},
	} = details;

	return await bidirectionalDeleteBlogComment(_id);
};
