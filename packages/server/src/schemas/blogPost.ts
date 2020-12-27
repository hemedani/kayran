import { User } from "./user.ts";
import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";
import db from "../../db.ts";
import { BlogCategory } from "./blogCategory.ts";
import { Base } from "./utils/bases/base.ts";
import { BlogTag } from "./blogTag.ts";

export interface BlogPost extends Base {
	title: string;
	summary: string;
	content: string;
	photo?: string;
	blogCategories: BlogCategory[];
	author: User;
	replierBlogCommentRefs: Bson.ObjectID[] /*the id of the comments of this post */;
	blogTags?: BlogTag[];
	likes?: Bson.ObjectID[];
	totalLikes?: number=0; /*an array of users who liked the post */;
	blogCommentRefs?: Bson.ObjectID[];
	promotion?: number = 0;
	totalViews?: number = 0;
}

export const blogPosts = db.collection<BlogPost>("blogPosts");
