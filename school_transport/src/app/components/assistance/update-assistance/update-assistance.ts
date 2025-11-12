import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { AssistanceService } from '../../services/assistance.service';
import { RoutesService } from '../../services/routes.service';
import { BusService } from '../../services/bus.service';
import { StudentService } from '../../services/student.service';

import { AssistanceI, AssistanceStatus } from '../../models/assistance.models';
import { RouteI } from '../../models/routes.models';
import { busI } from '../../models/bus.models';
import { StudentI } from '../../models/student.models';

@Component({
  selector: 'app-update-assistance',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './update-assistance.html'
})
export class UpdateAssistance implements OnInit, OnDestroy {
  form!: AssistanceI;

  // catálogos
  routes: RouteI[] = [];
  buses: busI[] = [];
  students: StudentI[] = [];

  // buses filtrados según la ruta elegida
  filteredBuses: busI[] = [];

  // inputs de fecha/hora (para <input type="date|time">)
  dateInput = '';
  timeInput = '';

  loading = false;
  saving = false;
  error?: string;

  private studentSub?: { unsubscribe: () => void };

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private asstSvc: AssistanceService,
    private routeSvc: RoutesService,
    private busSvc: BusService,
    private studentSvc: StudentService
  ) {}

  ngOnInit(): void {
    // cargar catálogos
    this.routes = (this.routeSvc as any).getAll?.() ?? (this.routeSvc as any).getRoutes?.() ?? [];
    this.buses  = (this.busSvc  as any).getAll?.() ?? [];
    this.studentSub = this.studentSvc.students$.subscribe(students => {
      this.students = students;
    });
    this.studentSvc.loadAll();

    // suscripción al parámetro :id
    const raw = this.ar.snapshot.paramMap.get('id');
    const id = raw !== null ? Number(raw) : NaN;
    if (Number.isNaN(id)) {
      alert('Ruta inválida: id no es un número');
      this.router.navigate(['/assistance']);
      return;
    }

    this.fetchAssistance(id);
  }

  private fetchAssistance(id: number): void {
    this.loading = true;
    this.error = undefined;
    this.asstSvc.getById(id).subscribe({
      next: assistance => {
        this.form = { ...assistance };
        this.dateInput = this.form.date ? new Date(this.form.date).toISOString().slice(0, 10) : '';
        this.timeInput = this.normalizeTimeInput(this.form.time);
        this.applyBusFilter(this.form.routeId);
        this.loading = false;
      },
      error: err => {
        console.error('Error obteniendo asistencia', err);
        this.error = 'No se pudo cargar la asistencia.';
        this.loading = false;
      }
    });
  }

  private normalizeTimeInput(time?: string): string {
    if (!time) {
      return '';
    }
    return time.length === 8 ? time.slice(0, 5) : time;
  }

  // Filtro dependiente: si RouteI.bus existe, solo ese; si no, ninguno o todos (elige política)
  private applyBusFilter(routeId: number) {
    const r = this.routes.find(rt => rt.id === routeId);
    if (r?.currentBusId) {
      this.filteredBuses = this.buses.filter(b => b.id === r.currentBusId);
      // si el bus seleccionado no coincide, resetéalo
      if (!this.filteredBuses.some(b => b.id === this.form.busId)) {
        this.form.busId = this.filteredBuses[0]?.id!;
      }
    } else {
      // Política actual: sin asignación explícita => lista vacía
      this.filteredBuses = [];
      this.form.busId = undefined as any;
    }
  }

  onRouteChange() {
    if (!this.form.routeId) {
      this.filteredBuses = [];
      this.form.busId = undefined as any;
      return;
    }
    this.applyBusFilter(this.form.routeId);
  }

  onDateChange(ev: Event) {
    const el = ev.target as HTMLInputElement;
    this.dateInput = el.value;
    this.form.date = el.value ? new Date(el.value) : this.form.date;
  }

  onTimeChange(ev: Event) {
    const el = ev.target as HTMLInputElement;
    this.timeInput = el.value;
    this.form.time = el.value || '';
  }

  save() {
    if (!this.form.routeId || !this.form.busId || !this.form.studentId || !this.dateInput || !this.timeInput) {
      alert('Completa: Ruta, Bus, Estudiante, Fecha y Hora.');
      return;
    }

    const normalizedTime = this.timeInput.length === 5 ? `${this.timeInput}:00` : this.timeInput;
    const payload: AssistanceI = {
      ...this.form,
      routeId: Number(this.form.routeId),
      busId: Number(this.form.busId),
      studentId: Number(this.form.studentId),
      date: new Date(this.dateInput),
      time: normalizedTime,
      status: (this.form.status as AssistanceStatus) || 'ACTIVO'
    };

    this.saving = true;
    this.error = undefined;
    this.asstSvc.update(this.form.id!, payload).subscribe({
      next: updated => {
        this.saving = false;
        this.form = { ...updated };
        this.router.navigate(['/assistance']);
      },
      error: err => {
        console.error('Error actualizando asistencia', err);
        this.error = 'No se pudo actualizar la asistencia.';
        this.saving = false;
      }
    });
  }

  cancel() {
    this.router.navigate(['/assistance']);
  }

  ngOnDestroy(): void {
    this.studentSub?.unsubscribe();
  }
}
