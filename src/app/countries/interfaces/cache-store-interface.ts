import { CountryInterface } from "./country-interface";
import { Region } from "./region-type";

export interface CacheStore {
    byCapital: TermCountries;
    byCountries: TermCountries;
    byRegion: PickedRegion;
}

export interface TermCountries {
    characters: string;
    countries: CountryInterface[];
}

export interface PickedRegion {
    region?: Region;
    countries: CountryInterface[];
}