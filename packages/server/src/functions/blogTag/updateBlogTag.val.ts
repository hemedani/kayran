import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { blogTagSelectable } from "../../schemas/blogTag.ts";
const v = new FastestValidator();

/**
 * this is validator for update blogTag
 * this validate the input object,
 * has a tow part {set,get}
 * object "get" for specify user what wants to return
 * object "set" for validate input value involves (name ,_id)
 */
export const checkUpdateBlogTag = v.compile({
	details: {
		type: "object",
		props: {
			set: {
				type: "object",
				strict: true,
				props: {
					/**
					 * The Id of the blogTag that is going to be updated
					 * min length is 2 , max length i1s 255
					 */
					_id: { type: "string", min: 2, max: 255, optional: true },
					/**
					 * name of blogTag
					 * min length is 2 , max length i1s 255
					 */
					name: { type: "string", min: 2, max: 255, optional: true },
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
