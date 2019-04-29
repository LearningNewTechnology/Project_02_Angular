import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class User {

    public username: string;
    public password: string;
    public email: string;

    public firstName: string;
    public lastName: string;
    public id: number;
    public salt: string;
    public resetkey: string;
    public access_key: string;

    public setAll(username: string, password: string, email: string, first_name: string, last_name: string, salt?: string, id?: number, access_key?: string): void {
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = first_name;
        this.lastName = last_name;
        this.salt = salt || 'SALT';
        this.id = id || 0;
        this.access_key = access_key || 'User';
    }
}
