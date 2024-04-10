import {Action, createReducer, on} from '@ngrx/store';
import {loadingStatus} from '@shared';
import {booksActions} from './actions';
import {BooksState} from './entities/interfaces';

const initialState: BooksState = {
	books: [],
	booksLoadingStatus: loadingStatus.loading,
	book: null,
	bookLoadingStatus: loadingStatus.loading,
	sort: null,
	filters: null,
	searchQuery: '',
};

const reducer = createReducer(
	initialState,
	on(booksActions.getBooks.requested, (state) => ({
		...state,
		books: initialState.books,
		booksLoadingStatus: loadingStatus.loading,
	})),
	on(booksActions.getBooks.succeeded, (state, action) => ({
		...state,
		books: action.payload,
		booksLoadingStatus: loadingStatus.loaded,
	})),
	on(booksActions.getBooks.failed, (state) => ({
		...state,
		books: initialState.books,
		booksLoadingStatus: loadingStatus.loaded,
	})),
	on(booksActions.addBook.succeeded, (state, payload) => ({
		...state,
		books: state.books.concat(payload.payload),
	})),
	on(booksActions.getBook.requested, (state) => ({
		...state,
		book: initialState.book,
		bookLoadingStatus: loadingStatus.loading,
	})),
	on(booksActions.getBook.succeeded, (state, action) => ({
		...state,
		book: action.payload,
		bookLoadingStatus: loadingStatus.loaded,
	})),
	on(booksActions.getBook.failed, (state) => ({
		...state,
		book: initialState.book,
		bookLoadingStatus: loadingStatus.loaded,
	})),
	on(booksActions.setSort, (state, payload) => ({
		...state,
		sort: payload.payload,
	})),
	on(booksActions.setSearchQuery, (state, payload) => ({
		...state,
		searchQuery: payload.payload,
	})),
	on(booksActions.changeFilter, (state, payload) => ({
		...state,
		filters: {...state.filters, ...payload.payload},
	})),
	on(booksActions.destroyPage, (state) => ({
		...state,
		...initialState,
	}))
);

export function booksReducer(state: BooksState | undefined, action: Action): BooksState {
	return reducer(state, action);
}
