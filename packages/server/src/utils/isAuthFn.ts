import { decode } from "https://deno.land/x/djwt@v1.9/mod.ts";
import { Bson } from "https://deno.land/x/mongo@v0.20.1/deps.ts";
import { Level, User, users } from "../schemas/user.ts";
import { throwError } from "./index.ts";

export const isAuthFn = async (token: string) => {
	const usersId = await getTokenDetails(token);
	const foundedUser = await users.findOne({ _id: new Bson.ObjectId(usersId) });
	console.log("------------", usersId);
	console.log(foundedUser);
	return foundedUser ? foundedUser : throwError("can not found any user");
};

export const isAdminFn = (user: User) => {
	return user.level.indexOf(Level.Admin) != -1
		? true
		: throwError("is not admin");
};

export const getTokenDetails = async (jwt: string) => {
	const { payload, signature, header } = await decode(jwt);
	return payload.usersId as string;
};
