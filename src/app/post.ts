import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class Post {

    constructor(
        private _user_id: number,
        private _content: string,
        private _id?: number) { }

    public get user_id(): number { return this._user_id; }
    public get content(): string { return this._content; }
    public get id(): number { return this._id; }

    public set content(content: string) { this._content = content; }
}
