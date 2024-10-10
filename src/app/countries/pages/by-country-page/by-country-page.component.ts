import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { CountryInterface } from '../../interfaces/country-interface';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {

  public countriesArray: CountryInterface[] = [];
  public placeHolderFromCountryComponent: string = 'Enter the country name'

  constructor(private countryService: CountriesService) {
  }

  SearchByCountry(countryCharacter: string): void
  {
    this.countryService.searchCountry(countryCharacter)
    .subscribe(
      resp => this.countriesArray = resp
    )
  }


}
