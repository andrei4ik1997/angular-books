import {ChangeDetectionStrategy, Component, inject, input, output} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {AddNewAuthorModalData, Author, LoadingStatus, NoDataComponent, SpinnerComponent} from '@shared';
import {AddNewAuthorComponent} from './components/add-new-author/add-new-author.component';
import {AuthorComponent} from './components/author/author.component';

@Component({
	selector: 'authors',
	templateUrl: './authors.component.html',
	styleUrl: './authors.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [SpinnerComponent, NoDataComponent, AuthorComponent, MatButtonModule],
})
export class AuthorsComponent {
	private readonly matDialog = inject(MatDialog);

	public readonly authors = input.required<Author[] | null>();
	public readonly authorsLoadingStatus = input.required<LoadingStatus | null>();

	protected readonly addNewAuthor = output<Author>();
	protected readonly editAuthor = output<Author>();

	protected openAddNewAuthorDialog(): void {
		const modalData: AddNewAuthorModalData = {
			authors: this.authors(),
		};

		const dialogRef = this.matDialog.open<AddNewAuthorComponent, AddNewAuthorModalData, Author>(
			AddNewAuthorComponent,
			{
				autoFocus: false,
				width: '40vw',
				data: modalData,
			}
		);

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.addNewAuthor.emit(result);
			}
		});
	}
}
