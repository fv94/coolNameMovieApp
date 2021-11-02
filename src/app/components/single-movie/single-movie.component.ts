import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.scss']
})
export class SingleMovieComponent implements OnInit {

  @Input() id: number;
  @Input() movieTitle: string;
  @Input() movieImage: string;
  @Input() rating: number;

  isInWatchLater = false;
  isInFavorites = false;

  constructor() { }

  ngOnInit(): void {
    this.checkWatchLater();
    this.checkFavorites();
  }

  checkWatchLater() {
    let watchLater = JSON.parse(localStorage.getItem('coolname-watchlater-movies'));
    this.isInWatchLater = watchLater?.map(movie => movie.id).includes(this.id);
  }

  checkFavorites() {
    let favorites = JSON.parse(localStorage.getItem('coolname-favorite-movies'));
    this.isInFavorites = favorites?.map(movie => movie.id).includes(this.id);
  }

  addToWatchLater () {
    let watchLater = JSON.parse(localStorage.getItem('coolname-watchlater-movies'));
    watchLater.push({ id: this.id, original_title: this.movieTitle, poster_path: this.movieImage, vote_average: this.rating });
    localStorage.setItem('coolname-watchlater-movies', JSON.stringify(watchLater));
    this.isInWatchLater = true
  }

  addToFavorites () {
    let favorites = JSON.parse(localStorage.getItem('coolname-favorite-movies'));
    favorites.push({id: this.id, original_title: this.movieTitle, poster_path: this.movieImage, vote_average: this.rating});
    localStorage.setItem('coolname-favorite-movies', JSON.stringify(favorites));
    this.isInFavorites = true;
  }

  removeFromFavorites () {
    let favorites = JSON.parse(localStorage.getItem('coolname-favorite-movies'));
    favorites = favorites.filter(movie => this.id !== movie);
    localStorage.setItem('coolname-favorite-movies', JSON.stringify(favorites));
    this.isInFavorites = false;
  }

}
