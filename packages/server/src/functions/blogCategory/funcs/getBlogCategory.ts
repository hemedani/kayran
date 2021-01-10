import { getBlogPosts } from "./../../blogPost/funcs/getBlogPosts.ts";
import { makeProjections } from "./../../../utils/makeProjections.ts";
import { RBlogCategory } from "./../../../schemas/blogCategory.ts";
import { blogCategories, BlogCategory } from "../../../schemas/blogCategory.ts";
import { throwError } from "../../../utils/throwErr.ts";
import { Bson } from "https://deno.land/x/mongo@v0.20.1/deps.ts";

type GetBlogCategoryInput = { _id: Bson.ObjectID; get: RBlogCategory };
type GetBlogCategoryFn = ({
	_id,
	get,
}: GetBlogCategoryInput) => Promise<BlogCategory>;

export const getBlogCategory: GetBlogCategoryFn = async ({ _id, get }) => {
	const projection = makeProjections(get, ["blogPost"], []);
	const foundedBlogCategory = await blogCategories.findOne(
		{ _id },
		{ projection }
	);
	const doRelation = async (blogCategory: BlogCategory, get: RBlogCategory) => {
		// if (get.blogPosts)
		// 	blogCategory.blogPosts = await getBlogPosts({
		// 		filter: { blogCategory: blogCategory._id },
		// 		getObj: get.blogPosts,
		// 	});
		return blogCategory;
	};
	return foundedBlogCategory
		? await doRelation(foundedBlogCategory, get)
		: throwError("can not find blogCategory");
};
