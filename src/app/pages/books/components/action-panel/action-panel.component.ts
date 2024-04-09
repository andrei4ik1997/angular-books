import {ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, input, output} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {AddNewBookModalData, Book, SORT_VALUES, Sort} from '@shared';
import {AddNewBookComponent} from '../add-new-book/add-new-book.component';

@Component({
	selector: 'action-panel',
	templateUrl: './action-panel.component.html',
	styleUrl: './action-panel.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [MatButtonModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule, MatInputModule],
})
export class ActionPanelComponent implements OnInit {
	private readonly formBuilder = inject(FormBuilder);
	private readonly matDialog = inject(MatDialog);
	private readonly destroyRef = inject(DestroyRef);

	public readonly disabled = input<boolean | undefined>(false);
	public readonly authors = input.required<string[]>();
	public readonly genre = input.required<string[]>();
	public readonly languages = input.required<string[]>();

	protected readonly addNewBook = output<Book>();
	protected readonly sortChanged = output<Sort | null>();
	protected readonly searchChanged = output<string>();

	protected readonly sortFormControl = this.formBuilder.control<Sort | null>(null);
	protected readonly searchFormControl = this.formBuilder.nonNullable.control('');

	protected readonly sortValues = SORT_VALUES;

	ngOnInit(): void {
		this.subscribeControls();
	}

	private subscribeControls(): void {
		this.sortFormControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
			this.sortChanged.emit(value);
		});

		this.searchFormControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
			this.searchChanged.emit(value);
		});
	}

	protected openAddNewbookDialog(): void {
		const modalData: AddNewBookModalData = {
			authors: this.authors(),
			genre: this.genre(),
			languages: this.languages(),
		};

		const dialogRef = this.matDialog.open<AddNewBookComponent, AddNewBookModalData, Book>(AddNewBookComponent, {
			autoFocus: false,
			width: '60vw',
			data: modalData,
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.addNewBook.emit(result);
			}
		});
	}
}
