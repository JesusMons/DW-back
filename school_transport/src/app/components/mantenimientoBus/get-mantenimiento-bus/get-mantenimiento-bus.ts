import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';

import { MantenimientoBusService } from '../../services/mantenimiento-bus.service';
import { BusService } from '../../services/bus.service';

import { maintenanceI } from '../../models/mantenimientoBus.models';
import { busI } from '../../models/bus.models';

type Row = maintenanceI & { busPlate?: string };

@Component({
  selector: 'app-get-mantenimiento-bus',
  standalone: true,
  imports: [CommonModule, RouterModule, TableModule, ButtonModule, TagModule, DialogModule],
  templateUrl: './get-mantenimiento-bus.html'
})
export class GetMantenimientoBus {
  rows: Row[] = [];
  buses: busI[] = [];

  // modal detalle
  detailVisible = false;
  selected?: Row;

  constructor(
    private mantSvc: MantenimientoBusService,
    private busSvc: BusService
  ) {
    this.buses = (this.busSvc as any).getAll?.() ?? [];
    this.refresh();
  }

  private plate(id: number) {
    return this.buses.find(b => b.id === id)?.plate || `Bus #${id}`;
  }

  refresh() {
    const list = this.mantSvc.getAll();
    this.rows = list.map(m => ({ ...m, busPlate: this.plate(m.busId) }));
  }

  showDetails(row: Row) {
    this.selected = row;
    this.detailVisible = true;
  }

  delete(row: Row) {
    if (confirm(`¿Eliminar mantenimiento #${row.id}?`)) {
      this.mantSvc.remove(row.id!);
      this.refresh();
    }
  }

  statusSeverity(s: maintenanceI['status']) {
    switch (s) {
      case 'COMPLETADO': return 'success';
      case 'EN PROGRESO': return 'warning';
      case 'PENDIENTE': return 'info';
      default: return 'secondary';
    }
  }

  typeLabel(t: maintenanceI['type']) {
    return t === 'PREVENTIVO' ? 'Preventivo'
      : t === 'CORRECTIVO' ? 'Correctivo'
      : 'Inspección';
  }
}
