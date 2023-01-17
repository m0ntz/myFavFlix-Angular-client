import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        // Logic for a successful user login goes here!
        console.log('loginUser', result);
        localStorage.setItem('username', result.user.Username);
        localStorage.setItem('password', result.user.Password);
        localStorage.setItem('token', result.token);
        localStorage.setItem('email', result.user.Email);
        localStorage.setItem('birthday', result.user.Birthday);
        localStorage.setItem('favorites', result.user.favoriteMovies);

        this.dialogRef.close(); // This will close the modal on success!
        console.log(result);
        this.snackBar.open('Login successful', 'OK', {
          duration: 3000,
        });
        this.router.navigate(['movies']);
      },
      (result) => {
        console.log(result);
        this.snackBar.open('User not found', 'OK', {
          duration: 3000,
        });
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
