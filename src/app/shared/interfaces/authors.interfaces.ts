export interface Author {
	id: number;
	name: string;
}

export interface AddNewAuthorModalData {
	authors: Author[] | null;
}
