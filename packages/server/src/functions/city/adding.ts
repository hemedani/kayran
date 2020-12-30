import { getCountry } from "./../country/funcs/getCountry.ts";
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";
import {
	citySelectable,
	countries as cities,
	Country as City,
	countrySelectable,
	RCountry as RCity,
} from "../../schemas/index.ts";
import { throwError } from "../../utils/index.ts";

const v = new FastestValidator();
const check = v.compile({
	details: {
		type: "object",
		props: {
			set: {
				type: "object",
				props: {
					name: { type: "string" },
					enName: { type: "string" },
					stateId: { type: "string" },
				},
			},
			get: {
				type: "object",
				optional: true,
				props: citySelectable(1),
			},
		},
	},
});

interface addingCityDetails {
	set: { name: string; enName: string };
	get: RCity;
}

type AddingCity = (details: addingCityDetails) => Promise<Partial<City>>;

export const addingCity: AddingCity = async (details) => {
	const detailsIsRight = check({ details });
	detailsIsRight !== true && throwError(detailsIsRight[0].message);
	const {
		set: { name, enName },
		get,
	} = details;
	const createdCity = await cities.insertOne({
		name,
		enName,
	});
	console.log(createdCity);
	const ob = new Bson.ObjectID(createdCity);
	return get ? getCountry({ _id: ob, get }) : { _id: ob };
};
