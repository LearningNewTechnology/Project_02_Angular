import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class User {
    id: number;
    username: string;
    password: string;
    accessKey: string;

    //modified by Poho
    firstName: string;
    lastName: string;
    email: string;
}
