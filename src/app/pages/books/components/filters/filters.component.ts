import {ChangeDetectionStrategy, Component, DestroyRef, OnInit, effect, inject, input, output} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {Filters, NoDataComponent} from '@shared';
import {debounceTime, distinctUntilChanged} from 'rxjs';

@Component({
	selector: 'filters',
	templateUrl: './filters.component.html',
	styleUrl: './filters.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [ReactiveFormsModule, MatSelectModule, MatButtonModule, NoDataComponent, MatSliderModule],
})
export class FiltersComponent implements OnInit {
	private readonly formBuilder = inject(FormBuilder);
	private readonly destroyRef = inject(DestroyRef);

	public readonly booksAuthors = input.required<string[]>();
	public readonly booksLanguages = input.required<string[]>();
	public readonly bookGenres = input.required<string[]>();
	public readonly booksCount = input.required<number>();
	public readonly maxPages = input.required<number>();

	protected readonly filterChanged = output<Filters>();

	protected readonly booksFilterForm = this.formBuilder.nonNullable.group({
		genre: this.formBuilder.nonNullable.control<string[]>([]),
		author: this.formBuilder.nonNullable.control<string[]>([]),
		language: this.formBuilder.nonNullable.control<string[]>([]),
		pages: this.formBuilder.nonNullable.group({
			min: this.formBuilder.nonNullable.control<number>(0),
			max: this.formBuilder.nonNullable.control<number>(0),
		}),
	});

	constructor() {
		effect(() => {
			this.booksFilterForm.controls.pages.controls.max.setValue(this.maxPages(), {
				emitEvent: false,
			});
		});
	}

	ngOnInit(): void {
		this.subscribeControls();
	}

	private subscribeControls(): void {
		this.booksFilterForm.valueChanges
			.pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
			.subscribe((value) => {
				this.filterChanged.emit(value as Filters);
			});
	}

	protected clear(): void {
		const initFilters: Filters = {
			author: [],
			genre: [],
			language: [],
			pages: {
				max: this.maxPages(),
				min: 0,
			},
		};

		this.filterChanged.emit(initFilters);

		this.booksFilterForm.reset(initFilters);
	}
}
