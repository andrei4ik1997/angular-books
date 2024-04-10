import {Routes} from '@angular/router';

const authorsRoutes: Routes = [
	{
		path: '',
		loadComponent: () => import('./authors.container'),
		title: 'Authors',
	},
];

export default authorsRoutes;
