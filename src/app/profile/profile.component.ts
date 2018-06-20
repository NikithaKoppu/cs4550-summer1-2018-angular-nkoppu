import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from "../models/user.model.client";
import {UserServiceClient} from "../services/user.service.client";
import {SectionServiceClient} from '../services/section.service.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserServiceClient,
              private sectionService: SectionServiceClient,
              private router: Router) { }
  user: User = new User();
  courses = [];
  sections = [];
  update(user: User) {
    console.log(user);
  }
  logout() {
    this.userService.logout()
      .then(() => this.router.navigate(['login']));
  }
  unenroll(section) {
      this.sectionService
        .unenrollStudentInSection(section._id)
        .then(() => {
          this.router.navigate(['profile']);
        });
  }
  ngOnInit() {
    this.userService
      .profile()
      .then(user => this.user = user);

    this.sectionService
      .findSectionsForStudent()
      .then(sections => this.sections = sections );
  }

}
