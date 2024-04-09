import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AUTHORS_FEATURE_KEY} from './entities/constants';
import {AuthorsState} from './entities/interfaces';

const getState = createFeatureSelector<AuthorsState>(AUTHORS_FEATURE_KEY);

const getAuthors = createSelector(getState, (state) => state.authors);
const getAuthorsLoadingStatus = createSelector(getState, (state) => state.authorsLoadingStatus);

export const authorsSelectors = {
	authors: {
		data: getAuthors,
		loadingStatus: getAuthorsLoadingStatus,
	},
};
