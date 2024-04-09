import {Routes} from '@angular/router';
import {BOOK_ID_FIELD} from './entities/constants';

const bookRoutes: Routes = [
	{
		path: '',
		loadComponent: () => import('./components/book-wrapper/book-wrapper.component'),
		children: [
			{
				path: `:${BOOK_ID_FIELD}`,
				loadComponent: () => import('./components/book/book.container'),
			},
		],
	},
];

export default bookRoutes;
