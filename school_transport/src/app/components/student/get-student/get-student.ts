import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';

import { StudentService } from '../../services/student.service';
import { StudentI } from '../../models/student.models';

@Component({
  selector: 'app-get-student',
  standalone: true,
  imports: [CommonModule, RouterModule, TableModule, ButtonModule, TagModule, DialogModule],
  templateUrl: './get-student.html'
})
export class GetStudent implements OnInit, OnDestroy {
  students: StudentI[] = [];
  detailsVisible = false;
  selected?: StudentI;

  private subscription?: { unsubscribe: () => void };

  constructor(private readonly svc: StudentService) {}

  ngOnInit(): void {
    this.subscription = this.svc.students$.subscribe(list => (this.students = list));
    this.svc.loadAll();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  delete(id?: number): void {
    if (!id || !confirm('¿Eliminar este estudiante?')) return;
    this.svc.delete(id).subscribe({
      error: () => alert('No se pudo eliminar el estudiante.')
    });
  }

  deactivate(id?: number): void {
    if (!id || !confirm('¿Marcar como INACTIVO?')) return;
    this.svc.deactivate(id).subscribe({
      error: () => alert('No se pudo actualizar el estado.')
    });
  }

  showDetails(s: StudentI) {
    this.selected = s;
    this.detailsVisible = true;
  }

  statusSeverity(status?: StudentI['status']) {
    return status === 'ACTIVO' ? 'success' : 'danger';
  }
}
