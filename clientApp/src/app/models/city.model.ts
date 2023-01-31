import { Country } from "./country.model";

export interface City {
  id: number;
  name: string;
  countryId: number;
  country?: Country;
}
