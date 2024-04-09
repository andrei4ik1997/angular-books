import {Component, OnInit, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppStore, ToolbarComponent} from '@shared';
import {authorsActions} from '@store/authors/actions';
import {commonActions} from '@store/common/actions';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, ToolbarComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
	private readonly store = inject<Store<AppStore>>(Store);

	ngOnInit(): void {
		this.store.dispatch(commonActions.initApp());
		this.store.dispatch(authorsActions.getAuthors.requested());
	}
}
