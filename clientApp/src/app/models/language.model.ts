import { Person } from "./person.model";

export interface Language {
  id: number;
  name: string;
  isChecked: boolean;
  people?: Person[];
}
