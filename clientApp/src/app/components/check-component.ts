import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css'],
  template: `
    <div>
      <checkbox-group [(ngModel)]="selectedItems">
        <checkbox value="C#">C#</checkbox>
        <checkbox value="C++">C++</checkbox>
        <checkbox value="Java">Java</checkbox>
        <checkbox value="PHP">PHP</checkbox>
        <checkbox value="SQL">SQL</checkbox>
      </checkbox-group>
      <p>Selected items - {{selectedItems | json}}</p>
      <p>Form - {{form.value | json}}</p>
    </div>
  `,
})
export class CheckComponent {
  title = 'CheckComponent';
}
