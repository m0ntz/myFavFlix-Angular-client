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
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((result: any) => {
      this.movies = result;
      console.log(this.movies);
      return this.movies;
    });
  }

  addToFavorite(movieId: string): void {
    this.fetchApiData.addFavoriteMovie(movieId).subscribe((result: any) => {
      this.getFavoriteMovies();
    });
  }

  removeFromFavorite(movieId: string): void {
    this.fetchApiData.removeFavoriteMovie(movieId).subscribe((result: any) => {
      this.getFavoriteMovies();
    });
  }

  movieIsFavorite(movieId: string): boolean {
    return this.FavoriteMovies.includes(movieId);
  }

  toggleFavorite(movieId: string): void {
    if (this.movieIsFavorite(movieId)) {
      this.removeFromFavorite(movieId);
    } else {
      this.addToFavorite(movieId);
    }
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((result: any) => {
      this.FavoriteMovies = result.FavoriteMovies;
      console.log(this.FavoriteMovies);
    });
  }

  //Genre
  openGenre(movie: any): void {
    const { Name, Description } = movie.Genre;
    this.dialog.open(GenreComponent, {
      data: { Name, Description },
      panelClass: 'genre-dialog-background',
      width: '400px',
    });
  }

  //Director
  openDirector(movie: any): void {
    const { Name, Birth, Bio } = movie.Director;
    this.dialog.open(DirectorComponent, {
      data: { Name, Birth, Bio },
      panelClass: 'director-dialog-background',
      width: '400px',
    });
  }

  //Open Movie Details aka Description
  openMovieDetails(movie: any): void {
    const { Title, Description } = movie;
    this.dialog.open(MovieDetailsComponent, {
      data: { Title, Description },
      panelClass: 'synopsis-dialog-background',
      width: '400px',
    });
  }
}
