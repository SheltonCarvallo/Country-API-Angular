import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CountryInterface } from "../interfaces/country-interface";
import { catchError, map, Observable, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CountriesService {

    private serviceUrl: string = 'https://restcountries.com/v3.1';

    constructor(private httpClient: HttpClient) { } //DI

    serchCountryByAlphaCode(code: string): Observable<CountryInterface | null> {
        const url = `${this.serviceUrl}/alpha/${code}`;
        return this.httpClient.get<CountryInterface[]>(url)
            .pipe(
                map(resp => resp.length > 0 ? resp[0] : null),
                catchError(error => of(null))
            );
    }

    searchCapital(cityCharacters: string): Observable<CountryInterface[]> {
        const url = `${this.serviceUrl}/capital/${cityCharacters}`;

        return this.httpClient.get<CountryInterface[]>(url) //Aqui no se hace la solicitud, donde se hara la solicitud es en el codigo donde se declare subscribe
            .pipe(
                catchError(error => of([]))
            );
    }


    //https://restcountries.com/v3.1/name/{name}
    searchCountry(countryCharacters: string): Observable<CountryInterface[]> {
        const url = `${this.serviceUrl}/name/${countryCharacters}` //To do this url
        return this.httpClient.get<CountryInterface[]>(url)
            .pipe(
                catchError(error => of([]))
            );
    }

    //https://restcountries.com/v3.1/region/{region}

    searchByRegion(regionCharacters: string): Observable<CountryInterface[]> {
        return this.httpClient.get<CountryInterface[]>(`${this.serviceUrl}/region/${regionCharacters}`)
            .pipe(
                catchError(error => of([]))
            );
    }

} 