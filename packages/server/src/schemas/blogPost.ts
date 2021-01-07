import { BlogComment, blogCommentSelectable } from "./blogComment.ts";
import { RUser, User, userSelectable } from "./user.ts";
import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";
import {
	BlogCategory,
	blogCategorySelectable,
	RBlogCategory,
} from "./blogCategory.ts";
import { Base } from "./utils/bases/base.ts";
import { BlogTag, blogTagSelectable, RBlogTag } from "./blogTag.ts";
import db from "../../db.ts";
import { fieldType } from "./utils/index.ts";
import { RType } from "./utils/rType.ts";
import { baseSelectableFields, RBase } from "./utils/bases/index.ts";
import { RBlogComment } from "./blogComment.ts";
export interface BlogPost extends Base {
	title: string;
	summary: string;
	content: string;
	photo?: string;
	author?: User; //TODO:user is not optional
	blogCategories: BlogCategory[];
	blogTags?: BlogTag[];
	likeUsers?: Bson.ObjectID[];
	blogComments?: BlogComment[]; //about 50 last comments are embedded here
	promotion?: number;
	totalViews?: number;
	totalBlogComments?: number;
	totalLikes?: number; //the total number of likes fo the post
}
export interface RBlogPost extends RBase {
	tittle?: RType;
	summary?: RType;
	content?: RType;
	photo?: RType;
	author?: RUser;
	blogTags?: RBlogTag;
	likeUsers?: RUser;
	blogCategories?: RBlogCategory;
	totalLikes?: RType;
	promotion?: RType;
	totalViews?: RType;
	blogComments?: RBlogComment;
	totalBlogComments?: RType;
}

/**
 * represent relation of city schema
 * @param depth
 */
export const blogPostSelectable = (depth: number = 4): any => {
	depth--;
	const returnObj = {
		...baseSelectableFields(),
		tittle: fieldType,
		summary: fieldType,
		content: fieldType,
		photo: fieldType,
		totalLikes: fieldType,
		promotion: fieldType,
		totalViews: fieldType,
		totalBlogComments: fieldType,
	};
	return depth > 0
		? {
				...returnObj,
				blogTags: {
					type: "object",
					optional: true,
					props: blogTagSelectable(depth),
				},
				blogCategoriesRef: {
					type: "object",
					optional: true,
					props: blogCategorySelectable(depth),
				},
				author: {
					type: "object",
					optional: true,
					props: userSelectable(depth),
				},
				likeUsers: {
					type: "object",
					optional: true,
					props: userSelectable(depth),
				},
				blogComments: {
					type: "object",
					optional: true,
					props: blogCommentSelectable(depth),
				},
		  }
		: returnObj;
};

export const blogPosts = db.collection<BlogPost>("BlogPosts");
