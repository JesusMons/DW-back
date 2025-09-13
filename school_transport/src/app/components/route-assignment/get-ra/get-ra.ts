import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';

import { RouteAssignmentService } from '../../services/route-assignment.service';
import { RoutesService } from '../../services/routes.service';
import { BusService } from '../../services/bus.service';
import { DriverService } from '../../services/driver.service';

import { route_assignment } from '../../models/route-assignment.models';
import { RouteI } from '../../models/routes.models';
import { busI } from '../../models/bus.models';
import { driverI } from '../../models/driver.models';

type AssignmentRow = route_assignment & {
  routeName?: string;
  busPlate?: string;
  driverName?: string;
};

@Component({
  selector: 'app-get-ra',
  standalone: true,
  imports: [CommonModule, RouterModule, TableModule, ButtonModule, TagModule, DialogModule],
  templateUrl: './get-ra.html',
})
export class GetRA {
  rows: AssignmentRow[] = [];
  detailsVisible = false;
  selected?: AssignmentRow;

  private routes: RouteI[] = [];
  private buses: busI[] = [];
  private drivers: driverI[] = [];

  constructor(
    private raSvc: RouteAssignmentService,
    private routeSvc: RoutesService,
    private busSvc: BusService,
    private driverSvc: DriverService
  ) {
    this.routes = (this.routeSvc as any).getAll?.() ?? this.routeSvc.getRoutes?.() ?? [];
    this.buses = (this.busSvc as any).getAll?.() ?? [];
    this.drivers = (this.driverSvc as any).getAll?.() ?? [];
    this.refresh();
  }

  refresh() {
    const list = this.raSvc.getAll();
    this.rows = list.map(a => ({
      ...a,
      routeName: this.routes.find(r => r.id === a.routeId)?.name || `Ruta #${a.routeId}`,
      busPlate: this.buses.find(b => b.id === a.busId)?.plate || `Bus #${a.busId}`,
      driverName: a.driverId
        ? this.drivers.find(d => d.id === a.driverId)?.name || `Conductor #${a.driverId}`
        : 'No asignado',
    }));
  }

  showDetails(row: AssignmentRow) {
    this.selected = row;
    this.detailsVisible = true;
  }

  deactivate(row: AssignmentRow) {
    if (confirm(`¿Desactivar asignación #${row.id}?`)) {
      this.raSvc.deactivate(row.id!);
      this.refresh();
    }
  }

  delete(row: AssignmentRow) {
    if (confirm(`¿Eliminar asignación #${row.id}? Esta acción no se puede deshacer.`)) {
      this.raSvc.remove(row.id!);
      this.refresh();
    }
  }

  statusSeverity(s: route_assignment['status']) {
    return s === 'ACTIVO' ? 'success' : 'danger';
  }
}
