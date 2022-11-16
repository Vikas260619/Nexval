import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

//  Custom components
import { CountrySelectDropdownComponent } from '../components/country-select-dropdown/country-select-dropdown.component';
import { HeaderPanelComponent } from '../components/header-panel/header-panel.component';
const reusableComponents = [
  CountrySelectDropdownComponent,
  HeaderPanelComponent,
];

import { SharedDirectiveModule } from './shared-directive.module';

@NgModule({
  declarations: [...reusableComponents],
  imports: [
    SharedDirectiveModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
  ],
  exports: [...reusableComponents, ReactiveFormsModule],
})
export class SharedComponents {}
