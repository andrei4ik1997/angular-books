import {ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {
	MAT_DIALOG_DATA,
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogRef,
	MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {AddNewBookModalData, Book} from '@shared';

@Component({
	selector: 'add-new-book',
	templateUrl: './add-new-book.component.html',
	styleUrl: './add-new-book.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatDialogTitle,
		MatDialogContent,
		MatDialogActions,
		MatDialogClose,
		ReactiveFormsModule,
		MatSelectModule,
		MatAutocompleteModule,
	],
})
export class AddNewBookComponent implements OnInit {
	private readonly matDialogRef = inject<MatDialogRef<AddNewBookComponent>>(MatDialogRef);
	protected readonly matDialogData = inject<AddNewBookModalData>(MAT_DIALOG_DATA);
	private readonly formBuilder = inject(FormBuilder);
	private readonly destroyRef = inject(DestroyRef);

	protected readonly bookFormGroup = this.formBuilder.nonNullable.group({
		author: this.formBuilder.nonNullable.control('', Validators.required),
		description: this.formBuilder.nonNullable.control('', Validators.required),
		genre: this.formBuilder.nonNullable.control('', Validators.required),
		language: this.formBuilder.nonNullable.control('', Validators.required),
		pages: this.formBuilder.nonNullable.control(0, [Validators.required, Validators.min(0)]),
		title: this.formBuilder.nonNullable.control('', Validators.required),
	});

	protected readonly filteredGenres = signal(this.matDialogData.genre);
	protected readonly filteredLanguages = signal(this.matDialogData.languages);

	ngOnInit(): void {
		this.subscribeFormControls();
	}

	private subscribeFormControls(): void {
		this.bookFormGroup.controls.genre.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
			const filterValue = (value ?? '').trim().toLowerCase();
			this.filteredGenres.set(
				this.matDialogData.genre.filter((genre) => genre.toLowerCase().includes(filterValue))
			);
		});

		this.bookFormGroup.controls.language.valueChanges
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((value) => {
				const filterValue = (value ?? '').trim().toLowerCase();
				this.filteredLanguages.set(
					this.matDialogData.languages.filter((language) => language.toLowerCase().includes(filterValue))
				);
			});
	}

	protected close(): void {
		this.matDialogRef.close();
	}

	protected add(): void {
		const formValue = this.bookFormGroup.getRawValue();
		const newBook: Book = {
			...formValue,
			id: new Date().getTime(),
		};

		this.matDialogRef.close(newBook);
	}
}
