import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RouterModule } from '@angular/router';

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

type AssistanceRow = assistanceI & {
  routeName?: string;
  busPlate?: string;
  studentName?: string;
};

@Component({
  selector: 'app-get-assistance',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, ButtonModule, TagModule, RouterModule],
  templateUrl: './get-assistance.html'
})
export class GetAssistance {
  // Catálogos base
  routes: RouteI[] = [];
  buses: busI[] = [];
  students: studentI[] = [];
  assistances: assistanceI[] = [];

  // Filtros
  selectedRouteId?: number;
  filteredBuses: busI[] = [];
  selectedBusId?: number;
  selectedDate?: string; // 'yyyy-MM-dd'

  // Render
  rows: AssistanceRow[] = [];

  constructor(
    private asstSvc: AssistanceService,
    private routeSvc: RoutesService,
    private busSvc: BusService,
    private studentSvc: StudentService,
    private raSvc: RouteAssignmentService
  ) {
    // Cargas base
    this.routes = this.routeSvc.getRoutes?.() ?? [];
    this.buses = this.busSvc.getAll?.() ?? [];
    this.students = this.studentSvc.getAll?.() ?? [];
    this.assistances = this.asstSvc.getAll();

    this.refreshRows();
  }

  /** Obtiene buses disponibles para una ruta:
   *  - Si hay asignaciones ACTIVAS en la fecha (selectedDate o hoy), usa esas.
   *  - Si no hay asignaciones, hace fallback a route.bus (si existe).
   */
  private getAvailableBusesForRoute(routeId: number, onDate?: Date): busI[] {
    const date = onDate ?? (this.selectedDate ? new Date(this.selectedDate) : new Date());

    // 1) Buses por asignaciones activas en esa fecha
    const activeAssignments: route_assignment[] = this.raSvc
      .getActiveOn?.(date) ?? []; // si el servicio no tiene este método, ajusta aquí

    const busIds = activeAssignments
      .filter(a => a.routeId === routeId)
      .map(a => a.busId);

    const uniqueBusIds = Array.from(new Set(busIds));
    let result = this.buses.filter(b => uniqueBusIds.includes(b.id!));

    // 2) Fallback: si no hay asignaciones, usa route.bus (modelo simple)
    if (!result.length) {
      const r = this.routes.find(rt => rt.id === routeId);
      if (r?.bus) {
        result = this.buses.filter(b => b.id === r.bus);
      }
    }

    return result;
  }

  // Cuando cambia Ruta -> limitar buses disponibles
  onRouteChange() {
    if (this.selectedRouteId) {
      const date = this.selectedDate ? new Date(this.selectedDate) : undefined;
      this.filteredBuses = this.getAvailableBusesForRoute(this.selectedRouteId, date);
    } else {
      this.filteredBuses = [];
    }
    this.selectedBusId = undefined; // reset
    this.refreshRows();
  }

  onBusChange() {
    this.refreshRows();
  }

  onDateChange(ev: Event) {
    const el = ev.target as HTMLInputElement;
    this.selectedDate = el.value || undefined;

    // Recalcular buses disponibles si hay ruta elegida
    if (this.selectedRouteId) {
      const date = this.selectedDate ? new Date(this.selectedDate) : undefined;
      this.filteredBuses = this.getAvailableBusesForRoute(this.selectedRouteId, date);
      this.selectedBusId = undefined;
    }

    this.refreshRows();
  }

  // Helpers de mapeo para mostrar nombres/placas
  private routeName(id: number) {
    return this.routes.find(r => r.id === id)?.name || `Ruta #${id}`;
  }
  private busPlate(id: number) {
    return this.buses.find(b => b.id === id)?.plate || `Bus #${id}`;
  }
  private studentName(id: number) {
    const s = this.students.find(st => st.id === id);
    return s ? `${s.name} ${s.last_name ?? ''}`.trim() : `Estudiante #${id}`;
  }

  refreshRows() {
    let data = [...this.assistances];

    if (this.selectedRouteId) {
      data = data.filter(a => a.routeId === this.selectedRouteId);
    }
    if (this.selectedBusId) {
      data = data.filter(a => a.busId === this.selectedBusId);
    }
    if (this.selectedDate) {
      const d = new Date(this.selectedDate).toDateString();
      data = data.filter(a => a.date && new Date(a.date).toDateString() === d);
    }

    this.rows = data.map(a => ({
      ...a,
      routeName: this.routeName(a.routeId),
      busPlate: this.busPlate(a.busId),
      studentName: this.studentName(a.studentId)
    }));
  }

  // Acciones rápidas de estado
  setStatus(a: AssistanceRow, status: assistanceI['status']) {
    this.asstSvc.setStatus(a.id!, status);
    this.assistances = this.asstSvc.getAll();
    this.refreshRows();
  }

  statusSeverity(s: assistanceI['status']) {
    switch (s) {
      case 'CONFIRMADO': return 'success';
      case 'AUSENTE': return 'danger';
      case 'CANCELADO': return 'warning';
      default: return 'info';
    }
  }
}
