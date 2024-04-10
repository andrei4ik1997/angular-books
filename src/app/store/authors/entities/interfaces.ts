import {Author, LoadingStatus} from '@shared';

export interface AuthorsState {
	authors: Author[];
	authorsLoadingStatus: LoadingStatus;
}
