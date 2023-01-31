import { Language } from "./language.model";

//export interface Person {
//  id: number;
//  name: string;
//  countryId: number;
//  cityId: number;
//  languageSkills: string;
//  dateOfBirth: Date;
//  resumeFileName: string;
//  languages?: Language[];
//  resumeFile: File;
//}

export class Person {
  id: number = 0;
  name: string = "";
  countryId: number = 0;
  cityId: number = 0;
  languageSkills: string = "";
  dateOfBirth: Date = new Date();
  resumeFileName: string = "";
  city?: any;
  country?: any;
  languages?: any[];
  resumeFile?: any;
}
