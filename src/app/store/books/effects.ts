import {Injectable, inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ToastService} from '@services';
import {mapActionsFn} from '@shared';
import {switchMap, tap} from 'rxjs';
import {booksActions} from './actions';
import {BooksApiService} from './api/books.api.service';

@Injectable()
export class BooksEffects {
	private readonly actions$ = inject(Actions);
	private readonly booksApiService = inject(BooksApiService);

	private readonly getBooks$ = createEffect(() =>
		this.actions$.pipe(
			ofType(booksActions.getBooks.requested),
			switchMap(() => this.booksApiService.getBooks().pipe(mapActionsFn(booksActions.getBooks)))
		)
	);

	private readonly addBook$ = createEffect(() =>
		this.actions$.pipe(
			ofType(booksActions.addBook.requested),
			switchMap((action) =>
				this.booksApiService.addBook(action.payload).pipe(mapActionsFn(booksActions.addBook as any))
			)
		)
	);

	private readonly addBookSucceeded$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(booksActions.addBook.succeeded),
				tap(() => {
					ToastService.success({
						message: 'New book has been successfully added',
					});
				})
			),
		{
			dispatch: false,
		}
	);

	private readonly addBookFailed$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(booksActions.addBook.failed),
				tap(() => {
					ToastService.error({
						message: 'New book has not been added',
					});
				})
			),
		{
			dispatch: false,
		}
	);

	private readonly getBook$ = createEffect(() =>
		this.actions$.pipe(
			ofType(booksActions.getBook.requested),
			switchMap((action) =>
				this.booksApiService.getBook(action.payload).pipe(mapActionsFn(booksActions.getBook as any))
			)
		)
	);
}
