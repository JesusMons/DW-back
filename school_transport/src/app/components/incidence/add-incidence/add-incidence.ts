import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { IncidenceService } from '../../services/incidence.service';
import { BusService } from '../../services/bus.service';
import { RoutesService } from '../../services/routes.service'; // ajusta nombre/ruta si difiere

import { incidenceI } from '../../models/incidence.models';
import { busI } from '../../models/bus.models';
import { RouteI } from '../../models/routes.models';

@Component({
  selector: 'app-add-incidence',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, ],
  templateUrl: './add-incidence.html'
})
export class AddIncidence {
  // opciones para selects
  busesOpts: { label: string; value: number }[] = [];
  routesOpts: { label: string; value: number }[] = [];

  // modelo del formulario
  form: Partial<incidenceI> = {
    busId: undefined,
    routeId: undefined,
    description: '',
    severity: 'MEDIA',
    status: 'ABIERTA',
    reportedAt: new Date(),
    reportedBy: '',
    actionsTaken: ''
  };

  constructor(
    private incSvc: IncidenceService,
    private busSvc: BusService,
    private routeSvc: RoutesService,
    private router: Router
  ) {
    // cargar buses y rutas para los selects
    const buses: busI[] = (this.busSvc as any).getAll ? this.busSvc.getAll() : [];
    const routes: RouteI[] =
      (this.routeSvc as any).getAll?.() ?? (this.routeSvc as any).getRoutes?.() ?? [];

    this.busesOpts = buses.map(b => ({ label: `${b.plate} — #${b.id}`, value: b.id! }));
    this.routesOpts = routes.map(r => ({ label: `${r.name} — #${r.id}`, value: r.id! }));
  }

  // helper: enlazar input datetime-local a Date
  onDateTimeChange(ev: Event) {
    const el = ev.target as HTMLInputElement;
    // value como 'yyyy-MM-ddTHH:mm'
    const v = el.value ? new Date(el.value) : undefined;
    if (v) this.form.reportedAt = v;
  }

  save() {
    if (!this.form.busId || !this.form.routeId || !this.form.description?.trim() || !this.form.reportedBy?.trim()) {
      alert('Completa: Bus, Ruta, Descripción y Reportado por');
      return;
    }

    const payload: incidenceI = {
      id: 0,
      busId: Number(this.form.busId),
      routeId: Number(this.form.routeId),
      description: this.form.description!.trim(),
      severity: (this.form.severity as any) ?? 'MEDIA',
      status: (this.form.status as any) ?? 'ABIERTA',
      reportedAt: this.form.reportedAt ? new Date(this.form.reportedAt) : new Date(),
      resolvedAt: this.form.resolvedAt ? new Date(this.form.resolvedAt) : undefined,
      reportedBy: this.form.reportedBy!.trim(),
      actionsTaken: this.form.actionsTaken?.trim(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.incSvc.add(payload);
    this.router.navigate(['/incidence']);
  }

  cancel() {
    this.router.navigate(['/incidence']);
  }

  onResolvedAtChange(ev: Event) {
  const el = ev.target as HTMLInputElement;
  this.form.resolvedAt = el.value ? new Date(el.value) : undefined;
}

}
