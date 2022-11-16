import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Dropdown } from 'bootstrap';
import { Country } from 'src/app/interfaces/country.interface';
import { CountryService } from 'src/app/service/country.service';

@Component({
  selector: 'app-country-select-dropdown',
  templateUrl: './country-select-dropdown.component.html',
  styleUrls: ['./country-select-dropdown.component.scss'],
})
export class CountrySelectDropdownComponent implements OnInit, AfterViewInit {
  countries: Country[] = [];
  selectedCountry: Country;
  countrySearch: FormControl;
  iso: string;

  @Output() CountryChangeEvent: EventEmitter<Country> =
    new EventEmitter<Country>();

  constructor(private country: CountryService) {
    this.selectedCountry = {
      dialCode: '91',
      isoCode: 'in',
      name: 'India',
      flag: '#',
    };
    this.iso = 'in';
    this.CountryChangeEvent.emit(this.selectedCountry);

    this.countrySearch = new FormControl(null);
  }

  ngOnInit(): void {
    this.country.getCountries().subscribe((response) => {
      this.countries = response;
    });

    this.countrySearch.valueChanges.subscribe((value) => {
      this.countries = this.country.filterCountry(this.countries, value);
    });
  }

  countrySelectDropdown?: Dropdown;
  @ViewChild('country_select_dropdown') countrySelectEle?: ElementRef;
  ngAfterViewInit(): void {
    if (this.countrySelectEle) {
      this.countrySelectDropdown = new Dropdown(
        this.countrySelectEle?.nativeElement
      );
    }
  }

  fmt(country: string): string {
    return country.replace(/\s/g, '_');
  }

  selectCountry(country: Country) {
    this.selectedCountry = country;
    this.CountryChangeEvent.emit(this.selectedCountry);
  }

  toggleCountrySelect() {
    if (this.countrySelectDropdown) {
      this.countrySelectDropdown.toggle();
    }
  }
}
