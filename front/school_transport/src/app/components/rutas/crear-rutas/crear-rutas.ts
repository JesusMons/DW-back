import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

type RutaEstado = 'ACTIVA' | 'INACTIVA' | 'MANTENIMIENTO';

export interface Ruta {
  id: string;
  nombre: string;
  origen: string;
  destino: string;
  horaSalida: string;   // 'HH:mm'
  bus: string;
  conductor: string;
  cupos: number;
  estado: RutaEstado;
}

@Component({
  selector: 'app-crear-rutas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crear-rutas.html',
  styleUrls: ['./crear-rutas.css']
})
export class CrearRutas {
  ruta: Ruta = {
    id: '',
    nombre: '',
    origen: '',
    destino: '',
    horaSalida: '06:30',
    bus: '',
    conductor: '',
    cupos: 0,
    estado: 'ACTIVA'
  };

  estados: RutaEstado[] = ['ACTIVA', 'INACTIVA', 'MANTENIMIENTO'];

  creado = false;

  constructor(private router: Router) {}

  crear(form: NgForm) {
    if (form.invalid) return;

    // Aquí luego harías la llamada al backend
    // this.http.post('/api/rutas', this.ruta).subscribe(...)

    this.creado = true;

    // 🚀 Redirigir después de un pequeño delay para mostrar el banner
    setTimeout(() => {
      this.router.navigate(['/mostrar-rut']);  // cambia '/mostrar-rut' por la ruta de tu listado
    }, 1500);
  }
}
