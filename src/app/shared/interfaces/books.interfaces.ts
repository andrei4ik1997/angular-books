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
	authors: string[];
	genre: string[];
	languages: string[];
}
