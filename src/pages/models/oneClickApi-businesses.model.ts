import {  OneClickApiSkills } from './oneClickApi-skills.model';

export class OneClickApiBusinesses {
    id       : number;
    name     : string;
    logo     : string;
    latitude : number;
    longitude: number;
    abus     : number;
    skills   : OneClickApiSkills[];
} 