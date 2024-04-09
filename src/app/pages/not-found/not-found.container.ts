import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NotFoundComponent} from './not-found.component';

@Component({
	selector: 'not-found-container',
	template: '<not-found />',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [NotFoundComponent],
})
export default class NotFoundContainer {}
