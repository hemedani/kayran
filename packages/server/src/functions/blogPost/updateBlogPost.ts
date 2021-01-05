import { handleBlogPostPromotion } from "./utills/handleBlogPostPromotion.ts";
import { blogTags } from "./../../schemas/blogTag.ts";
import { blogPosts } from "./../../schemas/blogPost.ts";
import { checkUpdateBlogPost } from "./updateBlogPost.val.ts";
import { RBlogPost } from "../../schemas/blogPost.ts";
import { Context } from "../utils/context.ts";
import { throwError } from "../../utils/throwErr.ts";
import { Bson } from "https://deno.land/x/mongo@v0.20.1/mod.ts";
import { getDocumentsFromDocumentRefs } from "./utills/getDocumentsFromDocumentsRef.ts";
import { blogCategories } from "../../schemas/blogCategory.ts";

/**
 * Represent Input details
 * this is input of updating BlogTag
 * object "get" for specify user what wants to return
 * object "set" for input value involve(name)
 * @interface
 */
interface UpdateBlogPostDetails {
	set: {
		//this is the _id of the blogCategory that we want to update
		_id: string;
		//these fields are the fields that can be modified on blogPost
		title: string;
		summary: string;
		content: string;
		photo?: string;
		blogCategoriesRef?: string[];
		blogTagsRef?: string[];
		promotion?: number;
	};
	get: RBlogPost;
}

type UpdateBlogPost = (
	details: UpdateBlogPostDetails,
	context?: Context
) => any;
/**
 * Represent updateCategory (update category on db)
 * @function
 * @param details
 * @param context
 */
export const updateBlogPost: UpdateBlogPost = async (details, context) => {
	// TODO:authentication should be done

	const detailsIsRight = checkUpdateBlogPost({ details });
	detailsIsRight !== true && throwError(detailsIsRight[0].message);
	const {
		set: {
			_id,
			title,
			summary,
			content,
			photo,
			blogCategoriesRef,
			blogTagsRef,
			promotion,
		},
		get,
	} = details;

	//get new actual blogCategory from [blogCategories._id]
	const newBlogCategories = blogCategoriesRef
		? await getDocumentsFromDocumentRefs(blogCategoriesRef, blogCategories)
		: null;

	//get new actual blogCategory from [blogCategories._id]
	const newBlogTags = blogTagsRef
		? await getDocumentsFromDocumentRefs(blogTagsRef, blogTags)
		: null;

	promotion ? await handleBlogPostPromotion(promotion) : null;

	const updatedBlogCategory = await blogPosts.updateOne(
		{ _id: new Bson.ObjectID(_id) },
		{
			$set: {
				title,
				summary,
				content,
				photo,
				newBlogCategories,
				newBlogTags,
				promotion,
			},
		}
	);

	const foundNewBlogPost = await blogPosts.findOne({
		_id: new Bson.ObjectID(_id),
	});

	return foundNewBlogPost;
	// TODO: handle the get part!(I need to return the foundNewBlogPost and the get part)
	// return get
	// 	? getBlogPost({ _id: foundNewBlogPost!._id, get })
	// 	: foundNewBlogPost;
};
