import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { CountryInterface } from '../../interfaces/country-interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit{

  public countriesArray: CountryInterface[] = [];
  public characters?: string;

  constructor(private countriesService: CountriesService) { } //DI

  ngOnInit(): void {
    this.countriesArray = this.countriesService.cacheStore.byCapital.countries;
    this.characters = this.countriesService.cacheStore.byCapital.characters;
  }

  public placeHolderFromCapitalComponent: string = "Enter the capital name";
  public isloading: boolean = false;

  searchByCapital(capitalSearch: string): void {
    this.isloading = true;
    this.countriesService.searchCapital(capitalSearch)
    .subscribe(
      countries => {
        this.countriesArray = countries; 
        this.isloading = false;
      }
    )
  }
}
 