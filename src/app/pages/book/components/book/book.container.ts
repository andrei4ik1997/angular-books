import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject, input, numberAttribute} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStore} from '@shared';
import {booksActions} from '@store/books/actions';
import {booksSelectors} from '@store/books/selectors';
import {BookComponent} from './book.component';

@Component({
	selector: 'book-container',
	template: '<book [book]="book$ | async" [bookLoadingStatus]="bookLoadingStatus$ | async" />',
	styleUrl: './book.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [BookComponent, AsyncPipe],
})
export default class BookContainer implements OnInit, OnDestroy {
	private readonly store = inject<Store<AppStore>>(Store);

	public readonly bookId = input(null, {alias: 'bookID', transform: numberAttribute});

	protected readonly book$ = this.store.select(booksSelectors.book.data);
	protected readonly bookLoadingStatus$ = this.store.select(booksSelectors.book.loadingStatus);

	ngOnInit(): void {
		this.store.dispatch(booksActions.getBook.requested({payload: this.bookId() ?? null}));
	}

	ngOnDestroy(): void {
		this.store.dispatch(booksActions.destroyPage());
	}
}
