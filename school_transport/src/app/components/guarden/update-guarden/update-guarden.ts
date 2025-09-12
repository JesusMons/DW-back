import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';

import { GuardianService } from '../../services/guarden.service';
import { guardianI } from '../../models/guardian.models';
import { StudentService } from '../../services/student.service';
import { studentI } from '../../models/student.models'

@Component({
  selector: 'app-update-guarden',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, MultiSelectModule, RouterModule],
  templateUrl: './update-guarden.html'
})
export class UpdateGuarden implements OnInit {
  form!: guardianI;
  studentOptions: { label: string; value: number }[] = [];
  selectedStudentIds: number[] = [];

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private svc: GuardianService,
    private studentSvc: StudentService
  ) {}

  ngOnInit(): void {
    // cargar opciones de estudiantes
    const students = this.studentSvc.getAll();
    this.studentOptions = students.map((s: studentI) => ({
      label: `${s.name} ${s.last_name} — #${s.id}`,
      value: s.id!
    }));

    // cargar acudiente por id
    const id = Number(this.ar.snapshot.paramMap.get('id'));
    const g = this.svc.getById(id);
    if (!g) {
      alert('Acudiente no encontrado');
      this.router.navigate(['/guardian']);
      return;
    }

    // clonar para no mutar store y preparar selección
    this.form = { ...g, students: [...(g.students || [])] };
    this.selectedStudentIds = [...(g.students || [])];
  }

  save() {
    if (!this.form.firstName || !this.form.lastName || !this.form.document || !this.form.phone || !this.form.relationship) {
      alert('Completa todos los campos obligatorios');
      return;
    }

    const updated: guardianI = {
      ...this.form,
      students: this.selectedStudentIds,
      updatedAt: new Date()
    };

    this.svc.update(updated);
    this.router.navigate(['/guardian']);
  }

  cancel() {
    this.router.navigate(['/guardian']);
  }
}
