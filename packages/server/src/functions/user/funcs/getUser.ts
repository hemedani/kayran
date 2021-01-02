import { throwError } from "./../../../utils/throwErr.ts";
import { RUser, User, users } from "../../../schemas/user.ts";
import { Bson } from "https://deno.land/x/mongo@v0.20.1/mod.ts";

type GetUserInput = { _id: Bson.ObjectID; get: RUser };
type GetUserFn = ({ _id, get }: GetUserInput) => Promise<User>;

export const getUser: GetUserFn = async ({ _id, get }) => {
	const foundedUser = await users.findOne({ _id });
	const doRelation = async (user: User, get: RUser) => {
		//TODO: handle user relations in Ruser
		return user;
	};
	return foundedUser
		? await doRelation(foundedUser, get)
		: throwError("can not find User");
};
