import {props} from '@ngrx/store';
import {Author, getApiActions, getApiActionsWithPayload} from '@shared';
import {AUTHORS_FEATURE_KEY} from './entities/constants';

export const authorsActions = {
	getAuthors: getApiActions(AUTHORS_FEATURE_KEY.toUpperCase(), 'Get authors', props<{payload: Author[]}>()),
	addAuthor: getApiActionsWithPayload(
		AUTHORS_FEATURE_KEY.toUpperCase(),
		'Add author',
		props<{payload: Author}>(),
		props<{payload: Author}>()
	),
	editAuthor: getApiActionsWithPayload(
		AUTHORS_FEATURE_KEY.toUpperCase(),
		'Edit author',
		props<{payload: Author}>(),
		props<{payload: Author}>()
	),
};
