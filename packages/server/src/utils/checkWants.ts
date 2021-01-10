import type { ServerRequest } from "https://deno.land/std/http/server.ts";
import { throwError } from "./throwErr.ts";
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { User } from "../schemas/user.ts";

const v = new FastestValidator();
const check = v.compile({
	wants: {
		type: "object",
		props: {
			model: {
				type: "enum",
				values: [
					"User",
					"City",
					"State",
					"Category",
					"Country",
					"BlogTag",
					"BlogCategory",
					"BlogComment",
					"BlogPost",
				],
			},
		},
	},
});

export interface body {
	wants: {
		model:
			| "User"
			| "City"
			| "BlogTag"
			| "BlogCategory"
			| "BlogComment"
			| "BlogPost";
		doit: string;
	};
	details: any;
}

/**
 * this interface inherits from body and make context and place token in context(in context we have token & user)
 * @interface
 */
interface extraBody extends body {
	context: {
		token: string | null;
		user?: User;
	};
}
export const parsBody = async (req: ServerRequest) => {
	if (req.headers.get("content-type") !== "application/json")
		throwError("your req body is incorrect");

	const decoder = new TextDecoder();
	const body = await Deno.readAll(req.body);
	const decodedBody = decoder.decode(body);
	const parsedBody: body = JSON.parse(decodedBody);
	const parsedExtraBody: extraBody = {
		//make extrabody from parsedBody to add context to it
		...parsedBody,
		context: {
			token: req.headers.get("token"),
		},
	};
	const checkBody = (body: extraBody) => {
		const isRight = check(body);
		return isRight === true
			? isRight
			: throwError(`${isRight[0].message} but get ${isRight[0].actual}`);
	};

	return req.method === "POST" &&
		req.url === "/funql" &&
		checkBody(parsedExtraBody)
		? parsedExtraBody
		: throwError("do not provide wants on body");
};
