import { Component, Input } from '@angular/core';
import { CountryInterface } from '../../interfaces/country-interface';

@Component({
  selector: 'app-countries-region-table',
  templateUrl: './region-table.component.html',
  styles: [`img {
        width: 25px;
    }`]
})
export class RegionTableComponent {
  @Input()
  public countriesToRenderArray: CountryInterface[] = [];
}
