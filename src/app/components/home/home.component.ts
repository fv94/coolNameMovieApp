import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import {Observable, of} from "rxjs";
import { debounceTime, map, startWith, switchMap, tap } from "rxjs/operators";
import { TmdbService } from "../../services/tmdb.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  readonly IMG_URL = 'https://image.tmdb.org/t/p/w500'

  search = new FormControl();
  activated: 'search' | 'favorites' | 'watchLater' = 'search';
  movies$: Observable<any[]>;
  favorites$: Observable<any[]> = of([]);
  watchLater$: Observable<any[]> = of([]);

  constructor(private tmbd: TmdbService) { }

  ngOnInit() {

    this.showSearch();

    if (!localStorage.getItem('coolname-favorite-movies')) {
      localStorage.setItem('coolname-favorite-movies', JSON.stringify([]));
    }

    if (!localStorage.getItem('coolname-watchlater-movies')) {
      localStorage.setItem('coolname-watchlater-movies', JSON.stringify([]));
    }
  }

  private movies = (): Observable<any[]> => this.tmbd.getMoviesByPopularity().pipe(map(data => data.results));

  private filter(val: any): Observable<any[]> {
    this.activated = 'search';
    return this.tmbd.searchMovies(val).pipe(map(data => data.results));
  }

  movieClicked(movie) {
    console.log(movie);
  }

  private showSearch() {
    this.movies$ = this.search.valueChanges
      .pipe(
        startWith(this.fillStartWith()),
        debounceTime(200),
        switchMap(term => term.length > 0 ? this.filter(term) : this.fillStartWith())
      );
  }

  showFavorites() {
    this.activated = this.activated !== 'favorites' ? 'favorites' : 'search';
    this.favorites$ = of(JSON.parse(localStorage.getItem('coolname-favorite-movies')));
    this.showSearch();
  }

  showWatchLater() {
    this.activated = this.activated !== 'watchLater' ? 'watchLater' : 'search';
    this.watchLater$ = of(JSON.parse(localStorage.getItem('coolname-watchlater-movies')));
    this.showSearch();
  }

  fillStartWith() {
    return this.activated === 'favorites' ? this.favorites$ : this.activated === 'watchLater' ? this.watchLater$ : this.movies();
  }

}
