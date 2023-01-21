import { Component, Input, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  initialInput: any = {};

  /**
   * Fetch user data via localStorage
   * @returns object with user information
   */
  user = localStorage.getItem('username');
  email = localStorage.getItem('email');
  birthday = localStorage.getItem('birthday');

  // initialInput: any = {};
  @Input() updatedUser = {
    Username: '',
    Email: '',
    Birthday: '',
  };

  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  //Update user info
  /**
   * Update user data, such as username, password, email, or birthday
   * @function updateUserInfo
   */
  updateUserInfo(): void {
    this.fetchApiData.editUser(this.updatedUser).subscribe((result) => {
      console.log(result);
      localStorage.setItem('username', this.updatedUser.Username);
      localStorage.setItem('email', this.updatedUser.Email);
      localStorage.setItem('birthday', this.updatedUser.Birthday);
      setTimeout(() => {
        location.reload();
      }, 3500);
      this.snackBar.open('Profile updated successfully', 'OK', {
        duration: 4000,
      });
    });
  }

  //Delete user account
  /**
   * Delete user data for the user that is logged in
   * @function deleteAccount
   */
  deleteAccount(): void {
    if (
      confirm(
        'Are you sure you want to delete your account? This action cannnot be undone'
      )
    ) {
      this.router.navigate(['welcome']).then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.snackBar.open('You have successfully deleted your account', 'OK', {
          duration: 2000,
        });
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }
}
