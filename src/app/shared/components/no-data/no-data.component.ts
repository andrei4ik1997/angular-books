import {ChangeDetectionStrategy, Component, input} from '@angular/core';

@Component({
	selector: 'no-data',
	templateUrl: './no-data.component.html',
	styleUrl: './no-data.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [],
})
export class NoDataComponent {
	public readonly size = input<'xs' | 's' | 'm' | 'l' | 'xl'>('xl');
}
