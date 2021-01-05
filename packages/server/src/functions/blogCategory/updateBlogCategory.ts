import { getBlogPost } from "./../blogPost/funcs/getBlogPost.ts";
import { blogPosts } from "./../../schemas/blogPost.ts";
import { Bson } from "https://deno.land/x/mongo@v0.20.1/deps.ts";
import { throwError } from "../../utils/throwErr.ts";
import { Context } from "../utils/context.ts";
import { blogCategories, RBlogCategory } from "./../../schemas/blogCategory.ts";
import { checkUpdateBlogCategory } from "./updateBlogCategory.val.ts";
/**
 * Represent Input details
 * this is input of updating BlogTag
 * object "get" for specify user what wants to return
 * object "set" for input value involve(name)
 * @interface
 */
interface UpdateBlogCategoryDetails {
	set: {
		//this is the _id of the blogCategory that we want to update
		_id: string;
		//these fields are the fields that can be modified on blogCategory
		name?: string;
		enName?: string;
		icon?: string;
		description?: string;
	};
	get: RBlogCategory;
}

type UpdateBlogCategory = (
	details: UpdateBlogCategoryDetails,
	context?: Context
) => any;

/**
 * Represent updateCategory (update category on db)
 * @function
 * @param details
 * @param context
 */
export const updateBlogCategory: UpdateBlogCategory = async (
	details,
	context
) => {
	// TODO:authentication should be done

	const detailsIsRight = checkUpdateBlogCategory({ details });
	detailsIsRight !== true && throwError(detailsIsRight[0].message);
	const {
		set: { _id, name, enName, icon, description },
		get,
	} = details;

	const updatedBlogCategory = await blogCategories.updateOne(
		{ _id: new Bson.ObjectID(_id) },
		{ $set: { name, enName, icon, description } }
	);

	const foundNewBlogCategory = await blogCategories.findOne({
		_id: new Bson.ObjectID(_id),
	});

	//2 update category in post collection where posts are refer to this category
	await blogPosts.updateMany(
		{ "postBlogCategories._id": new Bson.ObjectID(_id) },
		{ $set: { "postBlogCategories.$": foundNewBlogCategory } }
	);

	return foundNewBlogCategory;
	// TODO: handle the get part!(I need to return the foundNewBlogCategory and the get part)
	// return get
	// 	? getBlogPost({ _id: foundNewBlogCategory!._id, get })
	// 	: foundNewBlogCategory;
};
