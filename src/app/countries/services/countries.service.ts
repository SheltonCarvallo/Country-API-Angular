import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CountryInterface } from "../interfaces/country-interface";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CountriesService {

    private serviceUrl: string = 'https://restcountries.com/v3.1';

    constructor(private httpClient: HttpClient) { }

    searchCapital(cityCharacters: string): Observable<CountryInterface[]> {
        const url = `${this.serviceUrl}/capital/${cityCharacters}`;

        return this.httpClient.get<CountryInterface[]>(url);
    }

}