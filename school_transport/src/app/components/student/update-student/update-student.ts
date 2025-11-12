import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { StudentService } from '../../services/student.service';
import { StudentI, StudentStatus } from '../../models/student.models';

@Component({
  selector: 'app-update-student',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './update-student.html'
})
export class UpdateStudent implements OnInit {
  form?: StudentI;
  birthInput = '';
  allergyInput = '';
  loading = false;
  saving = false;
  error?: string;

  private studentId!: number;

  constructor(
    private readonly ar: ActivatedRoute,
    private readonly router: Router,
    private readonly svc: StudentService
  ) {}

  ngOnInit(): void {
    const raw = this.ar.snapshot.paramMap.get('id');
    this.studentId = raw ? Number(raw) : NaN;
    if (Number.isNaN(this.studentId)) {
      alert('Identificador inválido');
      this.router.navigate(['/student']);
      return;
    }
    this.load();
  }

  private load(): void {
    this.loading = true;
    this.error = undefined;
    this.svc.getById(this.studentId).subscribe({
      next: student => {
        this.form = {
          ...student,
          allergies: student.allergies ? [...student.allergies] : [],
          emergencyContact: student.emergencyContact
            ? { ...student.emergencyContact }
            : { name: '', phone: '', relationship: '' }
        };
        this.birthInput = student.birthdate ? new Date(student.birthdate).toISOString().slice(0, 10) : '';
        this.loading = false;
      },
      error: err => {
        console.error('Error cargando estudiante', err);
        this.error = 'No se pudo cargar el estudiante.';
        this.loading = false;
      }
    });
  }

  addAllergy(): void {
    if (!this.form) return;
    const value = this.allergyInput.trim();
    if (!value) return;
    (this.form.allergies ||= []).push(value);
    this.allergyInput = '';
  }

  removeAllergy(index: number) {
    if (!this.form?.allergies) return;
    this.form.allergies.splice(index, 1);
  }

  private normalizeEmergencyContact(): StudentI['emergencyContact'] {
    if (!this.form?.emergencyContact) {
      return null;
    }
    const { name, phone, relationship } = this.form.emergencyContact;
    if (!name && !phone && !relationship) {
      return null;
    }
    return {
      name: name?.trim() ?? '',
      phone: phone?.trim() ?? '',
      relationship: relationship?.trim() ?? ''
    };
  }

  save(): void {
    if (!this.form?.name || !this.form.lastName || !this.form.document) {
      alert('Completa: Nombre, Apellido y Documento.');
      return;
    }

    const payload: StudentI = {
      id: this.form.id,
      name: this.form.name.trim(),
      lastName: this.form.lastName.trim(),
      document: this.form.document.trim(),
      guardianId: this.form.guardianId ?? null,
      grade: this.form.grade ?? null,
      birthdate: this.birthInput ? new Date(this.birthInput) : null,
      address: this.form.address?.trim() || null,
      phone: this.form.phone?.trim() || null,
      guardianPhone: this.form.guardianPhone?.trim() || null,
      email: this.form.email?.trim() || null,
      status: (this.form.status as StudentStatus) ?? 'ACTIVO',
      allergies: this.form.allergies && this.form.allergies.length ? [...this.form.allergies] : null,
      emergencyContact: this.normalizeEmergencyContact()
    };

    this.saving = true;
    this.error = undefined;
    this.svc.update(this.studentId, payload).subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/student']);
      },
      error: err => {
        console.error('Error actualizando estudiante', err);
        this.error = 'No se pudo actualizar el estudiante.';
        this.saving = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/student']);
  }
}
