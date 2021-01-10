import { getUser } from "./../../user/funcs/getUser.ts";
import { getBlogTags } from "./../../blogTag/funcs/getBlogTags.ts";
import { getBlogCategories } from "./../../blogCategory/funcs/getBlogCategories.ts";
import { makeProjections } from "./../../../utils/makeProjections.ts";
import { blogPosts, RBlogPost } from "./../../../schemas/blogPost.ts";
import { BlogPost } from "../../../schemas/blogPost.ts";
import { Bson } from "https://deno.land/x/mongo@v0.20.1/deps.ts";
import { throwError } from "../../../utils/throwErr.ts";
import { getBlogComments } from "../../blogComment/funcs/getBlogComments.ts";

type GetBlogPostInput = { _id: Bson.ObjectId; get: RBlogPost };
type GetBlogPostFn = ({ _id, get }: GetBlogPostInput) => Promise<BlogPost>;
export const getBlogPost: GetBlogPostFn = async ({ _id, get }) => {
	const projection = makeProjections(
		get,
		["author", "blogCategories", "blogTags", "blogComments"],
		[]
	);

	const foundedBlogPost = await blogPosts.findOne({ _id }, { projection });
	const doRelation = async (blogPost: BlogPost, get: RBlogPost) => {
		// if (get.author)
		// 	blogPost.author = await getUser({

		// 	});
		// if (get.blogCategoriesRef)
		if (get.blogComments)
			// blogPost.blogCategoriesRef = await getBlogCategories({
			// 	filter: { blogCategory: { _id: { $in: blogPost.blogCategoriesRef } } },
			// 	getObj: get.blogCategoriesRef,
			// });
			// if (get.blogTagsRefs)
			// 	blogPost.blogTagsRef = await getBlogTags({
			// 		filter: { blogTag: { _id: { $in: blogPost.blogTagsRef } } },
			// 		getObj: get.blogTagsRefs,
			// 	});
			//search for comments that their blogPostId is the same as this post
			blogPost.blogComments = await getBlogComments({
				filter: { blogComment: { blogPost: blogPost._id } },
				getObj: get.blogComments,
			});
		return blogPost;
	};
	return foundedBlogPost
		? await doRelation(foundedBlogPost, get)
		: throwError("can not find BlogPost");
};
