import { Book } from './book.model';

export interface Author {
    id?: number;
    name: string;
    birthYear: number;
    books?: Book[];
}
