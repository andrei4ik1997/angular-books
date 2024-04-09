import {props} from '@ngrx/store';
import {getApiActions} from '@shared';
import {AUTHORS_FEATURE_KEY} from './entities/constants';

export const authorsActions = {
	getAuthors: getApiActions(AUTHORS_FEATURE_KEY.toUpperCase(), 'Get authors', props<{payload: string[]}>()),
};
