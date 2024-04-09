import {Action, createReducer, on} from '@ngrx/store';
import {loadingStatus} from '@shared';
import {authorsActions} from './actions';
import {AuthorsState} from './entities/interfaces';

const initialState: AuthorsState = {
	authors: [],
	authorsLoadingStatus: loadingStatus.loading,
};

const reducer = createReducer(
	initialState,
	on(authorsActions.getAuthors.requested, (state) => ({
		...state,
		authors: initialState.authors,
		authorsLoadingStatus: loadingStatus.loading,
	})),
	on(authorsActions.getAuthors.succeeded, (state, action) => ({
		...state,
		authors: action.payload,
		authorsLoadingStatus: loadingStatus.loaded,
	})),
	on(authorsActions.getAuthors.failed, (state) => ({
		...state,
		authors: initialState.authors,
		authorsLoadingStatus: loadingStatus.loaded,
	}))
);

export function authorsReducer(state: AuthorsState | undefined, action: Action): AuthorsState {
	return reducer(state, action);
}
