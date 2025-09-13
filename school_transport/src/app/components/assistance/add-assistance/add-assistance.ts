import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { AssistanceService } from '../../services/assistance.service';
import { RoutesService } from '../../services/routes.service';
import { BusService } from '../../services/bus.service';
import { StudentService } from '../../services/student.service';
import { RouteAssignmentService } from '../../services/route-assignment.service';

import { assistanceI } from '../../models/assistance.models';
import { RouteI } from '../../models/routes.models';
import { busI } from '../../models/bus.models';
import { studentI } from '../../models/student.models';
import { route_assignment } from '../../models/route-assignment.models';

@Component({
  selector: 'app-add-assistance',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './add-assistance.html'
})
export class AddAssistance {
  // catálogos
  routes: RouteI[] = [];
  buses: busI[] = [];
  students: studentI[] = [];

  // asignaciones de la ruta seleccionada (para mostrar disponibilidad)
  routeAssignments: route_assignment[] = [];

  // buses filtrados por ruta + fecha elegida
  filteredBuses: busI[] = [];

  // modelo del formulario
  form: Partial<assistanceI> = {
    routeId: undefined!,
    busId: undefined!,
    studentId: undefined!,
    date: new Date(),
    time: '',
    status: 'CONFIRMADO'
  };

  // helpers para inputs date/time
  dateInput: string = ''; // yyyy-MM-dd
  timeInput: string = ''; // HH:mm

  constructor(
    private asstSvc: AssistanceService,
    private routeSvc: RoutesService,
    private busSvc: BusService,
    private studentSvc: StudentService,
    private raSvc: RouteAssignmentService,
    private router: Router
  ) {
    this.routes = (this.routeSvc as any).getAll?.() ?? (this.routeSvc as any).getRoutes?.() ?? [];
    this.buses = (this.busSvc as any).getAll?.() ?? [];
    this.students = (this.studentSvc as any).getAll?.() ?? [];

    const now = new Date();
    this.dateInput = now.toISOString().slice(0, 10);
    this.timeInput = now.toTimeString().slice(0, 5);
    this.form.date = new Date(this.dateInput);
    this.form.time = this.timeInput;
  }

  /** Todas las asignaciones de una ruta (para mostrar disponibilidad) */
  private getAssignmentsForRoute(routeId: number): route_assignment[] {
    // Si tienes un getByRoute en el servicio, úsalo; si no, filtramos de getAll
    const all = this.raSvc.getAll?.() ?? [];
    return all
      .filter(a => a.routeId === routeId)
      .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  }

  /** Buses ACTIVOS para una ruta en una fecha dada; si no hay asignaciones, fallback a route.bus */
  private getAvailableBusesForRouteOn(routeId: number, date: Date): busI[] {
    const actives = (this.raSvc.getActiveOn?.(date) ?? []).filter(a => a.routeId === routeId);
    const ids = Array.from(new Set(actives.map(a => a.busId)));
    let result = this.buses.filter(b => ids.includes(b.id!));

    if (!result.length) {
      const r = this.routes.find(rt => rt.id === routeId);
      if (r?.bus) result = this.buses.filter(b => b.id === r.bus);
    }
    return result;
  }

  // cuando cambia Ruta -> mostramos disponibilidad + filtramos buses del día elegido
  onRouteChange() {
    if (!this.form.routeId) {
      this.routeAssignments = [];
      this.filteredBuses = [];
      this.form.busId = undefined!;
      return;
    }

    const rid = Number(this.form.routeId);
    this.routeAssignments = this.getAssignmentsForRoute(rid);

    const date = this.dateInput ? new Date(this.dateInput) : new Date();
    this.filteredBuses = this.getAvailableBusesForRouteOn(rid, date);
    this.form.busId = undefined!;
  }

  onDateChange(ev: Event) {
    const el = ev.target as HTMLInputElement;
    this.dateInput = el.value;
    this.form.date = el.value ? new Date(el.value) : undefined;

    if (this.form.routeId) {
      const rid = Number(this.form.routeId);
      const date = this.form.date ?? new Date();
      this.filteredBuses = this.getAvailableBusesForRouteOn(rid, date);
      this.form.busId = undefined!;
    }
  }

  onTimeChange(ev: Event) {
    const el = ev.target as HTMLInputElement;
    this.timeInput = el.value;
    this.form.time = el.value || '';
  }

  save() {
    if (!this.form.routeId || !this.form.busId || !this.form.studentId || !this.form.date || !this.form.time) {
      alert('Completa: Ruta, Bus, Estudiante, Fecha y Hora.');
      return;
    }

    const payload: assistanceI = {
      id: 0,
      routeId: Number(this.form.routeId),
      busId: Number(this.form.busId),
      studentId: Number(this.form.studentId),
      date: new Date(this.dateInput),
      time: this.timeInput,
      status: (this.form.status as any) || 'CONFIRMADO',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.asstSvc.add(payload);
    this.router.navigate(['/assistance']); // cambia a '/assistances' si tu listado usa esa ruta
  }

  cancel() {
    this.router.navigate(['/assistance']);
  }

  // helpers para nombre/placa en el bloque de disponibilidad (por si los necesitas en el HTML)
  busPlate(id: number) {
    return this.buses.find(b => b.id === id)?.plate || `Bus #${id}`;
  }
}
