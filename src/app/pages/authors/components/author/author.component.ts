import {ChangeDetectionStrategy, Component, effect, inject, input, output, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {Author, existingValueValidator} from '@shared';

@Component({
	selector: 'author',
	templateUrl: './author.component.html',
	styleUrl: './author.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [MatIconModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
})
export class AuthorComponent {
	private readonly formBuilder = inject(FormBuilder);

	public readonly author = input.required<Author>();
	public readonly authors = input.required<Author[] | null>();

	protected readonly editAuthor = output<Author>();

	protected readonly isEditMode = signal(false);

	protected readonly authorNameFormControl = this.formBuilder.nonNullable.control('', [Validators.required]);

	constructor() {
		effect(() => {
			this.authorNameFormControl.addValidators(existingValueValidator(this.authors() ?? [], 'name'));
		});
	}

	protected changeEditMode(isEditMode: boolean): void {
		if (!isEditMode && this.authorNameFormControl.valid) {
			const newAuthor: Author = {
				...this.author(),
				name: this.authorNameFormControl.value,
			};
			this.editAuthor.emit(newAuthor);
		}

		this.isEditMode.set(isEditMode);

		this.authorNameFormControl.setValue(isEditMode ? this.author().name : '', {emitEvent: false});
	}
}
