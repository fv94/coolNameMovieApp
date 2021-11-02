import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  readonly API_KEY = 'fde90b3943c3c2bfea94f8fed465d512';
  readonly BASE_URL = 'https://api.themoviedb.org/3';
  readonly API_POPULAR_MOVIES = `${this.BASE_URL}/discover/movie`;
  readonly API_SEARCH_MOVIES = `${this.BASE_URL}/search/movie`;

  constructor(private _httpClient: HttpClient) { }

  getMoviesByPopularity(): Observable<any> {
    const params = new HttpParams()
      .append('api_key', this.API_KEY)
      .append('sort_by', 'popularity.desc');
    return this._httpClient.get(this.API_POPULAR_MOVIES, { params });
  };

  searchMovies(term: string): Observable<any> {
    const params = new HttpParams()
      .append('api_key', this.API_KEY)
      .append('query', term)
      .append('page', 1);
    return this._httpClient.get(this.API_SEARCH_MOVIES, { params });
  };
}
