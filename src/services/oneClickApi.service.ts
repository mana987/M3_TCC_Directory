// Core components
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// RxJS
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

// Models
import { OneClickApiSkills } from '../pages/models/oneClickApi-skills.model'
// import { OneClickApiGlobalBusiness} from '../pages/models/oneClickApi-global-business.model'
import { OneClickApiBusinesses } from '../pages/models/oneClickApi-businesses.model'

@Injectable()
export class oneClickApiService {

    items = [];
    private baseUrl: string = 'http://tccdirectory.1click.pf/api/';
    // private page = 2;
    constructor(private http: Http) {
        for (let i = 0; i < 30; i++) {
            this.items.push(this.items.length);
        }
    }

    // Get all Skills

    public getSkills(): Promise<any> {
        const url = `${this.baseUrl}skills`;

        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as OneClickApiSkills)
            .catch(error => console.log('Une erreur est survenue getSkill ' + error))
    }


    // Get all businesses

    public getBusinesses(): Promise<any> {
        const url = `${this.baseUrl}businesses`;

        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as OneClickApiBusinesses)
            .catch(error => console.log('Une erreur est survenue getBusinesses ' + error))
    }

    // Get business ID

    // public getGlobalBusiness (): Promise<any> {

    //     const url = `${this.baseUrl}business/${this.id}`;

    //     return this.http.get(url)
    //         .toPromise()
    //         .then(response => response.json() as OneClickApiGlobalBusiness)
    //         .catch(error => console.log('Une erreur est survenue getGlobalBusi ' + error))
    // }

    doInfinite(infiniteScroll) {
        console.log('Begin async operation');

        setTimeout(() => {
            this.getBusinesses()
            .then ()
            for (let i = 0; i < 15; i++) {
                this.items.push(this.items.length);
            }

            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 50);
    }

}

