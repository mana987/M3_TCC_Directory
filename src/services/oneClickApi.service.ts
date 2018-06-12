// Core components
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// RxJS
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

// Models
import { OneClickApiSkills } from '../pages/models/oneClickApi-skills.model'
import { OneClickApiBusinesses } from '../pages/models/oneClickApi-businesses.model'
import { OneClickApiGlobalBusiness } from '../pages/models/oneClickApi-global-business.model'

@Injectable()
export class oneClickApiService {

    private baseUrl: string = 'http://tccdirectory.1click.pf/api/';
    private page: number;


    constructor(private http: Http) {

    }

    // Get all businesses

    public getBusinesses(): Promise<any> {

        const url = `${this.baseUrl}businesses?${this.page}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as OneClickApiBusinesses)
            .catch(error => console.log('Une erreur est survenue getBusinesses ' + error))
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

    public postSkills(skills): Promise<any> {
        const url = `${this.baseUrl}search/` + skills;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as OneClickApiSkills)
            .catch(error => console.log('Une erreur est survenue getSkill ' + error))
    }
}

