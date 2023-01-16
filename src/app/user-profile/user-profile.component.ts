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
  user = localStorage.getItem('username');
  email = localStorage.getItem('email');
  birthday = localStorage.getItem('birthday');

  // initialInput: any = {};
  @Input() updatedUser = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.fetchApiData.getUser().subscribe((result: any) => {
      this.user = {
        ...result,
        Birthday: new Date(result.Birthday).toLocaleDateString(),
      };
      //console.log('getUserInfo():', this.user);
      return this.user;
    });
  }

  // getUserInfo(): void {
  //   this.fetchApiData.getUser().subscribe((resp: any) => {
  //     this.user = resp;
  //     this.updatedUser.Username = this.user.Username;
  //     this.updatedUser.Email = this.user.Email;
  //     this.updatedUser.Birthday = this.user.Birthday;
  //   });
  // }

  //Update user info
  updateUserInfo(): void {
    this.fetchApiData.editUser(this.updatedUser).subscribe((result) => {
      console.log(result);
      localStorage.setItem('username', this.updatedUser.Username);
      localStorage.setItem('email', this.updatedUser.Email);
      localStorage.setItem('birthday', this.updatedUser.Birthday);
      setTimeout(() => {
        location.reload();
      }, 3500);
      this.snackBar.open('Profile updated!', 'OK', {
        duration: 4000,
      });
    });
  }
  //       localStorage.setItem('username', result.Username);
  //       this.snackBar.open('Your profile is updated successfully!', 'OK', {
  //         duration: 4000,
  //       });
  //       window.location.reload();
  //     },
  //     (result) => {
  //       //Error response
  //       //console.log('onUserUpdate() response2:', response);
  //       this.snackBar.open(result.errors[0].msg, 'OK', {
  //         duration: 6000,
  //       });
  //     }
  //   );
  // }

  //     console.log(result);
  //     this.snackBar.open('User profile successfully updated', 'OK', {
  //       duration: 2000,
  //     });
  //     if (this.user.Username !== result.Username) {
  //       localStorage.clear();
  //       this.router.navigate(['welcome']);
  //       this.snackBar.open(
  //         'User profile successfully updated. Please login using your new credentials',
  //         'OK',
  //         {
  //           duration: 2000,
  //         }
  //       );
  //     }
  //   });
  // }

  //Delete user account
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
