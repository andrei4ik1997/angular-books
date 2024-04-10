import {ChangeDetectionStrategy, Component, inject, input, output} from '@angular/core';
import {Router} from '@angular/router';
import {Author, Book, Filters, LoadingStatus, NoDataComponent, PageRoute, Sort, SpinnerComponent} from '@shared';
import {ActionPanelComponent} from './components/action-panel/action-panel.component';
import {BookComponent} from './components/book/book.component';
import {FiltersComponent} from './components/filters/filters.component';

@Component({
	selector: 'books',
	templateUrl: './books.component.html',
	styleUrl: './books.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [FiltersComponent, BookComponent, SpinnerComponent, NoDataComponent, ActionPanelComponent],
})
export class BooksComponent {
	private readonly router = inject(Router);

	public readonly books = input.required<Book[] | null>();
	public readonly booksLoadingStatus = input.required<LoadingStatus | null>();
	public readonly booksAuthors = input.required<string[]>();
	public readonly booksLanguages = input.required<string[]>();
	public readonly bookGenres = input.required<string[]>();
	public readonly maxPages = input.required<number>();
	public readonly authors = input.required<Author[]>();
	public readonly genre = input.required<string[]>();
	public readonly languages = input.required<string[]>();

	protected readonly addNewBook = output<Book>();
	protected readonly sortChanged = output<Sort | null>();
	protected readonly filterChanged = output<Filters>();
	protected readonly searchChanged = output<string>();

	protected openBook(book: Book): void {
		this.router.navigateByUrl(`${PageRoute.Book}/${book.id}`).catch(() => {});
	}
}
