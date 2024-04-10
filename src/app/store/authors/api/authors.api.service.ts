import {HttpClient} from '@angular/common/http';
import {Injectable, inject} from '@angular/core';
import {Author, FIREBASE_API_URL} from '@shared';
import {Observable, map} from 'rxjs';

@Injectable()
export class AuthorsApiService {
	private readonly httpClient = inject(HttpClient);

	private readonly restPath = 'authors';

	public getAuthors(): Observable<Author[]> {
		return this.httpClient
			.get<Record<string, Author>>(`${FIREBASE_API_URL}/${this.restPath}.json`)
			.pipe(map((authors) => Object.values(authors) ?? []));
	}

	public addAuthor(payload: Author): Observable<Author> {
		return this.httpClient.put<Author>(`${FIREBASE_API_URL}/${this.restPath}/${payload.id}.json`, payload);
	}

	public editAuthor(payload: Author): Observable<Author> {
		return this.httpClient.patch<Author>(`${FIREBASE_API_URL}/${this.restPath}/${payload.id}.json`, payload);
	}
}
