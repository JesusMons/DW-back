import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { AssistanceService } from '../../services/assistance.service';
import { RoutesService } from '../../services/routes.service';
import { BusService } from '../../services/bus.service';
import { StudentService } from '../../services/student.service';

import { assistanceI } from '../../models/assistance.models';
import { RouteI } from '../../models/routes.models';
import { busI } from '../../models/bus.models';
import { studentI } from '../../models/student.models';

@Component({
  selector: 'app-update-assistance',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './update-assistance.html'
})
export class UpdateAssistance implements OnInit {
  form!: assistanceI;

  // catálogos
  routes: RouteI[] = [];
  buses: busI[] = [];
  students: studentI[] = [];

  // buses filtrados según la ruta elegida
  filteredBuses: busI[] = [];

  // inputs de fecha/hora (para <input type="date|time">)
  dateInput = '';
  timeInput = '';

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
    this.students = (this.studentSvc as any).getAll?.() ?? [];

    // suscripción al parámetro :id
    const raw = this.ar.snapshot.paramMap.get('id');
    const id = raw !== null ? Number(raw) : NaN;
    if (Number.isNaN(id)) {
      alert('Ruta inválida: id no es un número');
      this.router.navigate(['/assistance']);
      return;
    }

    const found = this.asstSvc.getById(id);
    if (!found) {
      alert('Asistencia no encontrada');
      this.router.navigate(['/assistance']);
      return;
    }

    // clonar para no mutar el store
    this.form = { ...found };

    // setear date/time inputs
    this.dateInput = this.form.date ? new Date(this.form.date).toISOString().slice(0, 10) : '';
    this.timeInput = this.form.time || '';

    // filtrar buses en base a la ruta actual
    this.applyBusFilter(this.form.routeId);
  }

  // Filtro dependiente: si RouteI.bus existe, solo ese; si no, ninguno o todos (elige política)
  private applyBusFilter(routeId: number) {
    const r = this.routes.find(rt => rt.id === routeId);
    if (r?.bus) {
      this.filteredBuses = this.buses.filter(b => b.id === r.bus);
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

    this.form.date = new Date(this.dateInput);
    this.form.time = this.timeInput;
    this.form.updatedAt = new Date();

    this.asstSvc.update(this.form);
    this.router.navigate(['/assistance']);
  }

  cancel() {
    this.router.navigate(['/assistance']);
  }
}
