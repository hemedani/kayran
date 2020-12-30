import { Base, baseSelectableFields, RBase } from "./utils/bases/index.ts";
import db from "../../db.ts";
import { fieldType, RType } from "./utils/index.ts";
import { BlogPost, RBlogPost } from "./blogPost.ts";
import { Bson } from "https://deno.land/x/mongo@v0.20.1/deps.ts";

export interface BlogCategory extends Base {
	name: string;
	enName: string;
	icon: string;
	description: string;
	blogPosts: BlogPost[];
}

export interface RBlogCategory extends RBase {
	name?: RType;
	enName?: RType;
	iconUrl?: RType;
	description?: RType;
	blogPosts?: RBlogPost;
}

export const blogCategorySelectable = (depth: number = 4) => {
	depth--;
	const returnObj = {
		...baseSelectableFields(),
		name: fieldType,
		enName: fieldType,
		iconUrl: fieldType,
		description: fieldType,
	};
	return returnObj;
};

export const blogCategories = db.collection<BlogCategory>("BlogCategories");
