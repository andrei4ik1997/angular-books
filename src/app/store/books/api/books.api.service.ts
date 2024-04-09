import {HttpClient} from '@angular/common/http';
import {Injectable, inject} from '@angular/core';
import {Book, FIREBASE_API_URL} from '@shared';
import {Observable, map} from 'rxjs';

@Injectable()
export class BooksApiService {
	private readonly httpClient = inject(HttpClient);

	public getBooks(): Observable<Book[]> {
		return this.httpClient
			.get<Record<string, Book>>(`${FIREBASE_API_URL}/books.json`)
			.pipe(map((books) => Object.values(books) ?? []));
	}

	public addBook(payload: Book): Observable<Book> {
		return this.httpClient.put<Book>(`${FIREBASE_API_URL}/books/${payload.id}.json`, payload);
	}

	public getBook(bookId: number | null): Observable<Book> {
		return this.httpClient.get<Book>(`${FIREBASE_API_URL}/books/${bookId}.json`);
	}
}
