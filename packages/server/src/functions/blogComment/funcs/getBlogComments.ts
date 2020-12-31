import { populateMany } from "./../../../utils/populateMany.ts";
import { makeProjections } from "./../../../utils/makeProjections.ts";
import { BlogComment } from "./../../../schemas/blogComment.ts";
import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";
import { blogComments, RBlogComment } from "../../../schemas/blogComment.ts";
import { getBlogPosts } from "../../blogPost/funcs/getBlogPosts.ts";

type GetBlogCommentsInput = { filter: Bson.Document; getObj: RBlogComment };
type GetBlogCommentsFn = ({
	filter,
	getObj,
}: GetBlogCommentsInput) => Promise<BlogComment[]>;
export const getBlogComments: GetBlogCommentsFn = async ({
	filter,
	getObj,
}) => {
	const projection = makeProjections(getObj, ["blogPost"], []);
	const foundedBlogComments = await blogComments.find(filter, { projection });
	let returnBlogComments = await foundedBlogComments.toArray();
	if (getObj.blogPost)
		returnBlogComments = await populateMany(
			returnBlogComments,
			getBlogPosts,
			"blogPost",
			getObj.blogPost
		);
	// if(getObj.replierBlogCommentRefs)
	return returnBlogComments;
};
