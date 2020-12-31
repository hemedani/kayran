import { getBlogTags } from "./../../blogTag/funcs/getBlogTags.ts";
import { getBlogCategories } from "./../../blogCategory/funcs/getBlogCategories.ts";
import { BlogPost, blogPosts } from "./../../../schemas/blogPost.ts";

import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";
import { RBlogPost } from "../../../schemas/blogPost.ts";
import { populateMany } from "../../../utils/populateMany.ts";
import { getBlogComments } from "../../blogComment/funcs/getBlogComments.ts";

type GetBlogPostsInput = { filter: Bson.Document; getObj: RBlogPost };
type GetBlogPostsFn = ({
	filter,
	getObj,
}: GetBlogPostsInput) => Promise<BlogPost[]>;

export const getBlogPosts: GetBlogPostsFn = async ({
	filter,
	getObj,
}: GetBlogPostsInput) => {
	const foundedBlogPosts = await blogPosts.find(filter);
	let returnBlogPosts = await foundedBlogPosts.toArray();
	if (getObj.blogCategories)
		returnBlogPosts = await populateMany(
			returnBlogPosts,
			getBlogCategories,
			"blogCategory",
			getObj.blogCategories
		);
	if (getObj.blogTags)
		returnBlogPosts = await populateMany(
			returnBlogPosts,
			getBlogTags,
			"blogTags",
			getObj.blogTags
		);
	if (getObj.blogComments)
		returnBlogPosts = await populateMany(
			returnBlogPosts,
			getBlogComments,
			"blogComments",
			getObj.blogComments
		);

	return returnBlogPosts;
};
