import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { blogPostSelectable } from "../../schemas/blogPost.ts";
const v = new FastestValidator();

/**
 * this is validator for update blogPost
 * this validate the input object,
 * has a tow part {set,get}
 * object "get" for specify user what wants to return
 * object "set" for validate input value involves (_id,name,enName, icon, description )
 */
export const checkUpdateBlogPost = v.compile({
	details: {
		type: "object",
		props: {
			set: {
				type: "object",
				strict: true,
				props: {
					/**
					 * The Id of the blogPost that is going to be updated
					 * min length is 2 , max length i1s 255
					 */
					_id: { type: "string", min: 2, max: 255, optional: true },

					/**
					 * The title of the blogPost that is going to be updated
					 * min length is 2 , max length i1s 255
					 */
					title: { type: "string", min: 2, max: 255, optional: true },

					/**
					 * The summary of the blogPost that is going to be updated
					 * min length is 2 , max length i1s 255
					 */
					summary: { type: "string", min: 2, max: 255, optional: true },

					/**
					 * The content of the blogPost that is going to be updated
					 * min length is 2 , max length i1s 255
					 */
					content: { type: "string", min: 2, max: 255, optional: true },

					/**
					 * The photo of the blogPost that is going to be updated
					 * min length is 2 , max length i1s 255
					 */
					photo: { type: "string", min: 2, max: 255, optional: true },

					/**
					 * The array of [blogCategories._id] of the desired blogPost that is going to be updated
					 */
					blogCategoriesRef: { type: "array", items: "string", optional: true },

					/**
					 * The array of [blogTags._id] of the desired blogPost that is going to be updated
					 */
					blogTagsRef: { type: "array", items: "string", optional: true },

					/**
					 * The promotion of the desired blogPost that is going to be updated
					 */
					promotion: { type: "number", optional: true },
				},
			},
			get: {
				type: "object",
				optional: true,
				props: blogPostSelectable(2),
			},
		},
	},
});
