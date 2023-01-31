import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPersonComponent } from './components/add-person/add-person.component';
import { EditPersonComponent } from './components/edit-person/edit-person.component';
import { PeopleListComponent } from './components/people/people-list/people-list.component';

const routes: Routes = [
  {
    path: '',
    component: PeopleListComponent
  },
  {
    path: 'people',
    component: PeopleListComponent
  },
  {
    path: 'people/add',
    component: AddPersonComponent
  },
  {
    path: 'people/edit/:id',
    component: EditPersonComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
