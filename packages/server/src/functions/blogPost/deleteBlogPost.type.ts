import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { blogPostSelectable, RBlogPost } from "../../schemas/index.ts";

const v = new FastestValidator();
export const checkDeleteBlogPost = v.compile({
	details: {
		type: "object",
		props: {
			set: {
				type: "object",
				props: {
					/**
					 * The Id of the blogPost that is going to be deleted
					 * min length is 2 , max length is 255
					 */
					_id: { type: "string" },
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
/**
 * Represent Input details
 * this is input of deleting BlogPost
 * object "get" for specify user what wants to return
 * object "set" for input value involve(name)
 * @interface
 */
export interface DeleteBlogPostDetails {
	set: {
		_id: string;
	};
	get: RBlogPost;
}
