import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
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
import {AddNewAuthorModalData, Author, existingValueValidator} from '@shared';

@Component({
	selector: 'add-new-author',
	templateUrl: './add-new-author.component.html',
	styleUrl: './add-new-author.component.scss',
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
	],
})
export class AddNewAuthorComponent {
	private readonly matDialogRef = inject<MatDialogRef<AddNewAuthorComponent>>(MatDialogRef);
	private readonly matDialogData = inject<AddNewAuthorModalData>(MAT_DIALOG_DATA);
	private readonly formBuilder = inject(FormBuilder);

	protected readonly authorFormGroup = this.formBuilder.nonNullable.group({
		name: this.formBuilder.nonNullable.control('', [
			Validators.required,
			existingValueValidator(this.matDialogData.authors ?? [], 'name'),
		]),
	});

	protected close(): void {
		this.matDialogRef.close();
	}

	protected add(): void {
		const formValue = this.authorFormGroup.getRawValue();
		const newBook: Author = {
			...formValue,
			id: new Date().getTime(),
		};

		this.matDialogRef.close(newBook);
	}
}
