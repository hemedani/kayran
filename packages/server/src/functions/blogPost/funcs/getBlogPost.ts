import { makeProjections } from "./../../../utils/makeProjections.ts";
import { blogPosts, RBlogPost } from "./../../../schemas/blogPost.ts";
import { BlogPost } from "../../../schemas/blogPost.ts";
import { Bson } from "https://deno.land/x/mongo@v0.20.1/deps.ts";
import { throwError } from "../../../utils/throwErr.ts";

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
		if (get.author)
			blogPost.author = await getUser({
				filter: { user: blogPost.author._id },
				getObj: get.author,
			});
		if (get.blogCategories)
			blogPost.blogCategories = await getBlogCategories({
				filter: { blogCategory: { _id: { $in: blogPost.blogCategories } } },
				getObj: get.blogCategories,
			});
		if (get.blogTags)
			blogPost.blogTags = await getBlogTags({
				filter: { blogTag: { _id: { $in: blogPost.blogTags } } },
				getObj: get.blogTags,
			});
		//search for comments that their blogPostId is the same as this post
		if (get.blogComments)
			blogPost.blogComments = await getBlogComments({
				filter: { blogComment: { blogPost: blogPost._id } },
			});
		return blogPost;
	};
	return foundedBlogPost
		? await doRelation(foundedBlogPost, get)
		: throwError("can not find BlogPost");
};
