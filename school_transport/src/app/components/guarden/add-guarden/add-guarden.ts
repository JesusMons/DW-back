import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';

import { GuardianService } from '../../services/guarden.service';
import { guardianI } from '../../models/guardian.models';
import { StudentService } from '../../services/student.service';
import { StudentI } from '../../models/student.models';

@Component({
  selector: 'app-add-guarden',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, MultiSelectModule, RouterModule],
  templateUrl: './add-guarden.html'
})
export class AddGuarden implements OnDestroy {
  form: Partial<guardianI> = {
    firstName: '',
    lastName: '',
    document: undefined,
    phone: '',
    email: '',
    relationship: '',
    address: '',
    students: [],
    status: 'ACTIVO'
  };

  // opciones para el multiselect
  studentOptions: { label: string; value: number }[] = [];
  selectedStudentIds: number[] = []; // binding del multiselect

  private studentSub?: { unsubscribe: () => void };

  constructor(
    private svc: GuardianService,
    private studentSvc: StudentService,
    private router: Router
  ) {
    this.studentSub = this.studentSvc.students$.subscribe((students: StudentI[]) => {
      this.studentOptions = students.map(s => ({
        label: `${s.name} ${s.lastName} — #${s.id}`,
        value: s.id!
      }));
    });
    this.studentSvc.loadAll();
  }

  save() {
    if (!this.form.firstName || !this.form.lastName || !this.form.document || !this.form.phone || !this.form.relationship) {
      alert('Completa todos los campos obligatorios');
      return;
    }

    const guardian: guardianI = {
      id: 0,
      firstName: this.form.firstName!,
      lastName: this.form.lastName!,
      document: Number(this.form.document),
      phone: this.form.phone!,
      email: this.form.email,
      relationship: this.form.relationship!,
      address: this.form.address,
      students: this.selectedStudentIds,     // 👈 asignación aquí
      status: this.form.status || 'ACTIVO',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.svc.add(guardian);
    this.router.navigate(['/guardian']);
  }

  cancel() {
    this.router.navigate(['/guardian']);
  }

  ngOnDestroy(): void {
    this.studentSub?.unsubscribe();
  }
}
