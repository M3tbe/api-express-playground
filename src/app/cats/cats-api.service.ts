import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Cat, GetRandomCatResponse, ListTopCats, RateCatPayload, RateCatResponse} from './cat';
import {GET_CAT_LIST_URL, GET_RANDOM_CAT_URL, UPDATE_CAT_URL} from '../app.config';

@Injectable({
	providedIn: 'root'
})
export class CatsApiService {

	constructor(private http: HttpClient) {
	}

	getRandomCat$(): Observable<Cat> {
		return this.http.get<GetRandomCatResponse>(GET_RANDOM_CAT_URL);
	}

	postRateCat$(cat: RateCatPayload): Observable<RateCatResponse> {
		return this.http.post<RateCatResponse>(UPDATE_CAT_URL, cat, { responseType: 'json' });
	}

	getListTop$(): Observable<ListTopCats> {
		return this.http.get<ListTopCats>(GET_CAT_LIST_URL);
	}

}
