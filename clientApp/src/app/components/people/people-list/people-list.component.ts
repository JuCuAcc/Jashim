import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { count, Observable } from 'rxjs';
import { Person } from 'src/app/models/person.model';
import { environment } from '../../../../environments/environment';
import { City } from '../../../models/city.model';
import { Country } from '../../../models/country.model';
import { CityService } from '../../../services/city.service';
import { CountryService } from '../../../services/country.service';
import { PeopleService } from '../../../services/people.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';


import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';

import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css'],
  template: `
    <table matSort #sort="matSort">
      <!-- table content -->
    </table>
  `
})

export class PeopleListComponent{

  id: number = 0;
  countries: Country[] = [];
  cities: City[] = [];
  resumeFileName: string = "";
  people: Person[] = [

  ];


  @ViewChild(MatSort)
  sort!: MatSort;
  dataSource: any;


  baseApiUrl: string = environment.baseApiUrl;
  resumeDownloadUrl: string = environment.resumeBaseUrl;
  languageSkills: string = "";
  languages: any = [];

  constructor(
    private http: HttpClient,
    private peopleService: PeopleService,
    private countryService: CountryService,
    private cityService: CityService,
    private dialog: MatDialog
  ) { }




  ngOnInit(): void {
    this.peopleService.getAllPeople()
      .subscribe({
        next: (people) => {
          this.people = people;
        },
        error: (response) => {
          console.log(response);
        }
      });

    this.countryService.getCountries()
      .subscribe({
        next: (countries) => {
          this.countries = countries;
        },
        error: (response) => {
          console.log(response);
        }
      });

    this.cityService.getCities()
      .subscribe({
        next: (cities) => {
          this.cities = cities;
        },
        error: (response) => {
          console.log(response);
        }
      });
  }

  openDeleteConfirmationDialog(person: Person) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '480px',
      data: {
        id: person.id,
        name: person.name,
        country: person.countryId,
        city: person.cityId
      },
      position: {
        left: '550px',
        top: '-450px',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteById(person.id);
      }
    });
  }

  deleteById(id: number) {
    this.peopleService.deletePerson(id).subscribe(() => {
      this.peopleService.getAllPeople().subscribe(people => {
        this.people = people;
      });
    });
  }

  getCountryName(countryId: any) {
    const country = this.countries.find((c: { id: any; }) => c.id === countryId);
    return country ? country.name : '';
  }

  getCityName(cityId: any) {
    const city = this.cities.find((c: { id: any; }) => c.id === cityId);
    return city ? city.name : '';
  }
  
  getResumeFile(resumeFileName: string) {
    return this.resumeDownloadUrl + '?fileName=' + resumeFileName;
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

    //let selectedLanguageIds = this.languages
    //  .filter((language: { isChecked: boolean; }) => language.isChecked)
    //  .map((language: { id: any; }) => language.id)
    //  .join(',');
    //return selectedLanguageIds;
  }

}
