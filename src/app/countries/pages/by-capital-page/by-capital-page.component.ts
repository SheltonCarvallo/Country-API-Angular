import { Component, resolveForwardRef } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { CountryInterface } from '../../interfaces/country-interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  public countriesArray: CountryInterface[] = [];

  constructor(private countriesService: CountriesService) { } //DI

  public placeHolderFromCapitalComponent: string = "Enter the capital name";

  searchByCapital(capitalSearch: string): void {
    this.countriesService.searchCapital(capitalSearch)
    .subscribe(
      countries => {
        this.countriesArray = countries; 
      }
    )
  }
}
 