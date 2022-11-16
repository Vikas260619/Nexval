import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private countryList: Country[] = [];

  constructor(private httpClient: HttpClient) {}

  getCountries() {
    return this.httpClient.get<Country[]>('../assets/country.json');
  }

  test(){
    console.log("dfghj");
  }

  filterCountry(countryList: Country[], country: string) {
    if (this.countryList.length === 0) {
      this.countryList = countryList;
    }

    return this.countryList.filter((value) => {
      if (value.name.includes(country)) return true;
      return false;
    });
  }
}
