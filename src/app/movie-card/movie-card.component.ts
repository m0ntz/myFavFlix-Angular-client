import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];
  FavoriteMovies: any[] = [];
  allMovies: any[] = [];

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  //All Movies
  /**
   * Fetch movies via API and set movies state to returned JSON file
   * @returns array holding movies objects
   * @function getMovies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((result: any) => {
      this.movies = result;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Adds a movie to a user's favorites via an API call
   * @param {string} movieId
   * @function addToFavorite
   */
  addToFavorite(movieId: string): void {
    this.fetchApiData.addFavoriteMovie(movieId).subscribe((result: any) => {
      this.getFavoriteMovies();
    });
  }

  /**
   * Removes a movie from a user's favorites via an API call
   * @param {string} movieId
   * @function removeFromFavorite
   */
  removeFromFavorite(movieId: string): void {
    this.fetchApiData.removeFavoriteMovie(movieId).subscribe((result: any) => {
      this.getFavoriteMovies();
    });
  }

  /**
   * Checks if a movie is included in a user's favorite movies
   * @param {string} movieId
   * @returns boolean
   * @function movieIsFavorite
   */
  movieIsFavorite(movieId: string): boolean {
    return this.FavoriteMovies.includes(movieId);
  }

  /**
   * Marks a movie as favorite or removes it as favorite
   * @param {string} movieId
   * @returns boolean
   * @function toggleFavorite
   */
  toggleFavorite(movieId: string): void {
    if (this.movieIsFavorite(movieId)) {
      this.removeFromFavorite(movieId);
    } else {
      this.addToFavorite(movieId);
    }
  }

  /**
   * Fetch user info via API and set favorites state to returned JSON file
   * @returns array holding IDs of favorites
   * @function getFavorites
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((result: any) => {
      this.FavoriteMovies = result.FavoriteMovies;
      console.log(this.FavoriteMovies);
    });
  }

  //Genre

  /**
   * Opens genre information from GenreComponent
   * @param {string} movie
   * @function openGenre
   */
  openGenre(movie: any): void {
    const { Name, Description } = movie.Genre;
    this.dialog.open(GenreComponent, {
      data: { Name, Description },
      panelClass: 'genre-dialog-background',
      width: '400px',
    });
  }

  //Director
  /**
   * Opens director information from DirectorComponent
   * @param {string} movie
   * @function openDirector
   */
  openDirector(movie: any): void {
    const { Name, Birth, Bio } = movie.Director;
    this.dialog.open(DirectorComponent, {
      data: { Name, Birth, Bio },
      panelClass: 'director-dialog-background',
      width: '400px',
    });
  }

  //Open Movie Details aka Description
  /**
   * Opens movie details from MovieDetailsComponent
   * @param {string}movie
   * @function openMovieDetails
   */
  openMovieDetails(movie: any): void {
    const { Title, Description } = movie;
    this.dialog.open(MovieDetailsComponent, {
      data: { Title, Description },
      panelClass: 'synopsis-dialog-background',
      width: '400px',
    });
  }
}
