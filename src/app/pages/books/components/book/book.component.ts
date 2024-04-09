import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {Book, NoDataComponent} from '@shared';

@Component({
	selector: 'book',
	templateUrl: './book.component.html',
	styleUrl: './book.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [MatCardModule, NoDataComponent],
})
export class BookComponent {
	public readonly book = input.required<Book>();
}
