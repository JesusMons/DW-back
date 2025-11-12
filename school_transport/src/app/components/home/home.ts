import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

// Servicios (ajusta rutas de import a tu estructura real)
import { BusService } from '../services/bus.service';
import { StudentService } from '../services/student.service';
import { RoutesService } from '../services/routes.service';
import { RouteAssignmentService } from '../services/route-assignment.service';

// Modelos (opcional)
import { busI } from '../models/bus.models';
import { StudentI } from '../models/student.models';
import { RouteI } from '../models/routes.models';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  template: `
  <section class="p-6">
    <h1 class="text-2xl font-bold mb-6">Bienvenido</h1>

    <!-- Tarjetas -->
    <div class="grid gap-6 md:grid-cols-3 xl:grid-cols-3 mb-12">
      <!-- Buses en uso -->
      <div class="relative flex flex-col bg-white rounded-xl shadow-md text-gray-700">
        <div class="absolute -mt-4 mx-4 h-16 w-16 grid place-items-center rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2 7c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v9c0 1.1-.9 2-2 2h-1v1a1 1 0 01-2 0v-1H7v1a1 1 0 01-2 0v-1H4c-1.1 0-2-.9-2-2V7zm2 0v9h16V7H4zm2 10a1 1 0 100 2 1 1 0 000-2zm12 0a1 1 0 100 2 1 1 0 000-2zM6 9h2v3H6V9zm4 0h6v3h-6V9z"/>
          </svg>
        </div>
        <div class="p-4 text-right">
          <p class="text-sm text-gray-500">BUSES EN USO</p>
          <h4 class="text-2xl font-semibold text-gray-900">{{ busesEnUso }}</h4>
        </div>
        <div class="p-4 border-t border-gray-200">
          <p class="text-base text-gray-600">
            <strong class="text-green-500">TOTALES:</strong> {{ totalBuses }}
          </p>
        </div>
      </div>

      <!-- Estudiantes asignados -->
      <div class="relative flex flex-col bg-white rounded-xl shadow-md text-gray-700">
        <div class="absolute -mt-4 mx-4 h-16 w-16 grid place-items-center rounded-xl bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <div class="p-4 text-right">
          <p class="text-sm text-gray-500">ESTUDIANTES ASIGNADOS</p>
          <h4 class="text-2xl font-semibold text-gray-900">{{ totalEstudiantes }}</h4>
        </div>
        <div class="p-4 border-t border-gray-200">
          <p class="text-base text-gray-600"><strong class="text-red-500"></strong></p>
        </div>
      </div>

      <!-- Rutas activas -->
      <div class="relative flex flex-col bg-white rounded-xl shadow-md text-gray-700">
        <div class="absolute -mt-4 mx-4 h-16 w-16 grid place-items-center rounded-xl bg-gradient-to-tr from-yellow-600 to-yellow-400 text-white shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/>
          </svg>
        </div>
        <div class="p-4 text-right">
          <p class="text-sm text-gray-500">RUTAS ACTIVAS</p>
          <h4 class="text-2xl font-semibold text-gray-900">{{ rutasActivas }}</h4>
        </div>
        <div class="p-4 border-t border-gray-200">
          <p class="text-base text-gray-600"><strong class="text-blue-500"></strong></p>
        </div>
      </div>
    </div>

    <!-- Mapa de demostración -->
    <div class="w-full h-[400px] mt-6 rounded-2xl overflow-hidden shadow-md">
      <iframe
        width="100%"
        height="100%"
        frameborder="0"
        style="border:0"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093745!2d144.9537363155047!3d-37.81720974202198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f7f7fb%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1632380192345!5m2!1sen!2sus"
        allowfullscreen=""
        aria-hidden="false"
        tabindex="0">
      </iframe>
    </div>
  </section>
  `
})
export class HomePage implements OnDestroy {
  // datos base
  buses: busI[] = [];
  estudiantes: StudentI[] = [];
  rutas: RouteI[] = [];

  // métricas
  totalBuses = 0;
  busesEnUso = 0;
  totalEstudiantes = 0;
  rutasActivas = 0;

  private studentSub?: { unsubscribe: () => void };

  constructor(
    private busSvc: BusService,
    private studentSvc: StudentService,
    private raSvc: RouteAssignmentService,
    private routesSvcA?: RoutesService,     // cualquiera de los dos
    private routesSvcB?: RoutesService    // según cómo lo hayas registrado
  ) {
    // cargar catálogos
    this.buses = (this.busSvc as any).getAll?.() ?? [];
    this.studentSub = this.studentSvc.students$.subscribe(students => {
      this.estudiantes = students;
      this.totalEstudiantes = students.length;
    });
    this.studentSvc.loadAll();

    // soporte para RoutesService o RoutesServiceTs
    const routesService: any = this.routesSvcA ?? this.routesSvcB;
    this.rutas = routesService?.getAll?.() ?? routesService?.getRoutes?.() ?? [];

    // calcular métricas
    this.totalBuses = this.buses.length;
    // buses en uso: asignaciones activas hoy (únicos busId)
    const today = new Date();
    const activasHoy = this.raSvc.getActiveOn?.(today) ?? [];
    const busIdsUnicos = new Set(activasHoy.map((a: any) => a.busId));
    this.busesEnUso = busIdsUnicos.size;

    // rutas activas: por status del catálogo (o por asignaciones activas si prefieres)
    this.rutasActivas = this.rutas.filter(r => (r as any).status === 'ACTIVO').length;
    // Si prefieres por asignaciones activas:
    // const rutasUnicas = new Set(activasHoy.map((a: any) => a.routeId));
    // this.rutasActivas = rutasUnicas.size;
  }

  ngOnDestroy(): void {
    this.studentSub?.unsubscribe();
  }
}
