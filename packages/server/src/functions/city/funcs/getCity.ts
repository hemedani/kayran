import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";
import { cities, City, RCity } from "../../../schemas/index.ts";
import { throwError } from "../../../utils/index.ts";
import { makeProjections } from "../../../utils/makeProjections.ts";
import { getStates } from "../../state/funcs/index.ts";
import { getCities } from "./getCities.ts";

type GetCityInput = { _id: Bson.ObjectID; get: RCity };
type GetCityFn = ({ _id, get }: GetCityInput) => Promise<City>;

export const getCity: GetCityFn = async ({ _id, get }) => {
  const projection = makeProjections(get, ["country", "state"], []);
  const foundedCity = await cities.findOne({ _id }, { projection });
  const doRelation = async (city: City, get: RCity) => {
    if (get.country && get.country.states)
      city.country.states = await getStates({
        filter: { country: city._id },
        getObj: get.country.states,
      });
    if (get.state && get.state.cities)
      city.state.cities = await getCities({
        filter: { state: { _id: city.state._id } },
        getObj: get.state.cities,
      });
    return city;
  };
  return foundedCity
    ? await doRelation(foundedCity, get)
    : throwError("can not find country");
};
