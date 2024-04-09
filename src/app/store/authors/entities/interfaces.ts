import {LoadingStatus} from '@shared';

export interface AuthorsState {
	authors: string[];
	authorsLoadingStatus: LoadingStatus;
}
