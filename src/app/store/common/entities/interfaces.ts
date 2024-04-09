import {LoadingStatus} from '@shared';

export interface CommonState {
	genres: string[];
	genresLoadingStatus: LoadingStatus;
	languages: string[];
	languagesLoadingStatus: LoadingStatus;
}
