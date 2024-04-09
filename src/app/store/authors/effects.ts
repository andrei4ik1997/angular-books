import {Injectable, inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {mapActionsFn} from '@shared';
import {switchMap} from 'rxjs';
import {authorsActions} from './actions';
import {AuthorsApiService} from './api/authors.api.service';

@Injectable()
export class AuthorsEffects {
	private readonly actions$ = inject(Actions);
	private readonly authorsApiService = inject(AuthorsApiService);

	private readonly getAuthors$ = createEffect(() =>
		this.actions$.pipe(
			ofType(authorsActions.getAuthors.requested),
			switchMap(() => this.authorsApiService.getAuthors().pipe(mapActionsFn(authorsActions.getAuthors)))
		)
	);
}
