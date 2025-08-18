import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface CustomMenuItem extends MenuItem {
  smallText?: string; // extensión para subtítulo
}

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './aside.html',
  styleUrls: ['./aside.css']
})
export class Aside implements OnInit {
  items: CustomMenuItem[] = [];
  activeItem: CustomMenuItem | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Rutas',
        icon: 'pi pi-map',
        smallText: 'Gestión de rutas',
        command: () => this.setActive(this.items[0])
      },
      {
        label: 'Usuarios',
        icon: 'pi pi-users',
        smallText: 'Administración de usuarios',
        command: () => this.setActive(this.items[1])
      },
      {
        label: 'Formulario',
        icon: 'pi pi-file-edit',
        smallText: 'Formularios del sistema',
        command: () => this.setActive(this.items[2])
      },
      {
        label: 'Incidentes',
        icon: 'pi pi-exclamation-triangle',
        smallText: 'Registro de incidentes',
        command: () => this.setActive(this.items[3])
      },
      {
        label: 'Buses',
        icon: 'pi pi-car',
        smallText: 'Gestión de flota',
        items: [
          {
            label: 'Mantenimiento',
            icon: 'pi pi-wrench',
          },
          {
            label: 'Conductores',
            icon: 'pi pi-users',
            items: [
              {
                label: 'Registrar conductor',
                icon: 'pi pi-user-plus',
              },
              {
                label: 'Listado conductores',
                icon: 'pi pi-list',
              }
            ]
          }
        ]
      }
    ];

    this.activeItem = this.items[0];
  }

  setActive(item: CustomMenuItem) {
    this.activeItem = item;
  }
}
