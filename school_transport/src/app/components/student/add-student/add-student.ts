import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { StudentService } from '../../services/student.service';
import { StudentI, StudentStatus } from '../../models/student.models';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './add-student.html'
})
export class AddStudent {
  form = {
    name: '',
    lastName: '',
    document: '',
    guardianId: undefined as number | undefined,
    grade: undefined as number | undefined,
    birthdate: '',
    address: '',
    phone: '',
    guardianPhone: '',
    email: '',
    status: 'ACTIVO' as StudentStatus,
    allergies: [] as string[],
    emergencyContact: { name: '', phone: '', relationship: '' }
  };

  // campos auxiliares para añadir alergias
  allergyInput = '';
  loading = false;
  error?: string;

  constructor(private svc: StudentService, private router: Router) {}

  addAllergy() {
    const v = (this.allergyInput || '').trim();
    if (!v) return;
    (this.form.allergies ||= []).push(v);
    this.allergyInput = '';
  }

  removeAllergy(i: number) {
    this.form.allergies!.splice(i, 1);
  }

  save() {
    // Validaciones básicas
    if (!this.form.name || !this.form.lastName || !this.form.document) {
      alert('Completa: Nombre, Apellido y Documento');
      return;
    }

    const student: StudentI = {
      name: this.form.name.trim(),
      lastName: this.form.lastName.trim(),
      document: this.form.document.trim(),
      guardianId: this.form.guardianId ?? null,
      grade: this.form.grade ?? null,
      birthdate: this.form.birthdate ? new Date(this.form.birthdate) : null,
      address: this.form.address || null,
      phone: this.form.phone || null,
      guardianPhone: this.form.guardianPhone || null,
      email: this.form.email || null,
      status: this.form.status,
      allergies: this.form.allergies.length ? [...this.form.allergies] : null,
      emergencyContact: this.form.emergencyContact.name
        ? {
            name: this.form.emergencyContact.name,
            phone: this.form.emergencyContact.phone,
            relationship: this.form.emergencyContact.relationship
          }
        : null
    };

    this.loading = true;
    this.error = undefined;
    this.svc.create(student).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/student']);
      },
      error: () => {
        this.error = 'No se pudo crear el estudiante.';
        this.loading = false;
      }
    });
  }

  cancel() {
    this.router.navigate(['/student']);
  }
}
