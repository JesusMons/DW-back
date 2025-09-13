import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { IncidenceService } from '../../services/incidence.service';
import { BusService } from '../../services/bus.service';
import { RoutesService } from '../../services/routes.service'; // ajusta la ruta si difiere

import { incidenceI } from '../../models/incidence.models';
import { busI } from '../../models/bus.models';
import { RouteI } from '../../models/routes.models';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-update-incidence',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './update-incidence.html'
})
export class UpdateIncidence implements OnInit {
  form!: incidenceI;

  busesOpts: { label: string; value: number }[] = [];
  routesOpts: { label: string; value: number }[] = [];
  private sub?: Subscription;

  severities: incidenceI['severity'][] = ['BAJA', 'MEDIA', 'ALTA', 'CRITICA'];
  statuses: incidenceI['status'][] = ['ABIERTA', 'EN PROGRESO', 'RESUELTO', 'CERRADO'];

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private incSvc: IncidenceService,
    private busSvc: BusService,
    private routeSvc: RoutesService
  ) {}

  ngOnInit(): void {
    // cargar opciones para selects (una vez)
    const buses: busI[] = (this.busSvc as any).getAll?.() ?? [];
    const routes: RouteI[] = (this.routeSvc as any).getAll?.() ?? (this.routeSvc as any).getRoutes?.() ?? [];

    this.busesOpts = buses.map(b => ({ label: `${b.plate} — #${b.id}`, value: b.id! }));
    this.routesOpts = routes.map(r => ({ label: `${r.name} — #${r.id}`, value: r.id! }));

    // Suscribirse a cambios del parámetro :id
    this.sub = this.ar.paramMap.subscribe(pm => {
      const raw = pm.get('id');
      const id = raw !== null ? Number(raw) : NaN;

      if (Number.isNaN(id)) {
        console.error('[UpdateIncidence] id inválido en la ruta:', raw);
        alert('Ruta inválida: id de incidencia no es un número');
        this.router.navigate(['/incidence']);
        return;
      }

      const found = this.incSvc.getById(id);
      if (!found) {
        console.warn('[UpdateIncidence] Incidencia no encontrada para id=', id);
        alert('Incidencia no encontrada');
        this.router.navigate(['/incidence']);
        return;
      }

      // clonar para no mutar el store directamente
      this.form = { ...found };
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  onReportedAtChange(ev: Event) {
    const el = ev.target as HTMLInputElement;
    if (el.value) this.form.reportedAt = new Date(el.value);
  }

  onResolvedAtChange(ev: Event) {
    const el = ev.target as HTMLInputElement;
    this.form.resolvedAt = el.value ? new Date(el.value) : undefined;
  }

  save() {
    if (!this.form.busId || !this.form.routeId || !this.form.description?.trim() || !this.form.reportedBy?.trim()) {
      alert('Completa: Bus, Ruta, Descripción y Reportado por');
      return;
    }
    this.form.updatedAt = new Date();
    this.incSvc.update(this.form);
    this.router.navigate(['/incidence']);
  }

  cancel() {
    this.router.navigate(['/incidence']);
  }
}
