import { Injectable } from '@angular/core';
import { Post } from './post';

@Injectable({
    providedIn: 'root'
})

export class User {
    id: number;
    username: string;
    password: string;
    email: string;
    accessKey: string;
    posts: Post[];
}
