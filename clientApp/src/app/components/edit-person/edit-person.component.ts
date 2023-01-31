
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '../../models/person.model';
import { PeopleService } from '../../services/people.service';

import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Language } from '../../models/language.model';
import { City } from '../../models/city.model';
import { Country } from '../../models/country.model';
import { LanguageService } from '../../services/language.service';
import { CityService } from '../../services/city.service';
import { CountryService } from '../../services/country.service';
import { concat } from 'rxjs/operators';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatSort } from '@angular/material/sort';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css'],
  template: `
    <table matSort #sort="matSort">
      <!-- table content -->
    </table>
  `
})
export class EditPersonComponent {

  languageSkills: string = "";

  countries!: Country[];
  cities!: City[];

  isChecked: boolean = false;
  languages: any[] = [];


  addPersonForm!: FormGroup;
  selectedResumeFile!: File;

  personDetails: Person = {
    id: 0,
    name: '',
    countryId: 0,
    cityId: 0,
    languageSkills: '',
    dateOfBirth: new Date(2023, 1, 1),
    resumeFileName: '',
    languages: [],
    resumeFile: new File([], '')

  };
    selectedDate: Date = new Date();
    selectedCountry: Country | String | undefined;
    selectedCity: City | String| undefined;
    selectedLanguages: Language[] = [];

  selectedOption!: string;
    options = ['Option 1', 'Option 2', 'Option 3'];

  selectedFile!: File;
    dialog: any;
    people: Person[] = [];

  baseApiUrl: string = environment.baseApiUrl;
  resumeDownloadUrl: string = environment.resumeBaseUrl;

  selectedFileName: string = "";
    person: any;


  ngOnInit() {
    this.route.paramMap.subscribe({
      next: params => {
        const id = params.get('id');
        if (id) {
          this.personService.getPerson(id).subscribe({
            next: response => {
              this.selectedDate = new Date(response.dateOfBirth);
              this.selectedFile = new File([response.resumeFile], response.resumeFileName);
              this.selectedFileName = response.resumeFileName;
              this.personDetails = response;
            }
          });
          this.countryService.getCountries().subscribe(countries => {
            this.countries = countries;
            this.selectedCountry = this.countries.find(country => country.name === this.getCountryName(this.personDetails.countryId));
          });
          this.cityService.getCities().subscribe(cities => {
            this.cities = cities;
            this.selectedCity = this.cities.find(city => city.name === this.getCityName(this.personDetails.cityId));
          });
          //this.languageService.getLanguages().subscribe(languages => {
          //  this.languages = languages;
          //  this.selectedLanguages = this.languages.filter(language => this.personDetails.languageSkills.includes(language.name));
          //});
          let selectedLanguageIds = this.getSelectedLanguageIds();
          this.languages.forEach(language => {
            if (selectedLanguageIds.includes(language.id.toString())) {
              language.isChecked = true;
            }
          });
        }
      }
    });
  }


  @ViewChild(MatSort)
  sort!: MatSort;
  dataSource: any;

  private selectedLanguageIds = '';


  updateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private personService: PeopleService,
    private peopleService: PeopleService,
    private router: Router,
    private countryService: CountryService,
    private cityService: CityService,
    private languageService: LanguageService,
    private http: HttpClient,
    private route: ActivatedRoute,

  ) { }

      //this.updateForm = this.fb.group({
      //  name: ['']
      //});



  getSelectedLanguageIds() {
    return this.selectedLanguageIds;
  }

  getCountryName(countryId: any) {
    const country = this.countries.find((c: { id: any; }) => c.id === countryId);
    return country ? country.name : '';
  }

  getCityName(cityId: any) {
    const city = this.cities.find((c: { id: any; }) => c.id === cityId);
    return city ? city.name : '';
  }


  getLanguages() {
    this.languageService.getLanguages().subscribe((data: Language[]) => {
      this.languages = data;
    });
  }


  loadCities() {
    this.cities = [];
    this.personDetails.cityId = 1;
    this.cityService.getCitiesByCountryId(this.personDetails.countryId).subscribe((data: City[]) => {
      this.cities = data;
    });
  }



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


  updatePerson(formValues: any) {
    let person = {
      ...formValues,
      languageSkills: this.getSelectedLanguageSkills()
    };
    person = { ...person, ...this.person };
    console.log(this.person);
    this.peopleService.updatePerson(this.personDetails.id, person)
      .subscribe(data => {
        console.clear();
        console.log(person);
        console.log('Person updated successfully.');
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



  //updatePerson() {
  //  let formData = new FormData();
  //  formData.append("updatePersonRequest", JSON.stringify(this.personDetails));
  //  formData.append("resume", this.selectedResumeFile, this.selectedResumeFile.name);

  //  this.http.put(this.baseApiUrl + '/api/People/' + this.personDetails.id, formData)
  //    .subscribe(res => {
  //      console.log(res);
  //    });
  //  this.router.navigate(['/people']);
  //}

  deletePerson(id: number) {
    if (confirm("Are you sure you want to delete this person?")) {
      this.http.delete(this.baseApiUrl + '/api/People/' + id)
        .subscribe(res => {
          console.log(res);
          //this.router.navigate(['/people', id]);
          this.router.navigate(['/people']);
        });
    }
  }

  onFileSelected(event: any) {
    this.selectedResumeFile = event.target.files[0];
  }

}

