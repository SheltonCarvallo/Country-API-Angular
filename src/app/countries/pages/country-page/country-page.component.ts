import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { CountryInterface } from '../../interfaces/country-interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

  public country?: CountryInterface;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private countryService: CountriesService
  ) { }

  /*  ngOnInit(): void {
     //params is an obsevable
     this.activatedRoute.params.subscribe(
       //The parameter {id} comes from the url of the path  path: 'by/:id' in the countries-routing.module
       ({ id }) => {
         this.countryService.serchCountryByAlphaCode(id).subscribe(
           country => {
             console.log({country});
           })
       }); // I don't have fucking idea of this
   } */
  ngOnInit(): void {
    //params is an obsevable
    this.activatedRoute.params.subscribe( //if I am not mistaken before rendering this method fetch the id of the url and the makes a request
      //The parameter {id} comes from the url of the path  path: 'by/:id' in the countries-routing.module
      ({ id }) => { //id se lo obtiene por desestructurazion
        this.searchCountryCode(id);
      }); 
  }

  searchCountryCode(code : string){
    this.countryService.serchCountryByAlphaCode(code)
    .subscribe(resp => {
      if(!resp){
        return this.router.navigateByUrl('by-capital');
      }
      //console.log(resp.cca3);
      return this.country = resp;
    });
  }


  //this is another way to solve the above "problem"
  //using rxjs
  /*
    this.activatedRoute.params
    .pipe(
      switchMap (({id}) => this.countryService.serchCountryByAlphaCode(id)
    )
    .subscribe(country => {
      console.log({country})
    });
  */ 

}
