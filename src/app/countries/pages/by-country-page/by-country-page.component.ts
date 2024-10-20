import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { CountryInterface } from '../../interfaces/country-interface';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit{

  public countriesArray: CountryInterface[] = [];
  public characters?: string;


  public placeHolderFromCountryComponent: string = 'Enter the country name'
  public isLoading: boolean = false;

  constructor(private countryService: CountriesService) {
  }
  ngOnInit(): void {
    this.countriesArray = this.countryService.cacheStore.byCountries.countries;
    this.characters= this.countryService.cacheStore.byCountries.characters;
  }

  SearchByCountry(countryCharacter: string): void {
    this.isLoading = true;
    this.countryService.searchCountry(countryCharacter)
      .subscribe(
        resp => {
          this.countriesArray = resp;
          this.isLoading = false;
        }
      )
  }


}
