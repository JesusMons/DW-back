import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

type RutaEstado = 'ACTIVA' | 'INACTIVA' | 'MANTENIMIENTO';

export interface Ruta {
  id: string;
  nombre: string;
  origen: string;
  destino: string;
  horaSalida: string;
  bus: string;
  conductor: string;
  cupos: number;
  estado: RutaEstado;
}

@Component({
  selector: 'app-editar-rutas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './editar-rutas.html',
  styleUrls: ['./editar-rutas.css']
})
export class EditarRutas implements OnInit {
  ruta: Ruta | null = null;
  estados: RutaEstado[] = ['ACTIVA', 'INACTIVA', 'MANTENIMIENTO'];
  guardado = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    // ⚡ Aquí simulas carga desde backend
    this.ruta = {
      id: id ?? '',
      nombre: 'Ruta de ejemplo',
      origen: 'Barrio El Prado',
      destino: 'Colegio Central',
      horaSalida: '06:30',
      bus: 'BUS-12',
      conductor: 'Carlos Pérez',
      cupos: 28,
      estado: 'ACTIVA'
    };
  }

  guardar(form: NgForm) {
    if (form.invalid || !this.ruta) return;

    // Aquí enviarías los cambios al backend con HttpClient
    this.guardado = true;

    // Redirigir al listado después de 1.5s
    setTimeout(() => {
      this.router.navigate(['/mostrar-rut']);
    }, 1500);
  }
}
