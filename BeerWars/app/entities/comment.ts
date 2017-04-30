import { Post } from './post';
import { User } from './user';

export class Comment {
    Text: string;
    DateTime: Date;
    Guid: string;
    Post: Post;
    User: User;
}