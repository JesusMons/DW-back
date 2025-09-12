import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';

import { StudentService } from '../../services/student.service';
import { studentI } from '../../models/student.models';

@Component({
  selector: 'app-get-student',
  standalone: true,
  imports: [CommonModule, RouterModule, TableModule, ButtonModule, TagModule, DialogModule],
  templateUrl: './get-student.html'
})
export class GetStudent {
  students: studentI[] = [];
  detailsVisible = false;
  selected?: studentI;

  constructor(private svc: StudentService) {
    this.refresh();
  }

  refresh() {
    this.students = this.svc.getAll();
  }

  delete(id: number) {
    this.svc.remove(id);
    this.refresh();
  }

  showDetails(s: studentI) {
    this.selected = s;
    this.detailsVisible = true;
  }
}
