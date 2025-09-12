import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';

// Servicio y modelo (ajusta la ruta real)
import { GuardianService } from '../../services/guarden.service';
import { guardianI } from '../../models/guardian.models';

@Component({
  selector: 'app-get-guarden',
  standalone: true,
  imports: [CommonModule, RouterModule, TableModule, ButtonModule, TagModule, DialogModule],
  templateUrl: './get-guarden.html'
})
export class GetGuarden {
  guardians: guardianI[] = [];
  detailsVisible = false;
  selected?: guardianI;

  constructor(private svc: GuardianService) {
    this.refresh();
  }

  refresh() {
    this.guardians = this.svc.getAll();
  }

  delete(id: number) {
    this.svc.remove(id);
    this.refresh();
  }

  showDetails(g: guardianI) {
    this.selected = g;
    this.detailsVisible = true;
  }
}
