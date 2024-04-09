import {Routes} from '@angular/router';

const notFoundRoutes: Routes = [
	{
		path: '',
		loadComponent: () => import('./not-found.container'),
		title: 'Not Fond',
	},
];

export default notFoundRoutes;
