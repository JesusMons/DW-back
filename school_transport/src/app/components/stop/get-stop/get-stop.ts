import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';

// Servicio / modelo (ajusta las rutas reales)
import { StopService } from '../../services/stop.service';
import { stopI } from '../../models/stop.models';

@Component({
  selector: 'app-get-stop',
  standalone: true,
  imports: [CommonModule, RouterModule, TableModule, ButtonModule, TagModule, DialogModule],
  templateUrl: './get-stop.html'
})
export class GetStop {
  stops: stopI[] = [];
  detailsVisible = false;
  selected?: stopI;

  constructor(private svc: StopService) {
    this.refresh();
  }

  refresh() {
    this.stops = this.svc.getAll();
  }

  delete(id: number) {
    this.svc.remove(id);
    this.refresh();
  }

  showDetails(s: stopI) {
    this.selected = s;
    this.detailsVisible = true;
  }

  statusSeverity(s?: stopI['status']) {
    return s === 'ACTIVA' ? 'success' : 'danger';
  }
}
