import { blogCategories } from "./../../schemas/blogCategory.ts";
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import {
	blogCategorySelectable,
	RBlogCategory,
} from "../../schemas/blogCategory.ts";
import { blogPosts } from "../../schemas/blogPost.ts";
import { throwError } from "../../utils/throwErr.ts";
import { Context } from "../utils/context.ts";
import { Bson } from "https://deno.land/x/mongo@v0.20.1/deps.ts";
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
				props: blogCategorySelectable(2),
			},
		},
	},
});
/**
 * Represent Input details
 * this is input of deleting BlogCategory
 * object "get" for specify user what wants to return
 * object "set" for input value involve(name)
 * @interface
 */
interface DeleteCategoryDetails {
	set: {
		_id: string;
	};
	get: RBlogCategory;
}

type DeleteBlogCategory = (
	details: DeleteCategoryDetails,
	context?: Context
) => any;

/**
 * @function
 * Represent delete blogTag(delete the desired blogTag from DB)
 * @param details
 * @param context
 */
export const deleteBlogCategory: DeleteBlogCategory = async (
	details,
	context
) => {
	const detailsIsRight = check({ details });
	detailsIsRight !== true && throwError(detailsIsRight[0].message);
	const {
		set: { _id },
		get: {},
	} = details;

	const deletedBlogCategory = await blogCategories.findOne({
		_id: new Bson.ObjectID(_id),
	});
	// step1: delete the tag from posts
	const a = await blogPosts.updateMany(
		{ "blogCategories._id": deletedBlogCategory!._id },
		{ $pull: { blogCategories: { _id: deletedBlogCategory!._id } } }
	);

	//step 2: delete the tag itself
	await blogCategories.deleteOne({ _id: new Bson.ObjectID(_id) });
	return deletedBlogCategory;
};
