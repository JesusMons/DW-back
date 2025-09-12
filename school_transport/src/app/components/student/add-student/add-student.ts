import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { StudentService } from '../../services/student.service';
import { studentI } from '../../models/student.models';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './add-student.html'
})
export class AddStudent {
  // Modelo del formulario
  form: Partial<studentI> = {
    name: '',
    last_name: '',
    document: undefined as unknown as number,
    guardian: '',
    grade: undefined,
    birthdate: undefined,
    address: '',
    phone: '',
    guardianPhone: '',
    email: '',
    status: 'ACTIVO',
    allergies: [],
    emergencyContact: { name: '', phone: '', relationship: '' }
  };

  // campos auxiliares para añadir alergias
  allergyInput = '';

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
    if (!this.form.name || !this.form.last_name || !this.form.document || !this.form.guardian) {
      alert('Completa: Nombre, Apellido, Documento y Acudiente');
      return;
    }

    const student: studentI = {
      id: 0,
      name: this.form.name!,
      last_name: this.form.last_name!,
      document: Number(this.form.document),
      guardian: this.form.guardian!,
      grade: this.form.grade,
      birthdate: this.form.birthdate ? new Date(this.form.birthdate) : undefined,
      address: this.form.address,
      phone: this.form.phone,
      guardianPhone: this.form.guardianPhone,
      email: this.form.email,
      status: (this.form.status as any) || 'ACTIVO',
      allergies: this.form.allergies || [],
      emergencyContact: this.form.emergencyContact?.name
        ? {
            name: this.form.emergencyContact.name,
            phone: this.form.emergencyContact.phone || '',
            relationship: this.form.emergencyContact.relationship || ''
          }
        : undefined
    };

    this.svc.add(student);
    this.router.navigate(['/student']);
  }

  cancel() {
    this.router.navigate(['/student']);
  }
}
