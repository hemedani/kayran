import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";
import { throwError } from "./../../utils/throwErr.ts";
import { BlogTag, blogTags } from "../../schemas/blogTag.ts";
import { Context } from "../utils/context.ts";
import { RBlogTag } from "./../../schemas/blogTag.ts";
import { checkUpdateBlogTag } from "./updateBlogTag.val.ts";
/**
 * Represent Input details
 * this is input of updating BlogTag
 * object "get" for specify user what wants to return
 * object "set" for input value involve(name)
 * @interface
 */
interface UpdateBlogTagDetails {
	set: {
		_id: string;
		name?: string;
	};
	get: RBlogTag;
}

type UpdateBlogTag = (details: UpdateBlogTagDetails, context?: Context) => any;

/**
 * Represent updateTag (update Tag on db)
 * in update , there is no relation in blogTag
 * @function
 * @param details
 * @param context
 */
export const updateBlogTag: UpdateBlogTag = async (details) => {
	// TODO:authentication should be done

	const detailsIsRight = checkUpdateBlogTag({ details });
	detailsIsRight !== true && throwError(detailsIsRight[0].message);
	const {
		set: { _id, name },
		get,
	} = details;

	const updatedBlogTag = await blogTags.updateOne(
		{ _id: new Bson.ObjectID(_id) },
		{ $set: { name: name } }
	);

	const foundNewBlogTag = await blogTags.findOne({
		_id: new Bson.ObjectID(_id),
	});
	return foundNewBlogTag;

	// return get ? getCountry({ _id: ob, get }) : { _id: ob }
};
