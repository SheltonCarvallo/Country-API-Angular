import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CountryInterface } from "../interfaces/country-interface";
import { catchError, delay, map, Observable, of, tap } from "rxjs";
import { CacheStore } from "../interfaces/cache-store-interface";
import { Region } from "../interfaces/region-type";
import { ThisReceiver } from "@angular/compiler";

@Injectable({ providedIn: 'root' })
export class CountriesService {

    private serviceUrl: string = 'https://restcountries.com/v3.1';

    public cacheStore: CacheStore = {
        byCapital: { characters: '', countries: [] },
        byCountries: { characters: '', countries: [] },
        byRegion: { region: '', countries: [] }
    }

    constructor(private httpClient: HttpClient) {
        //this is loaded the first time this serivce is called
        this.loadFromLocalStorage();
    } //DI


    private saveToLocalStorage(){
        localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
    }

    private loadFromLocalStorage(){
        //this validation check if the cacheStore exists in the local storage
        if(!localStorage.getItem('cacheStore')) return;
        this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
    }

    private httpGetCountry(url: string): Observable<CountryInterface[]> {
        return this.httpClient.get<CountryInterface[]>(url)
            .pipe(
                catchError(error => of([])),
                delay(500)

            );
    }

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
        return this.httpGetCountry(url)
        .pipe(
            tap( countries => this.cacheStore.byCapital = {characters: cityCharacters, countries: countries}),
            tap(() => this.saveToLocalStorage())

        )
    }


    //https://restcountries.com/v3.1/name/{name}
    searchCountry(countryCharacters: string): Observable<CountryInterface[]> {
        const url = `${this.serviceUrl}/name/${countryCharacters}`;
        return this.httpGetCountry(url)
        .pipe(
            tap( countries => this.cacheStore.byCountries = {characters: countryCharacters, countries: countries}),
            tap(() => this.saveToLocalStorage())
        );
    }

    //https://restcountries.com/v3.1/region/{region}

    searchByRegion(regionCharacters: Region): Observable<CountryInterface[]> {
        const url: string = `${this.serviceUrl}/region/${regionCharacters}`;
        return this.httpGetCountry(url)
        .pipe(
            tap(resp => this.cacheStore.byRegion = {region: regionCharacters, countries: resp}),
            tap(() => this.saveToLocalStorage())
        );
    }
} 