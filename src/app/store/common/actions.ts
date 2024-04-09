import {createAction, props} from '@ngrx/store';
import {getActionDescription, getApiActions} from '@shared';
import {COMMON_FEATURE_KEY} from './entities/constants';

const actionDescription = (description: string) => getActionDescription(COMMON_FEATURE_KEY.toUpperCase(), description);

export const commonActions = {
	initApp: createAction(actionDescription('Init App')),
	getGenres: getApiActions(COMMON_FEATURE_KEY.toUpperCase(), 'Get genres', props<{payload: string[]}>()),
	getLanguages: getApiActions(COMMON_FEATURE_KEY.toUpperCase(), 'Get languages', props<{payload: string[]}>()),
};
