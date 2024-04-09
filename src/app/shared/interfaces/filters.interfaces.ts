export interface Filters {
	author: string[];
	genre: string[];
	language: string[];
	pages: {
		max: number;
		min: number;
	};
}
