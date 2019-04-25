import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class Post {

    private _user_id: number;
    private _content: string;
    private _id: number;

    public get user_id(): number { return this._user_id; }
    public get content(): string { return this._content; }
    public get id(): number { return this._id; }

    public set content(content: string) { this._content = content; }

    public setAll(user_id: number, content: string, id?: number): void {
        this._user_id = user_id;
        this._content = content;
        this._id = id || 0;
    }
}
