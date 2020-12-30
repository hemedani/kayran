import { blogTags } from "./../../../schemas/blogTag.ts";
import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";
import { BlogTag, RBlogTag } from "../../../schemas/blogTag.ts";

type GetBlogTagInput = { _id: Bson.ObjectID; get: RBlogTag };
type GetBlogTagFn = ({ _id, get }: GetBlogTagInput) => Promise<BlogTag | any>;
export const getBlogTag: GetBlogTagFn = async ({ _id, get }) => {
	const foundedBlogTag = await blogTags.findOne({ _id });
	// there are no relation for tag
	return foundedBlogTag;
};
