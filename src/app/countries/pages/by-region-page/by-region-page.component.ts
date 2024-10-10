import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { CountryInterface } from '../../interfaces/country-interface';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {

  public placeHolderFromRegionComponent: string = 'Enter the region name';

  public countriesArray: CountryInterface[] = [];

  constructor(private countriesService: CountriesService)
  {

  }

  lookByRegion(regionCharacters: string): void{
    this.countriesService.searchByRegion(regionCharacters).subscribe
    (
      resp => this.countriesArray = resp
    )
  }



}
