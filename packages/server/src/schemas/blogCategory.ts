import { Base } from "./utils/bases/base";
import db from "../../db.ts";

export interface BlogCategory extends Base {
	name: string;
	enName: string;
	icon: string;
	description: string;
}

export const blogCategories = db.collection<BlogCategory>("BlogCategories");
