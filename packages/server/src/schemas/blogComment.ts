import { Base } from "./utils/bases/base.ts";
import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";
import db from "../../db.ts";
import { BlogPost } from "./blogPost.ts";

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
	replierBlogCommentRefs: Bson.ObjectID[];
}

export const blogComments = db.collection<BlogComment>("BlogComments");
