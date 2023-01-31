import { City } from "./city.model";

export interface Country {
  id: number;
  name: string;
  cities?: City[];
}
