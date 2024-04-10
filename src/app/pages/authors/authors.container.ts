import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStore, Author} from '@shared';
import {authorsActions} from '@store/authors/actions';
import {authorsSelectors} from '@store/authors/selectors';
import {AuthorsComponent} from './authors.component';

@Component({
	selector: 'authors-container',
	template: `<authors
		[authors]="authors$ | async"
		[authorsLoadingStatus]="authorsLoadingStatus$ | async"
		(addNewAuthor)="addNewAuthor($event)"
		(editAuthor)="editAuthor($event)"
	/>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [AuthorsComponent, AsyncPipe],
})
export default class AuthorsContainer {
	private readonly store = inject<Store<AppStore>>(Store);

	protected readonly authors$ = this.store.select(authorsSelectors.authors.data);
	protected readonly authorsLoadingStatus$ = this.store.select(authorsSelectors.authors.loadingStatus);

	protected addNewAuthor(author: Author): void {
		this.store.dispatch(authorsActions.addAuthor.requested({payload: author}));
	}

	protected editAuthor(author: Author): void {
		this.store.dispatch(authorsActions.editAuthor.requested({payload: author}));
	}
}
