import {Injectable, inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {mapActionsFn} from '@shared';
import {concatMap, switchMap} from 'rxjs';
import {commonActions} from './actions';
import {CommonApiService} from './api/common.api.service';

@Injectable()
export class CommonsEffects {
	private readonly actions$ = inject(Actions);
	private readonly commonApiService = inject(CommonApiService);

	private readonly initApp$ = createEffect(() =>
		this.actions$.pipe(
			ofType(commonActions.initApp),
			concatMap(() => [commonActions.getGenres.requested(), commonActions.getLanguages.requested()])
		)
	);

	private readonly getGenres$ = createEffect(() =>
		this.actions$.pipe(
			ofType(commonActions.getGenres.requested),
			switchMap(() => this.commonApiService.getGenres().pipe(mapActionsFn(commonActions.getGenres)))
		)
	);

	private readonly getLanguages$ = createEffect(() =>
		this.actions$.pipe(
			ofType(commonActions.getLanguages.requested),
			switchMap(() => this.commonApiService.getLanguages().pipe(mapActionsFn(commonActions.getLanguages)))
		)
	);
}
