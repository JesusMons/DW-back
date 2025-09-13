import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';

import { BusService } from '../../services/bus.service';
import { busI } from '../../models/bus.models';

@Component({
  selector: 'app-get-bus',
  standalone: true,
  imports: [CommonModule, RouterModule, TableModule, ButtonModule, TagModule, DialogModule],
  templateUrl: './get-bus.html'
})
export class GetBus {
  buses: busI[] = [];
  detailsVisible = false;
  selected?: busI;

  constructor(private svc: BusService) {
    this.refresh();
  }

  refresh() {
    this.buses = this.svc.getAll();
  }

  delete(id: number) {
    this.svc.remove(id);
    this.refresh();
  }

  showDetails(b: busI) {
    this.selected = b;
    this.detailsVisible = true;
  }

  statusSeverity(s?: busI['status']) {
    switch (s) {
      case 'ACTIVO': return 'success';
      case 'EN MANTENIMIENTO': return 'warning';
      default: return 'danger'; // INACTIVO u otro
    }
  }
}
