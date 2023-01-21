import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user = localStorage.getItem('username');
  constructor(public router: Router) {}

  ngOnInit(): void {}

  /**
   * Navigates to movies page
   * @function goToMovies
   */
  goToMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Navigates to user profile
   * @function goToProfile
   */
  goToProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * logs out user, clears localStorage
   * @function logOut
   */
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}
