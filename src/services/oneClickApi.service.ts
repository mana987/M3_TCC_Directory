// Core components
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// RxJS
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

// Models
// Importez vos models ici
import { OneClickApiSkills } from '../pages/models/oneClickApi-skills.model'
import { OneClickApiBusinesses } from '../pages/models/oneClickApi-businesses.model'

@Injectable()
export class oneClickApiService {

    private baseUrl: string = 'http://tccdirectory.1click.pf/api/';
    // private source: string = 'skills';

    constructor(private http: Http) { }

    public getSkills(): Promise<any> {
        const url = `${this.baseUrl}skills`;

        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as OneClickApiSkills)
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