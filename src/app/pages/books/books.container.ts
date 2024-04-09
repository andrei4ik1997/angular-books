import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStore, Book, Filters, Sort} from '@shared';
import {authorsSelectors} from '@store/authors/selectors';
import {booksActions} from '@store/books/actions';
import {booksSelectors} from '@store/books/selectors';
import {commonSelectors} from '@store/common/selectors';
import {BooksComponent} from './books.component';

@Component({
	selector: 'books-container',
	template: `<books
		[books]="books$ | async"
		[booksLoadingStatus]="booksLoadingStatus$ | async"
		[booksAuthors]="(booksAuthors$ | async)!"
		[booksLanguages]="(booksLanguages$ | async)!"
		[bookGenres]="(bookGenres$ | async)!"
		[maxPages]="(maxPages$ | async)!"
		[authors]="(authors$ | async)!"
		[genre]="(genre$ | async)!"
		[languages]="(languages$ | async)!"
		(addNewBook)="addNewBook($event)"
		(sortChanged)="sortChanged($event)"
		(filterChanged)="filterChanged($event)"
		(searchChanged)="searchChanged($event)"
	/>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [BooksComponent, AsyncPipe],
})
export default class BooksContainer implements OnInit, OnDestroy {
	private readonly store = inject<Store<AppStore>>(Store);

	protected readonly books$ = this.store.select(booksSelectors.books.filteredAndSorted);
	protected readonly booksLoadingStatus$ = this.store.select(booksSelectors.books.loadingStatus);
	protected readonly booksAuthors$ = this.store.select(booksSelectors.filterData.authors);
	protected readonly booksLanguages$ = this.store.select(booksSelectors.filterData.languages);
	protected readonly bookGenres$ = this.store.select(booksSelectors.filterData.genres);
	protected readonly maxPages$ = this.store.select(booksSelectors.filterData.maxPages);
	protected readonly authors$ = this.store.select(authorsSelectors.authors.data);
	protected readonly genre$ = this.store.select(commonSelectors.genres.data);
	protected readonly languages$ = this.store.select(commonSelectors.languages.data);

	ngOnInit(): void {
		this.store.dispatch(booksActions.getBooks.requested());
	}

	protected addNewBook(book: Book): void {
		this.store.dispatch(booksActions.addBook.requested({payload: book}));
	}

	protected sortChanged(sortField: Sort | null): void {
		this.store.dispatch(booksActions.setSort({payload: sortField}));
	}

	protected filterChanged(filter: Filters): void {
		this.store.dispatch(booksActions.changeFilter({payload: filter}));
	}

	protected searchChanged(searchQuery: string): void {
		this.store.dispatch(booksActions.setSearchQuery({payload: searchQuery}));
	}

	ngOnDestroy(): void {
		this.store.dispatch(booksActions.destroyPage());
	}
}
