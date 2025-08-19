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
        command: () => this.setActive(this.items[0])
      },
      {
        label: 'Usuarios',
        icon: 'pi pi-users',
        command: () => this.setActive(this.items[1])
      },
      {
        label: 'Formulario',
        icon: 'pi pi-file-edit',
        command: () => this.setActive(this.items[2])
      },
      {
        label: 'Incidentes',
        icon: 'pi pi-exclamation-triangle',
        command: () => this.setActive(this.items[3])
      },
      {
        label: 'Buses',
        icon: 'pi pi-car',
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

  toggleSubmenu(event: Event, item: any) {
  event.preventDefault();
  if (item.items) {
    item.expanded = !item.expanded;
  } else {
    // Navegar al enlace si no tiene subitems
    window.location.href = item.url || '#';
  }
}
}
