import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class Post {

    private user_id: number;
    private content: string;
    private id: number;

    public get User_id(): number { return this.user_id; }
    public get Content(): string { return this.content; }
    public get Id(): number { return this.id; }

    public set Content(content: string) { this.content = content; }

    public setAll(user_id: number, content: string, id?: number): void {
        this.user_id = user_id;
        this.content = content;
        this.id = id || 0;
    }
}
