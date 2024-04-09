import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
	selector: 'book-wrapper',
	templateUrl: './book-wrapper.component.html',
	styleUrl: './book-wrapper.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [RouterOutlet],
})
export default class BookWrapperComponent {}
