// Core components
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// RxJS
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// Models
import { OneClickApiSkills } from '../pages/models/oneClickApi-skills.model'
import { OneClickApiGlobalBusiness } from '../pages/models/oneClickApi-global-business.model'
import { OneClickApiAbus } from '../pages/models/OneClickApi-abus.model';


@Injectable()
export class oneClickApiService {

    private businessesUrl = 'http://tccdirectory.1click.pf/api/businesses';
    private baseUrl: string = 'http://tccdirectory.1click.pf/api/';
    data: Observable<any>;
    result: any[];
    skillID: string;

    constructor(private http: Http) {
    }

    // Get all businesses

    getBusinesses(page): Observable<string[]> {
        return this.http.get(this.businessesUrl + "?page=" + page)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    // Get Business ID

    public getBusiness(id): Promise<any> {

        const url = `${this.baseUrl}business/` + id;
        return this.http.get(url)

            .toPromise()
            .then(response => response.json() as OneClickApiGlobalBusiness)
            .catch(error => console.log('Une erreur est survenue getBusinesses ' + error))
    }

    // Get all Skills

    public getSkills(): Promise<any> {
        const url = `${this.baseUrl}skills`;

        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as OneClickApiSkills)
            .catch(error => console.log('Une erreur est survenue getSkill ' + error))
    }

    // Get Abus

    public getAbus(id): Promise<any> {

        const url = `${this.baseUrl}abus/business/`+ id;
        return this.http.get(url)

            .toPromise()
            .then(response => response.json() as OneClickApiAbus)
            .catch(error => console.log('Une erreur est survenue getBusinesses ' + error))
    }

    // Post Skills

    public postSkills(skillID): Observable<any> {

        const url = `${this.baseUrl}search`;
        let postData = { "skills": skillID.join(",") };
        return this.http.post(url, postData)
            .map((response: Response) => response.json());
    }
}

