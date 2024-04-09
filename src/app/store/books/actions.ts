import {createAction, props} from '@ngrx/store';
import {Book, Filters, Sort, getActionDescription, getApiActions, getApiActionsWithPayload} from '@shared';
import {BOOKS_FEATURE_KEY} from './entities/constants';

const actionDescription = (description: string) => getActionDescription(BOOKS_FEATURE_KEY.toUpperCase(), description);

export const booksActions = {
	getBooks: getApiActions(BOOKS_FEATURE_KEY.toUpperCase(), 'Get books', props<{payload: Book[]}>()),
	addBook: getApiActionsWithPayload(
		BOOKS_FEATURE_KEY.toUpperCase(),
		'Add book',
		props<{payload: Book}>(),
		props<{payload: Book}>()
	),
	getBook: getApiActionsWithPayload(
		BOOKS_FEATURE_KEY.toUpperCase(),
		'Get book',
		props<{payload: number | null}>(),
		props<{payload: Book}>()
	),
	setSort: createAction(actionDescription('Sort changed'), props<{payload: Sort | null}>()),
	setSearchQuery: createAction(actionDescription('Search changed'), props<{payload: string}>()),
	changeFilter: createAction(actionDescription('Filter changed'), props<{payload: Filters}>()),
	destroyPage: createAction(actionDescription('Destroy page')),
};
