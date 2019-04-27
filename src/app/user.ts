import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class User {

    private username: string;
    private password: string;
    private email: string;
    //private first_name: string;
    //private last_name: string;
    private firstName: string;
    private lastName: string;
    private id: number;
    private access_key: string;

    public get Username(): string { return this.username; }
    public get Password(): string { return this.password; }
    public get Email(): string { return this.email; }
    //public get First_name(): string { return this.first_name; }
    //public get Last_name(): string { return this.last_name; }
    public get First_name(): string { return this.firstName; }
    public get Last_name(): string { return this.lastName; }
    public get Id(): number { return this.id; }
    public get Access_key(): string { return this.access_key; }

    public set Username(username: string) { this.username = username; }
    public set Password(password: string) { this.password = password; }
    public set Email(email: string) { this.email = email; }
    //public set First_name(first_name: string) { this.first_name = first_name; }
    //public set Last_name(last_name: string) { this.last_name = last_name; }
    public set First_name(first_name: string) { this.firstName = first_name; }
    public set Last_name(last_name: string) { this.lastName = last_name; }

    public setAll(username: string, password: string, email: string, first_name: string, last_name: string, id?: number, access_key?: string): void {
        this.username = username;
        this.password = password;
        this.email = email;
       // this.first_name = first_name;
        //this.last_name = last_name;
        this.firstName = first_name;
        this.lastName = last_name;
        this.id = id || 0;
        this.access_key = access_key || 'User';
    }
}
