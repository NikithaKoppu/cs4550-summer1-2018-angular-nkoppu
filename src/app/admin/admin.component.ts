import { Component, OnInit } from '@angular/core';
import AdminServiceClient from '../services/admin.service.client';
import {CourseServiceClient} from '../services/course.service.client';
import {Course} from '../models/course.model.client';
import {SectionServiceClient} from '../services/section.service.client';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  courses: Course[] = [];
  constructor(private adminService: AdminServiceClient,
              private courseService: CourseServiceClient,
              private sectionService: SectionServiceClient) { }

  sections = [];
  sectionName = '';
  seats = '';
  courseId = '';
  selectCourse(courseId) {
    this.loadSections(courseId);
  }
  loadSections(courseId) {
    this.courseId = courseId;
    this.sectionService
      .findSectionsForCourse(courseId)
      .then(sections => this.sections = sections);
  }
  createSection(sectionName, seats) {
    this.sectionService
      .createSection(this.courseId, sectionName, seats)
      .then(() => {
        this.loadSections(this.courseId);
      });
  }
  deleteSection(sectionId) {
    this.adminService.deleteSection(sectionId)
      .then(() => this.loadSections(this.courseId));
  }
  updateSection(sectionId, courseId, sectionName, seats) {
    this.adminService.updateSection(sectionId, courseId, sectionName, seats)
      .then(() => this.loadSections(courseId));
  }
  ngOnInit() {
    this.courseService.findAllCourses()
      .then(courses => this.courses = courses);
  }

}
