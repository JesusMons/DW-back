import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesService } from '../../services/routes.service';
import { RouteI } from '../../models/routes.models';

@Component({
  selector: 'app-update-route',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-route.html'
})
export class UpdateRoute implements OnInit {
  routeId!: number;
  routeData!: RouteI;

  stops: string[] = [];
  schedules: string[] = [];
  stopInput = '';
  scheduleInput = '';

  constructor(
    private routeService: RoutesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Obtener id de la URL
    this.routeId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    // Buscar la ruta en el servicio
    const route = this.routeService.getRoutes().find(r => r.id === this.routeId);
    if (route) {
      this.routeData = { ...route };
      this.stops = [...route.stops];
      this.schedules = [...route.schedule];
    } else {
      alert('Ruta no encontrada');
      this.router.navigate(['/mostrar-rutas']);
    }
  }

  addStop() {
    if (this.stopInput.trim()) {
      this.stops.push(this.stopInput.trim());
      this.stopInput = '';
    }
  }

  removeStop(index: number) {
    this.stops.splice(index, 1);
  }

  addSchedule() {
    if (this.scheduleInput.trim()) {
      this.schedules.push(this.scheduleInput.trim());
      this.scheduleInput = '';
    }
  }

  removeSchedule(index: number) {
    this.schedules.splice(index, 1);
  }

  updateRoute() {
    const updatedRoute: RouteI = {
      ...this.routeData,
      stops: this.stops,
      schedule: this.schedules,
      updatedAt: new Date()
    };

    // 🔹 Lógica para reemplazar la ruta en el servicio
    const routes = this.routeService.getRoutes();
    const idx = routes.findIndex(r => r.id === updatedRoute.id);
    if (idx !== -1) {
      routes[idx] = updatedRoute;
      this.routeService['routeService'].next([...routes]); // forzar actualización
      alert('Ruta actualizada con éxito ✅');
      this.router.navigate(['/routes']);
    }
  }
}
