import { getBlogCategory } from "./funcs/getBlogCategory.ts";
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { Bson } from "https://deno.land/x/mongo@v0.20.1/mod.ts";
import {
	blogCategories,
	BlogCategory,
	blogCategorySelectable,
	RBlogCategory,
} from "../../schemas/blogCategory.ts";
import { User } from "../../schemas/user.ts";
import { throwError } from "../../utils/throwErr.ts";
const v = new FastestValidator();
const check = v.compile({
	details: {
		type: "object",
		props: {
			set: {
				type: "object",
				props: {
					name: { type: "string" },
					enName: { type: "string" },
					icon: { type: "string" },
					description: { type: "string" },
				},
			},
			get: {
				type: "object",
				optional: true,
				props: blogCategorySelectable(2),
			},
		},
	},
});

interface createBlogCategoryDetails {
	set: { name: string; enName: string; icon: string; description: string };
	get: RBlogCategory;
}

interface createBlogCategoryContext {
	token: string | null;
	user?: User;
}

type CreateBlogCategory = (
	details: createBlogCategoryDetails,
	context: createBlogCategoryContext
) => Promise<Partial<BlogCategory>>;

/**
 * @function
 * Represent createWareClass (insert wareClass to db)
 * @param details
 * @param context
 */
export const createBlogCategory: CreateBlogCategory = async (
	details,
	context
) => {
	//  context ? await isAuthFn(context.token) : throwError("your token is empty");
	// await isAdminFn(user);
	const detailsIsRight = check({ details });
	detailsIsRight !== true && throwError(detailsIsRight[0].message);
	const {
		set: { name, enName, icon, description },
		get,
	} = details;

	const createdBlogCategory = await blogCategories.insertOne({
		name,
		enName,
		icon,
		description,
	});
	const ob = new Bson.ObjectID(createdBlogCategory);
	return get ? getBlogCategory({ _id: ob, get }) : { _id: ob };
};
