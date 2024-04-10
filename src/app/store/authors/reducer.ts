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
	})),
	on(authorsActions.addAuthor.succeeded, (state, payload) => ({
		...state,
		authors: state.authors.concat(payload.payload),
	})),
	on(authorsActions.editAuthor.succeeded, (state, payload) => {
		const copyAuthors = state.authors.slice();
		const modifiedAuthorIndex = copyAuthors.findIndex((author) => author.id === payload.payload.id);

		if (modifiedAuthorIndex > -1) {
			copyAuthors[modifiedAuthorIndex] = payload.payload;
		}

		return {
			...state,
			authors: copyAuthors,
		};
	})
);

export function authorsReducer(state: AuthorsState | undefined, action: Action): AuthorsState {
	return reducer(state, action);
}
