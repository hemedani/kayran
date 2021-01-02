import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";
import { throwError } from "./../../utils/throwErr.ts";
import {
	BlogTag,
	blogTags,
	blogTagSelectable,
	RBlogTag,
} from "./../../schemas/blogTag.ts";
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { isAdminFn, isAuthFn } from "../../utils/isAuthFn.ts";

import { getBlogTag } from "./funcs/getBlogTag.ts";
import { User } from "../../schemas/user.ts";

const v = new FastestValidator();
const check = v.compile({
	details: {
		type: "object",
		props: {
			set: {
				type: "object",
				props: {
					name: { type: "string" },
				},
			},
			get: {
				type: "object",
				optional: true,
				props: blogTagSelectable(2),
			},
		},
	},
});

interface createTagDetails {
	set: { name: string };
	get: RBlogTag;
}

interface createTagContext {
	token: string | null;
	user?: User;
}

type CreateTag = (
	details: createTagDetails,
	context: createTagContext
) => Promise<Partial<BlogTag>>;

/**
 * @function
 * Represent createWareClass (insert wareClass to db)
 * @param details
 * @param context
 */
export const createBlogTag: CreateTag = async (details, context) => {
	//  context ? await isAuthFn(context.token) : throwError("your token is empty");
	// await isAdminFn(user);
	const detailsIsRight = check({ details });
	detailsIsRight !== true && throwError(detailsIsRight[0].message);
	const {
		set: { name },
		get,
	} = details;

	const createdBlogTag = await blogTags.insertOne({
		name,
	});
	const ob = new Bson.ObjectID(createdBlogTag);
	return get ? getBlogTag({ _id: ob, get }) : { _id: ob };
};
