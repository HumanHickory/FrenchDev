import { Injectable } from "@angular/core";
import { Verb } from "../Models/Verb";
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class VerbService {
    constructor(private http: HttpClient) {
    }

    getVerbs(ER: boolean, IR: boolean, RE: boolean) {
        const params = new HttpParams()
            .set('ErVerbs', ER)
            .set('IrVerbs', IR)
            .set('ReVerbs', RE)


        return this.http.get<Array<Verb>>(environment.apiUrl() + "verb/GetVerbs", {params});
    }

    getRecentlyAdded(){
        return this.http.get<Array<Verb>>(environment.apiUrl() + "verb/GetRecentlyAdded");
    }

    getTenses(){
        return this.http.get<Array<any>>(environment.apiUrl() + "verb/GetTenses");
    }

    getPronouns(){
        return this.http.get<Array<any>>(environment.apiUrl() + "verb/GetPronouns");
    }

    
}