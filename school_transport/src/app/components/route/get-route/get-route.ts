import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

import { RoutesService } from '../../services/routes.service';
import { RouteI } from '../../models/routes.models';

@Component({
  selector: 'app-get-route',
  standalone: true,
  imports: [CommonModule, RouterModule, TableModule, TagModule, ButtonModule],
  templateUrl: './get-route.html',
  styleUrl: './get-route.css'
})
export class GetRoute implements OnInit, OnDestroy {
  routes: RouteI[] = [];
  private subscription?: { unsubscribe: () => void };

  constructor(private readonly routesService: RoutesService) {}

  ngOnInit(): void {
    this.subscription = this.routesService.routes$.subscribe(routes => (this.routes = routes));
    this.routesService.loadAll();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  delete(id: number | undefined) {
    if (!id || !confirm('¿Eliminar la ruta seleccionada?')) {
      return;
    }
    this.routesService.delete(id).subscribe({
      error: () => alert('No se pudo eliminar la ruta.')
    });
  }

  deactivate(id: number | undefined) {
    if (!id || !confirm('¿Marcar esta ruta como INACTIVA?')) {
      return;
    }
    this.routesService.deactivate(id).subscribe({
      error: () => alert('No se pudo actualizar el estado.')
    });
  }
}
