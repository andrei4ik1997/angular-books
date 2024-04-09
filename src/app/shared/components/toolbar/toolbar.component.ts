import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {PageRoute} from '../../enums';

@Component({
	selector: 'toolbar',
	templateUrl: './toolbar.component.html',
	styleUrl: './toolbar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [MatToolbarModule, RouterLink, RouterLinkActive],
})
export class ToolbarComponent {
	protected readonly pageRoute = PageRoute;
}
