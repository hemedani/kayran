import { Bson } from "https://deno.land/x/mongo@v0.20.1/deps.ts";
import { fieldType } from "./../fieldType.ts";
import { RType } from "./../rType.ts";

export interface Base {
  _id: Bson.ObjectID;
  createAt: Date;
  updateAt: Date;
}
export interface RBase {
  _id?: RType;
  createAt?: RType;
  updateAt?: RType;
  // version: number;
  // documnet?: any;
}
export const baseSelectableFields = () => ({
  _id: fieldType,
  createAt: fieldType,
  updateAt: fieldType,
});
