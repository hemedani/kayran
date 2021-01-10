import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";
import { blogPosts } from "../../schemas/blogPost.ts";
import {
	blogTags,
	blogTagSelectable,
	RBlogTag,
} from "../../schemas/blogTag.ts";
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
				props: blogTagSelectable(2),
			},
		},
	},
});
/**
 * Represent Input details
 * this is input of deleting BlogTag
 * object "get" for specify user what wants to return
 * object "set" for input value involve(name)
 * @interface
 */
interface DeleteBlogTagDetails {
	set: {
		_id: string;
	};
	get: RBlogTag;
}

type DeleteBlogTag = (details: DeleteBlogTagDetails, context?: Context) => any;

/**
 * @function
 * Represent delete blogTag(delete the desired blogTag from DB)
 * @param details
 * @param context
 */
export const deleteBlogTag: DeleteBlogTag = async (details, context) => {
	const detailsIsRight = check({ details });
	detailsIsRight !== true && throwError(detailsIsRight[0].message);
	const {
		set: { _id },
		get: {},
	} = details;

	const deletedTag = await blogTags.findOne({
		_id: new Bson.ObjectID(_id),
	});
	// step1: delete the tag from posts
	const a = await blogPosts.updateMany(
		{ "blogTags._id": deletedTag!._id },
		{ $pull: { blogTags: { _id: deletedTag!._id } } }
	);

	//step 2: delete the tag itself
	await blogTags.deleteOne({ _id: new Bson.ObjectID(_id) });
	return deletedTag;
};
