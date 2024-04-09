import {Sort} from '../interfaces';

export const SORT_VALUES: Sort[] = [
	{
		field: 'pages',
		viewValue: 'Кол-во страниц ↑',
		direction: 'ASC',
	},
	{
		field: 'pages',
		viewValue: 'Кол-во страниц ↓',
		direction: 'DESC',
	},
	{field: 'title', viewValue: 'Название ↑', direction: 'ASC'},
	{field: 'title', viewValue: 'Название ↓', direction: 'DESC'},
];
