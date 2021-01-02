import { throwError } from "./../../../utils/throwErr.ts";
import { getBlogPost } from "./../../blogPost/funcs/getBlogPost.ts";
import { makeProjections } from "./../../../utils/makeProjections.ts";
import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";
import {
	BlogComment,
	blogComments,
	RBlogComment,
} from "./../../../schemas/blogComment.ts";
type GetBlogCommentInput = { _id: Bson.ObjectID; get: RBlogComment };
type GetBlogCommentFn = ({
	_id,
	get,
}: GetBlogCommentInput) => Promise<BlogComment>;

export const getBlogComment: GetBlogCommentFn = async ({ _id, get }) => {
	const projection = makeProjections(
		get,
		["blogPost", "replierBlogCommentRefs"],
		[]
	);
	const foundedBlogComment = await blogComments.findOne(
		{ _id },
		{ projection }
	);
	const doRelation = async (blogComment: BlogComment, get: RBlogComment) => {
		//dont know how to work with objectID[]
		// if (get.replierBlogCommentRefs)
		// populate many
		return blogComment;
	};
	return foundedBlogComment
		? await doRelation(foundedBlogComment, get)
		: throwError("can not find blogComment");
};
