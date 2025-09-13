import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';

import { IncidenceService } from '../../services/incidence.service';
import { BusService } from '../../services/bus.service';
import { RoutesService } from '../../services/routes.service';
import { incidenceI } from '../../models/incidence.models';
import { busI } from '../../models/bus.models';
import { RouteI } from '../../models/routes.models';

type IncidenceRow = incidenceI & { busPlate: string; routeName: string };

@Component({
  selector: 'app-get-incidence',
  standalone: true,
  imports: [CommonModule, RouterModule, TableModule, ButtonModule, TagModule, DialogModule],
  templateUrl: './get-incidence.html'
})
export class GetIncidence {
  rows: IncidenceRow[] = [];
  detailsVisible = false;
  selected?: IncidenceRow;

  private buses: busI[] = [];
  private routes: RouteI[] = [];

  constructor(
    private incSvc: IncidenceService,
    private busSvc: BusService,
    private routeSvc: RoutesService
  ) {
    this.buses = this.busSvc.getAll?.() ?? [];
    this.routes = this.routeSvc.getRoutes?.() ?? this.routeSvc.getRoutes?.() ?? [];
    this.refresh();
  }

  private resolveBusPlate(id: number) {
    return this.buses.find(b => b.id === id)?.plate || `Bus #${id}`;
  }

  private resolveRouteName(id: number) {
    return this.routes.find(r => r.id === id)?.name || `Ruta #${id}`;
  }

  refresh() {
    const data = this.incSvc.getAll();
    this.rows = data.map(i => ({
      ...i,
      busPlate: this.resolveBusPlate(i.busId),
      routeName: this.resolveRouteName(i.routeId)
    }));
  }

  delete(id: number) {
    this.incSvc.remove(id);
    this.refresh();
  }

  showDetails(row: IncidenceRow) {
    this.selected = row;
    this.detailsVisible = true;
  }

  statusSeverity(s: incidenceI['status']) {
    switch (s) {
      case 'ABIERTA': return 'danger';
      case 'EN PROGRESO': return 'warning';
      case 'RESUELTO': return 'success';
      case 'CERRADO': return 'secondary';
      default: return 'info';
    }
  }

  severityTag(s: incidenceI['severity']) {
    switch (s) {
      case 'BAJA': return 'success';
      case 'MEDIA': return 'info';
      case 'ALTA': return 'warning';
      case 'CRITICA': return 'danger';
      default: return 'info';
    }
  }
}
