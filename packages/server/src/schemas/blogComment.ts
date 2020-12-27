import { RType } from "./utils/rType.ts";
import { Base, baseSelectableFields, RBase } from "./utils/bases/base.ts";
import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";
import db from "../../db.ts";
import { BlogPost, blogPostSelectable } from "./blogPost.ts";
import { fieldType } from "./utils/fieldType.ts";

export enum CommentStatus {
	ACCEPT,
	PENDING,
	REJECT,
}

export interface BlogComment extends Base {
	name: string;
	email: string;
	content: string;
	isReplierBlogComment: boolean;
	commentStatus: CommentStatus;
	BlogPost: BlogPost;
	replierBlogCommentRefs: Bson.ObjectID[] /* the replied comments of a comment */;
}

export interface RBlogComment extends RBase {
	name?: RType;
	email?: RType;
	content?: RType;
	isReplierBlogComment?: RBlogComment;
	commentStatus?: RType;
}

export const blogCommentSelectable = (depth: number = 4): any => {
	depth--;
	const returnObj = {
		...baseSelectableFields(),
		name: fieldType,
		email: fieldType,
		content: fieldType,
		CommentStatus: fieldType,
	};
	return depth > 0
		? {
				...returnObj,
				blogPost: {
					type: "object",
					optional: true,
					props: blogPostSelectable(depth),
				},
				replierBlogCommentRefs: {
					type: "object",
					optional: true,
					props: blogCommentSelectable(depth),
				},
		  }
		: returnObj;
};

export const blogComments = db.collection<BlogComment>("BlogComments");
