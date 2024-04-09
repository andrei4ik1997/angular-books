import {Book, Filters, LoadingStatus, Sort} from '@shared';

export interface BooksState {
	book: Book | null;
	bookLoadingStatus: LoadingStatus;
	books: Book[];
	booksLoadingStatus: LoadingStatus;
	filters: Filters | null;
	searchQuery: string;
	sort: Sort | null;
}
