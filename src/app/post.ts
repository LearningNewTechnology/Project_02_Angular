import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class Post {
    id: number;
    userId: number;
    content: string;
}
