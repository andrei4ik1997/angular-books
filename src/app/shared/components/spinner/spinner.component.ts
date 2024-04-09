import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
	selector: 'spinner',
	templateUrl: './spinner.component.html',
	styleUrl: './spinner.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [MatProgressSpinnerModule],
})
export class SpinnerComponent {}
