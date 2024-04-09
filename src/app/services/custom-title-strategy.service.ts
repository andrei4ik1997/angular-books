import {Injectable, inject} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {RouterStateSnapshot, TitleStrategy} from '@angular/router';

@Injectable()
export class CustomTitleStrategyService extends TitleStrategy {
	private readonly title = inject(Title);

	private readonly projectTitle = 'BOOKS';

	public override updateTitle(routerState: RouterStateSnapshot): void {
		const pageTitle = this.buildTitle(routerState);

		this.title.setTitle(pageTitle ? pageTitle.toUpperCase() : this.projectTitle);
	}
}
