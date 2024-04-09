import {HttpClient} from '@angular/common/http';
import {Injectable, inject} from '@angular/core';
import {FIREBASE_API_URL} from '@shared';
import {Observable, map} from 'rxjs';

@Injectable()
export class AuthorsApiService {
	private readonly httpClient = inject(HttpClient);

	public getAuthors(): Observable<string[]> {
		return this.httpClient.get<string[]>(`${FIREBASE_API_URL}/authors.json`).pipe(map((authors) => authors ?? []));
	}
}
