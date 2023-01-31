import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from '../../models/city.model';
import { Country } from '../../models/country.model';
import { Language } from '../../models/language.model';
import { Person } from '../../models/person.model';
import { CityService } from '../../services/city.service';
import { CountryService } from '../../services/country.service';
import { LanguageService } from '../../services/language.service';
import { PeopleService } from '../../services/people.service';

import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';


import { FileUploadService } from '../../services/file-upload.service';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {

  person: Person = new Person();

  people: Person[] = [

  ];

  countries: any[] = [];

  selectedFile: File = new File([], '');
  success = false;
  error = false;
  errorMessage: string = "";


  languageSkills: string = "";
  languages: any[] = [];

  cities!: City[];
  isChecked: boolean = false;



  addPersonForm!: FormGroup;
  selectedResumeFile!: File;

  addPersonRequest: Person = {
    id: 0,
    name: '',
    countryId: 0,
    cityId: 0,
    languageSkills: '',
    dateOfBirth: new Date(),
    resumeFileName: '',
    languages: [],
    resumeFile: new File([], '')

  };

  //constructor(
  //  private fb: FormBuilder,
  //  private personService: PeopleService,
  //  private router: Router,
  //  private countryService: CountryService,
  //  private cityService: CityService,
  //  private languageService: LanguageService
  //) {
  //  this.addPersonForm = this.fb.group({
  //    name: ['', Validators.required],
  //    country: ['', Validators.required],
  //    city: ['', Validators.required],
  //    languageSkills: ['', Validators.required],
  //    dateOfBirth: ['', Validators.required],
  //    resumeFileName: ['', Validators.required],
  //    languages: ['', Validators.required],
  //    cityId: ['', Validators.required],
  //    countryId: ['', Validators.required],
  //    resumeFile: ['', Validators.required],
  //  });
  //}

  baseApiUrl: string = environment.baseApiUrl;
  uploadProgress: number = 0;
  uploadSuccess: boolean = false;
  uploadMessage: string = "";
  err: string = "";

  constructor(
    private fb: FormBuilder,
    private peopleService: PeopleService,
    private router: Router,
    private countryService: CountryService,
    private cityService: CityService,
    private languageService: LanguageService,
    private http: HttpClient,
    private fileUploadService: FileUploadService,
    private personService: PersonService

  ) { }


  ngOnInit() {

    this.peopleService.getAllPeople()
      .subscribe({
        next: (people) => {
          this.people = people;
        },
        error: (response) => {
          console.log(response);
        }
      });

    this.countryService.getCountries().subscribe((data: Country[]) => {
      this.countries = data;
    });

    this.cityService.getCities().subscribe((data: City[]) => {
      this.cities = data;
    });

    this.languageService.getLanguages().subscribe((data: Language[]) => {
      this.languages = data;
    });
    this.getLanguages();
    this.loadCities();
  }




  getLanguages() {
    this.languageService.getLanguages().subscribe((data: Language[]) => {
      this.languages = data;
    });
  }


  loadCities() {
    this.cities = [];
    this.addPersonRequest.cityId = -1;
    this.cityService.getCitiesByCountryId(this.addPersonRequest.countryId).subscribe((data: City[]) => {
      this.cities = data;
    });
  }


  //getSelectedLanguageSkills(): string {
  //  let selectedLanguageIds = this.languages
  //    .filter(language => language.isChecked)
  //    .map(language => language.id)
  //    .join(',');
  //  return selectedLanguageIds;
  //}


  getSelectedLanguageSkills(): string {

    let l = this.languages.length;
    var p = new Array();
    for (var i = 0; i < l; i++) {
      if (this.languages[i].checked) {
        p.push(this.languages[i].value);

      }
    }

    return this.languageSkills = p.join(", ");
  }



  onFileSelected(event: any) {
    this.selectedResumeFile = <File>event.target.files[0];

    const file = event.target.files[0];
    this.person.resumeFile = file;
    this.person.resumeFileName = file.name;
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.person.resumeFile = file;
      this.person.resumeFileName = file.name;
    }
  }


  //savePerson(formValues: any) {
  //  let person = {
  //    ...formValues,
  //    languageSkills: this.getSelectedLanguageSkills()
  //  };
  //  person = { ...person, ...this.person };

  //  this.personService.savePerson(person)
  //    .subscribe(data => {
  //      console.clear();
  //      console.log(person);
  //      console.log(this.person.languageSkills);
  //      console.log('Person saved successfully.');
  //      this.refreshData();
  //      this.refreshPeopleData();
  //    });
  //  this.router.navigate(['/people']);
  //}

  savePerson(formValues: any) {
    let person = {
      ...formValues,
      languageSkills: this.getSelectedLanguageSkills()
    };
    person = { ...person, ...this.person };
    person.languageSkills = this.getSelectedLanguageSkills();
    this.personService.savePerson(person)
      .subscribe(data => {
        console.clear();
        console.log(person);
        console.log(this.person.languageSkills);
        console.log('Person saved successfully.');
        this.refreshData();
        this.refreshPeopleData();
      });
    this.router.navigate(['/people']);
  }


  refreshPeopleData() {
    this.peopleService.getAllPeople().subscribe(data => {
      this.people = data;
    });
  }

  refreshData() {
    this.languageService.getLanguages().subscribe(languages => {
      this.languages = languages;
    });
  }


  addPerson(addPersonRequest: Person): Observable<Person> {
    this.showValidation();
    this.person.languageSkills = this.getSelectedLanguageSkills();
    console.log(this.addPersonRequest);
    console.log(event);

    return this.http.post<Person>(this.baseApiUrl + '/api/people', {

      countryId: addPersonRequest.countryId,
      cityId: addPersonRequest.cityId,
    });
  }



  showValidation() {
    this.err = "\n";
    if (this.addPersonRequest.name == "") this.err += "\nPlease, Provide your name ";
    if (this.addPersonRequest.countryId == 0) this.err += "\nPlease, Select your country ";
    if (this.addPersonRequest.cityId <= 0) this.err += "\nPlease, Select your city";
    //if (this.addPersonRequest.languageSkills.length < 1) this.err += "\nPlease, Choose at least 1 languange skill ";
    this.err += "";
    if (this.err == "" || this.err == "\n") {
      return;
    }
    confirm(this.err);
  }


  onSubmit(form: NgForm) {
    const formData = new FormData();
    let headers = new HttpHeaders();
    headers = headers.append('enctype', 'multipart/form-data');
    this.person.countryId = this.addPersonRequest.countryId,
    this.person.cityId = this.addPersonRequest.cityId,

    console.log(this.person);

    this.peopleService.addPerson(this.person);
    this.people.push(this.person);
    this.people[-1] = this.person;

    this.router.navigate(['/people']);
  }

}
