import { User } from "./../../schemas/user.ts";

export interface Context {
	token?: string;
	user?: User;
}
