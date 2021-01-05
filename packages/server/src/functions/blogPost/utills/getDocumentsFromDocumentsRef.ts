import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";
//if id does not exist, does not throw error

//all ids must be trust
export const getDocumentsFromDocumentRefs = async (
	ids: string[],
	model: any
) => {
	const newIds = ids.map((id) => new Bson.ObjectID(id));
	return await model.find({ _id: { $in: newIds } }).toArray();
};
