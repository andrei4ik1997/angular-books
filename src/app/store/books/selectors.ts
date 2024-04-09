import {createFeatureSelector, createSelector} from '@ngrx/store';
import {BOOKS_FEATURE_KEY} from './entities/constants';
import {filterBooks, getUniqValues, sortBooks} from './entities/functions';
import {BooksState} from './entities/interfaces';

const getState = createFeatureSelector<BooksState>(BOOKS_FEATURE_KEY);

const getBooks = createSelector(getState, (state) => state.books);
const getBooksLoadingStatus = createSelector(getState, (state) => state.booksLoadingStatus);

const getBook = createSelector(getState, (state) => state.book);
const getBookLoadingStatus = createSelector(getState, (state) => state.bookLoadingStatus);

const getSort = createSelector(getState, (state) => state.sort);
const getSearchQuery = createSelector(getState, (state) => state.searchQuery);

const getSelectedFilters = createSelector(getState, (state) => state.filters);

const getAllGenres = createSelector(getBooks, (books) => getUniqValues(books, 'genre'));
const getAllAuthors = createSelector(getBooks, (books) => getUniqValues(books, 'author'));
const getAllLanguages = createSelector(getBooks, (books) => getUniqValues(books, 'language'));
const getMaxPages = createSelector(getBooks, (books) => Math.max(...getUniqValues<number>(books, 'pages')));

const filteredBooks = createSelector(getBooks, getSelectedFilters, getSearchQuery, (books, filters, searchQuery) =>
	filterBooks(books, filters, searchQuery)
);

const filteredAndSorted = createSelector(filteredBooks, getSort, (books, sort) =>
	sort ? sortBooks(books, sort) : books
);

export const booksSelectors = {
	books: {
		data: getBooks,
		filteredAndSorted: filteredAndSorted,
		loadingStatus: getBooksLoadingStatus,
	},
	book: {data: getBook, loadingStatus: getBookLoadingStatus},
	filterData: {
		genres: getAllGenres,
		authors: getAllAuthors,
		languages: getAllLanguages,
		maxPages: getMaxPages,
		selectedFilters: getSelectedFilters,
	},
};
