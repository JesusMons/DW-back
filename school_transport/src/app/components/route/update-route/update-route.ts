import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { RoutesService } from '../../services/routes.service';
import { RouteI, RouteStatus } from '../../models/routes.models';

@Component({
  selector: 'app-update-route',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-route.html'
})
export class UpdateRoute implements OnInit {
  form?: RouteI;
  loading = false;
  saving = false;
  error?: string;

  private routeId!: number;

  constructor(
    private readonly routesService: RoutesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const rawId = this.activatedRoute.snapshot.paramMap.get('id');
    this.routeId = rawId ? Number(rawId) : NaN;

    if (Number.isNaN(this.routeId)) {
      alert('Identificador inválido');
      this.router.navigate(['/routes']);
      return;
    }

    this.load();
  }

  private load(): void {
    this.loading = true;
    this.error = undefined;
    this.routesService.getById(this.routeId).subscribe({
      next: route => {
        this.form = { ...route };
        this.loading = false;
      },
      error: err => {
        console.error('Error cargando ruta', err);
        this.error = 'No se pudo cargar la ruta.';
        this.loading = false;
      }
    });
  }

  save(): void {
    if (!this.form?.name || !this.form.startPoint || !this.form.endPoint) {
      alert('Completa Nombre, Punto de inicio y Punto final.');
      return;
    }

    const payload: RouteI = {
      id: this.form.id,
      name: this.form.name,
      startPoint: this.form.startPoint,
      endPoint: this.form.endPoint,
      currentBusId: this.normalizeId(this.form.currentBusId),
      currentDriverId: this.normalizeId(this.form.currentDriverId),
      status: (this.form.status as RouteStatus) ?? 'ACTIVO'
    };

    this.saving = true;
    this.error = undefined;
    this.routesService.update(this.routeId, payload).subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/routes']);
      },
      error: err => {
        console.error('Error actualizando ruta', err);
        this.error = 'No se pudo actualizar la ruta.';
        this.saving = false;
      }
    });
  }

  cancel(): void {
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
