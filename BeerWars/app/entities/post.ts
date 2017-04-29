import { BeerItem } from './beeritem';
import { User } from './user';

export class Post {
    Text: string;
    BeerRatingMark: number;
    DateTime: Date;
    Guid: string;
    User: User;
    BeerItem: BeerItem;
}