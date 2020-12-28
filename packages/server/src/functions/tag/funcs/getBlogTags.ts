import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";
import { BlogTag, blogTags, RBlogTag } from "./../../../schemas/blogTag.ts";

/** filter : any change that is applied on the result is defined in filter */
type GetBlogTagsInput = { filter: Bson.Document; getObj: RBlogTag };
type GetBlogTagsFn = ({
	filter,
	getObj,
}: GetBlogTagsInput) => Promise<BlogTag[]>;

export const getBlogTags: GetBlogTagsFn = async ({ filter, getObj }) => {
	return await blogTags.find(filter).toArray();
};
