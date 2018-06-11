// Core components
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// RxJS
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

// Models
import { OneClickApiSkills } from '../pages/models/oneClickApi-skills.model'
import { OneClickApiGlobalBusiness} from '../pages/models/oneClickApi-global-business.model'
import { OneClickApiBusinesses } from '../pages/models/oneClickApi-businesses.model'

@Injectable()
export class oneClickApiService {

    private baseUrl: string = 'http://tccdirectory.1click.pf/api/';
    private id: string = '{id}';

    constructor(private http: Http) { 

    }

    public getSkills() : any {
        const url = `${this.baseUrl}skills`;

        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as OneClickApiSkills)
            .catch(error => console.log('Une erreur est survenue ' + error))
    }  

    public getGlobalBusiness (): Promise<any> {
        const url = `${this.baseUrl}business/${this.id}`;

        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as OneClickApiGlobalBusiness)
            .catch(error => console.log('Une erreur est survenue ' + error))
    }

    public getBusinesses(): Promise<any> {
        const url = `${this.baseUrl}businesses`;

        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as OneClickApiBusinesses)
            .catch(error => console.log('Une erreur est survenue ' + error))
    }
} 