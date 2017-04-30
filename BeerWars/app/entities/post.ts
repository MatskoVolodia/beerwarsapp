import { BeerItem } from './beeritem';
import { User } from './user';
import { Comment } from './comment';
import { Like } from './like';

export class Post {
    Text: string;
    BeerRatingMark: number;
    DateTime: Date;
    Guid: string;
    User: User;
    BeerItem: BeerItem;
    Comments: Comment[];
    Likes: Like[];
}