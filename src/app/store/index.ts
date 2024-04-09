import {ApplicationConfig} from '@angular/core';
import {provideEffects} from '@ngrx/effects';
import {provideState} from '@ngrx/store';
import {AuthorsApiService} from './authors/api/authors.api.service';
import {AuthorsEffects} from './authors/effects';
import {AUTHORS_FEATURE_KEY} from './authors/entities/constants';
import {authorsReducer} from './authors/reducer';
import {BooksApiService} from './books/api/books.api.service';
import {BooksEffects} from './books/effects';
import {BOOKS_FEATURE_KEY} from './books/entities/constants';
import {booksReducer} from './books/reducer';
import {CommonApiService} from './common/api/common.api.service';
import {CommonsEffects} from './common/effects';
import {COMMON_FEATURE_KEY} from './common/entities/constants';
import {commonReducer} from './common/reducer';

export const storeConfig: ApplicationConfig = {
	providers: [
		provideState(BOOKS_FEATURE_KEY, booksReducer),
		provideState(COMMON_FEATURE_KEY, commonReducer),
		provideState(AUTHORS_FEATURE_KEY, authorsReducer),
		provideEffects([BooksEffects, CommonsEffects, AuthorsEffects]),
		BooksApiService,
		CommonApiService,
		AuthorsApiService,
	],
};
