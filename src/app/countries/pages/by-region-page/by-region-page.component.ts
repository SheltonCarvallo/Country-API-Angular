import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { CountryInterface } from '../../interfaces/country-interface';
import { Region } from '../../interfaces/region-type';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit{
  
 
  public placeHolderFromRegionComponent: string = 'Enter the region name';

  public countriesArray: CountryInterface[] = [];

  public regions: Region[] = ['Africa','Americas', 'Asia','Europe','Oceania'];

  public selectedRegion?: Region;
  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService) {

  }
  ngOnInit(): void {
    this.countriesArray = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  lookByRegion(region: Region): void {
    this.isLoading = true;
    this.selectedRegion = region
    this.countriesService.searchByRegion(region).subscribe
      (
        resp => { 
          this.countriesArray = resp
          this.isLoading = false;
        }
      )
  }



}
