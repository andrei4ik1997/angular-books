import {Injectable, inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {mapActionsFn} from '@shared';
import {switchMap, tap} from 'rxjs';
import {ToastService} from '../../services/toast.service';
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

	private readonly addAuthor$ = createEffect(() =>
		this.actions$.pipe(
			ofType(authorsActions.addAuthor.requested),
			switchMap((action) =>
				this.authorsApiService.addAuthor(action.payload).pipe(mapActionsFn(authorsActions.addAuthor as any))
			)
		)
	);

	private readonly addAuthorSucceeded$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(authorsActions.addAuthor.succeeded),
				tap(() => {
					ToastService.success({
						message: 'Новый автор успешно добавлен',
					});
				})
			),
		{
			dispatch: false,
		}
	);

	private readonly addAuthorFailed$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(authorsActions.addAuthor.failed),
				tap(() => {
					ToastService.error({
						message: 'Автор не добавлен',
					});
				})
			),
		{
			dispatch: false,
		}
	);

	private readonly editAuthor$ = createEffect(() =>
		this.actions$.pipe(
			ofType(authorsActions.editAuthor.requested),
			switchMap((action) =>
				this.authorsApiService.editAuthor(action.payload).pipe(mapActionsFn(authorsActions.editAuthor as any))
			)
		)
	);

	private readonly editAuthorSucceeded$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(authorsActions.editAuthor.succeeded),
				tap(() => {
					ToastService.success({
						message: 'Aвтор успешно изменен',
					});
				})
			),
		{
			dispatch: false,
		}
	);

	private readonly editAuthorFailed$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(authorsActions.editAuthor.failed),
				tap(() => {
					ToastService.error({
						message: 'Автор не изменен',
					});
				})
			),
		{
			dispatch: false,
		}
	);
}
