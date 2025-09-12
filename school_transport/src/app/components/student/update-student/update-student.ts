import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { StudentService } from '../../services/student.service';
import { studentI } from '../../models/student.models';

@Component({
  selector: 'app-update-student',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './update-student.html'
})
export class UpdateStudent implements OnInit {
  form!: studentI;              // modelo editado
  allergyInput = '';            // input auxiliar para alergías

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private svc: StudentService
  ) {}

  ngOnInit(): void {
    const id = Number(this.ar.snapshot.paramMap.get('id'));
    const found = this.svc.getById(id);
    if (!found) {
      alert('Estudiante no encontrado');
      this.router.navigate(['/students']);
      return;
    }
    // clonar para no mutar la referencia del store
    this.form = {
      ...found,
      allergies: [...(found.allergies || [])],
      emergencyContact: found.emergencyContact
        ? { ...found.emergencyContact }
        : { name: '', phone: '', relationship: '' }
    };
  }

  addAllergy() {
    const v = (this.allergyInput || '').trim();
    if (!v) return;
    (this.form.allergies ||= []).push(v);
    this.allergyInput = '';
  }

  removeAllergy(i: number) {
    this.form.allergies!.splice(i, 1);
  }

  onBirthdateChange(ev: Event) {
    const d = (ev.target as HTMLInputElement).valueAsDate;
    if (d) this.form.birthdate = d;
  }

  save() {
    if (!this.form.name || !this.form.last_name || !this.form.document || !this.form.guardian) {
      alert('Completa: Nombre, Apellido, Documento y Acudiente');
      return;
    }
    this.svc.update({ ...this.form, updatedAt: new Date() });
    this.router.navigate(['/student']);
  }

  cancel() {
    this.router.navigate(['/student']);
  }
}
