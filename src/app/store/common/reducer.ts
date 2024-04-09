import {Action, createReducer, on} from '@ngrx/store';
import {loadingStatus} from '@shared';
import {commonActions} from './actions';
import {CommonState} from './entities/interfaces';

const initialState: CommonState = {
	genres: [],
	genresLoadingStatus: loadingStatus.loading,
	languages: [],
	languagesLoadingStatus: loadingStatus.loading,
};

const reducer = createReducer(
	initialState,
	on(commonActions.getGenres.requested, (state) => ({
		...state,
		genres: initialState.genres,
		genresLoadingStatus: loadingStatus.loading,
	})),
	on(commonActions.getGenres.succeeded, (state, action) => ({
		...state,
		genres: action.payload,
		genresLoadingStatus: loadingStatus.loaded,
	})),
	on(commonActions.getGenres.failed, (state) => ({
		...state,
		genres: initialState.genres,
		genresLoadingStatus: loadingStatus.loaded,
	})),
	on(commonActions.getLanguages.requested, (state) => ({
		...state,
		languages: initialState.languages,
		languagesLoadingStatus: loadingStatus.loading,
	})),
	on(commonActions.getLanguages.succeeded, (state, action) => ({
		...state,
		languages: action.payload,
		languagesLoadingStatus: loadingStatus.loaded,
	})),
	on(commonActions.getLanguages.failed, (state) => ({
		...state,
		languages: initialState.languages,
		languagesLoadingStatus: loadingStatus.loaded,
	}))
);

export function commonReducer(state: CommonState | undefined, action: Action): CommonState {
	return reducer(state, action);
}
