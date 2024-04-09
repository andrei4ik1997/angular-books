import {Routes} from '@angular/router';
import {PageRoute} from '@shared';

export const APP_ROUTES: Routes = [
	{path: '', redirectTo: PageRoute.Books, pathMatch: 'full'},
	{path: PageRoute.Books, loadChildren: () => import('./pages/books/books.routes')},
	{path: PageRoute.Book, loadChildren: () => import('./pages/book/book.routes')},
	{path: PageRoute.NotFound, loadChildren: () => import('./pages/not-found/not-found.routes')},
	{
		path: '**',
		redirectTo: PageRoute.NotFound,
		pathMatch: 'full',
	},
];
