import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class User {

    private _username: string;
    private _password: string;
    private _email: string;
    private _first_name: string;
    private _last_name: string;
    private _id: number;
    private _access_key: string;

    public get username(): string { return this._username; }
    public get password(): string { return this._password; }
    public get email(): string { return this._email; }
    public get first_name(): string { return this._first_name; }
    public get last_name(): string { return this._last_name; }
    public get id(): number { return this._id; }
    public get access_key(): string { return this._access_key; }

    public set username(username: string) { this._username = username; }
    public set password(password: string) { this._password = password; }
    public set email(email: string) { this._email = email; }
    public set first_name(first_name: string) { this._first_name = first_name; }
    public set last_name(last_name: string) { this._last_name = last_name; }

    public setAll(username: string, password: string, email: string, first_name: string, last_name: string, id?: number, access_key?: string): void {
        this._username = username;
        this._password = password;
        this._email = email;
        this._first_name = first_name;
        this._last_name = last_name;
        this._id = id || 0;
        this._access_key = access_key || 'User';
    }
}
