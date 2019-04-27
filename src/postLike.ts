import { User } from './app/user';
import { Post } from './app/post';

export class PostLike {
    public id: number;
    public timestamp: any;
    public author: { id: number };
    public post: { id: number };
}