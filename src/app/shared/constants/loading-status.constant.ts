import {LoadingStatuses} from '../interfaces';

export const loadingStatus: LoadingStatuses = {
	default: {loading: false, loaded: false, error: null},
	loading: {loading: true, loaded: false, error: null},
	loaded: {loading: false, loaded: true, error: null},
};
