import {HttpClient} from '@angular/common/http';
import {Injectable, inject} from '@angular/core';
import {FIREBASE_API_URL, GENRES, LANGUAGES} from '@shared';
import {Observable, map} from 'rxjs';

@Injectable()
export class CommonApiService {
	private readonly httpClient = inject(HttpClient);

	public getLanguages(): Observable<string[]> {
		return this.httpClient
			.get<string[]>(`${FIREBASE_API_URL}/languages.json`)
			.pipe(map((languages) => languages ?? LANGUAGES));
	}

	public getGenres(): Observable<string[]> {
		return this.httpClient.get<string[]>(`${FIREBASE_API_URL}/genres.json`).pipe(map((genres) => genres ?? GENRES));
	}
}
