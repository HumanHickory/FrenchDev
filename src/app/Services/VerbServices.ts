import { Injectable } from "@angular/core";
import { Verb } from "../Models/Verb";
import { HttpClient, HttpParams } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class VerbService {
    apiURL: string = "https://frenchapi.azurewebsites.net/api/";
    constructor(private http: HttpClient) {
    }

    getVerbs(ER: boolean, IR: boolean, RE: boolean, Avoir: boolean, Etre: boolean) {
        const params = new HttpParams()
            .set('ErVerbs', ER)
            .set('IrVerbs', IR)
            .set('ReVerbs', RE)
            .set('UsesAvoir', Avoir)
            .set('UsesEtre', Etre)


        return this.http.get<Array<Verb>>(this.apiURL + "verb", {params});
    }

    getTenses(){
        return this.http.get<Array<any>>(this.apiURL + "verb/tenses");
    }

    getPronouns(){
        return this.http.get<Array<any>>(this.apiURL + "verb/pronouns");
    }

    
}