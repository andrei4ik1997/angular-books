import {createFeatureSelector, createSelector} from '@ngrx/store';
import {COMMON_FEATURE_KEY} from './entities/constants';

import {CommonState} from './entities/interfaces';

const getState = createFeatureSelector<CommonState>(COMMON_FEATURE_KEY);

const getLanguages = createSelector(getState, (state) => state.languages);
const getLanguagesLoadingStatus = createSelector(getState, (state) => state.languagesLoadingStatus);

const getGenres = createSelector(getState, (state) => state.genres);
const getGenresLoadingStatus = createSelector(getState, (state) => state.genresLoadingStatus);

export const commonSelectors = {
	genres: {
		data: getGenres,
		loadingStatus: getGenresLoadingStatus,
	},
	languages: {
		data: getLanguages,
		loadingStatus: getLanguagesLoadingStatus,
	},
};
