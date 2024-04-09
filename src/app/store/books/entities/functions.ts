import {Book, Filters, Sort} from '@shared';

export function sortBooks(books: Book[], sort: Sort): Book[] {
	const collator = new Intl.Collator('US', {numeric: true});
	const isASC = sort.direction === 'ASC';

	return books
		.slice()
		.sort((a, b) =>
			isASC
				? collator.compare(String(a[sort.field as keyof Book]), String(b[sort.field as keyof Book]))
				: collator.compare(String(b[sort.field as keyof Book]), String(a[sort.field as keyof Book]))
		);
}

export function filterBooks(books: Book[], filter: Filters | null, searchQuery: string): Book[] {
	const searchValue = searchQuery.toLowerCase().trim();

	if (!filter && !searchValue) {
		return books;
	}

	const filteredBySearchQuery = searchValue
		? books.filter(
				(book) =>
					book.title.toLowerCase().includes(searchValue) ||
					book.description.toLowerCase().includes(searchValue)
			)
		: books;

	const filteredByAuthor = filteredBySearchQuery.filter((book) => {
		if (filter?.author?.length) {
			return filter.author.includes(book.author);
		}
		return true;
	});

	const filteredByLanguage = filteredByAuthor.filter((book) => {
		if (filter?.language?.length) {
			return filter.language.includes(book.language);
		}
		return true;
	});

	const filteredByGenre = filteredByLanguage.filter((book) => {
		if (filter?.genre?.length) {
			return filter.genre.includes(book.genre);
		}
		return true;
	});

	const filteredByPages = filteredByGenre.filter((book) => {
		const min = filter?.pages?.min;
		const max = filter?.pages?.max;

		if (min !== undefined && max !== undefined) {
			return book.pages >= min && book.pages <= max;
		}
		return true;
	});

	return filteredByPages;
}

export function getUniqValues<T = string>(books: Book[], field: string): T[] {
	return ([...new Set(books.map((book) => book[field as keyof Book]))] as T[]).sort();
}
