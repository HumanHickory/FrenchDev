import { Injectable } from "@angular/core";
import { Verb } from "../Models/Verb";
import { HttpClient, HttpParams } from '@angular/common/http'
import { ErrorModel } from "../Models/ErrorModel";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})
export class ErrorService {
    constructor(private http: HttpClient) {
    }

    test(errorDetails: ErrorModel){
        return this.http.post<boolean>(environment.apiUrl() + "error/ReportError", errorDetails);
    }
}