import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";
import { countries, Country, RCountry } from "../../../schemas/index.ts";
import { throwError } from "../../../utils/index.ts";
import { makeProjections } from "../../../utils/makeProjections.ts";
import { getCities } from "../../city/funcs/index.ts";
import { getStates } from "../../state/funcs/index.ts";

// const uniqPopulateMany = async<T, C>(curser:FindCursor<T>, field:string, collection: Collection<C>, filter: Bson.Document) => {
//   const fieldIds = curser.map(model => model[field]) || []
//   const uniqIds = ld.uniqWith(fieldIds, ld.isEqual)
//   await collection.find({$in:uniqIds})
// }

// const populateCities = async (get:RCity, filter: Bson.Document) => {
//   const foundedCities = await cities.find(filter, {projection: get});
//   get.country ? await uniqPopulateMany(foundedCities, "country", countries, get.country);

// }

// export const populateGet = async <C, T>(
//   get: any,
//   filter: Bson.Document,
//   collection: Collection<C>,
//   pluralRelations: {[key as string]: Collection<T>}[],
//   singularRelations: string[]
// ) => {
//   console.log("                      ");
//   console.log("++++++++++++++++++++++");
//   console.log("                      ");
//   console.group("get => : ");
//   console.log("                      ");
//   console.log(get);
//   console.log("                      ");
//   console.groupEnd();
//   console.log("                      ");
//   console.log("----------------------");
//   console.log("                      ");
//   const foundedCollection = await collection.findOne(filter, { projection: get });
//   pluralRelations.map(pr => {
//     get[pr] ?
//   })
//   // get.cities ? populateCities(get.cities, {country: foundedCountry?._id})
// };

type GetCountryInput = { _id: Bson.ObjectID; get: RCountry };
type GetCountryFn = ({ _id, get }: GetCountryInput) => Promise<Country>;
export const getCountry: GetCountryFn = async ({ _id, get }) => {
  const projection = makeProjections(get, [], ["states", "cities"]);
  console.log("                      ");
  console.log("++++++++++++++++++++++");
  console.log("                      ");
  console.group("projection => : ");
  console.log("                      ");
  console.log(projection);
  console.log("                      ");
  console.groupEnd();
  console.log("                      ");
  console.log("----------------------");
  console.log("                      ");
  const foundedCountry = await countries.findOne({ _id }, { projection });
  const doRelation = async (country: Country, get: RCountry) => {
    if (get.cities)
      country.cities = await getCities({
        filter: { country: country._id },
        getObj: get.cities,
      });
    if (get.states)
      country.states = await getStates({
        filter: { country: country._id },
        getObj: get.states,
      });
    return country;
  };
  return foundedCountry
    ? await doRelation(foundedCountry, get)
    : throwError("can not find country");
};
