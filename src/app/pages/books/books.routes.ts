import {Routes} from '@angular/router';

const booksRoutes: Routes = [
	{
		path: '',
		loadComponent: () => import('./books.container'),
		title: 'Books',
	},
];

export default booksRoutes;
