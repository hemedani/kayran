import { getBlogPosts } from "./../../blogPost/funcs/getBlogPosts.ts";
import { populateMany } from "./../../../utils/populateMany.ts";
import { Bson } from "https://deno.land/x/mongo@v0.20.1/deps.ts";
import { makeProjections } from "../../../utils/makeProjections.ts";
import {
	blogCategories,
	BlogCategory,
	RBlogCategory,
} from "./../../../schemas/blogCategory.ts";

type GetBlogCategoriesInput = { filter: Bson.Document; getObj: RBlogCategory };
type GetBlogCategoriesFn = ({
	filter,
	getObj,
}: GetBlogCategoriesInput) => Promise<BlogCategory[]>;
export const getBlogCategories: GetBlogCategoriesFn = async ({
	filter,
	getObj,
}) => {
	const projection = makeProjections(getObj, ["blogPost"], []);
	const foundedBlogCategories = await blogCategories.find(filter, {
		projection,
	});
	let returnBlogCategories = await foundedBlogCategories.toArray();
	// if (getObj.blogPosts)
	// 	returnBlogCategories = await populateMany(
	// 		returnBlogCategories,
	// 		getBlogPosts,
	// 		"states",
	// 		getObj.blogPosts
	// 	);
	return returnBlogCategories;
};
