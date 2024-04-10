import {Author} from './authors.interfaces';

export interface Book {
	author: string;
	description: string;
	genre: string;
	id: number;
	language: string;
	pages: number;
	title: string;
}

export interface AddNewBookModalData {
	authors: Author[];
	genre: string[];
	languages: string[];
}
