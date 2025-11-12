import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { RoutesService } from '../../services/routes.service';
import { RouteI, RouteStatus } from '../../models/routes.models';

@Component({
  selector: 'app-add-route',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-route.html'
})
export class AddRoute {
  form: Partial<RouteI> = {
    name: '',
    startPoint: '',
    endPoint: '',
    currentBusId: undefined,
    currentDriverId: undefined,
    status: 'ACTIVO'
  };

  loading = false;
  error?: string;

  constructor(
    private readonly routesService: RoutesService,
    private readonly router: Router
  ) {}

  save() {
    if (!this.form.name || !this.form.startPoint || !this.form.endPoint) {
      alert('Completa Nombre, Punto de inicio y Punto final.');
      return;
    }

    const payload: RouteI = {
      name: this.form.name,
      startPoint: this.form.startPoint,
      endPoint: this.form.endPoint,
      currentBusId: this.normalizeId(this.form.currentBusId),
      currentDriverId: this.normalizeId(this.form.currentDriverId),
      status: (this.form.status as RouteStatus) ?? 'ACTIVO'
    };

    this.loading = true;
    this.error = undefined;
    this.routesService.create(payload).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/routes']);
      },
      error: err => {
        console.error('Error creando ruta', err);
        this.error = 'No se pudo crear la ruta.';
        this.loading = false;
      }
    });
  }

  cancel() {
    this.router.navigate(['/routes']);
  }

  private normalizeId(value?: number | null): number | null | undefined {
    if (value === undefined || value === null || value === ('' as unknown as number)) {
      return null;
    }
    const num = Number(value);
    return Number.isNaN(num) ? null : num;
  }
}
