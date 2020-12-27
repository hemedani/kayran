import db from "../../db.ts";
import { fieldType } from "./utils/index.ts";
import { RType } from "./utils/rType.ts";
import { baseSelectableFields, RBase } from "./utils/bases/index.ts";

export interface BlogTag {
	name: string;
}
/**
 * represent get selection of any function
 * @interface
 */
export interface RBlogTag extends RBase {
	name?: RType;
}

export const blogTagSelectable = (depth: number = 4) => {
	depth--;
	const returnObj = {
		...baseSelectableFields(),
		name: fieldType,
	};
	return returnObj;
};

export const blogTags = db.collection<BlogTag>("BlogTags");
