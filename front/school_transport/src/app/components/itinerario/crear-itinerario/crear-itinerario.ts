import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

export interface Itinerario {
  id: string;
  ruta: string;
  fecha: string;       // formato YYYY-MM-DD
  hora: string;        // formato HH:mm
  paradas: string;
  observaciones: string;
}

@Component({
  selector: 'app-crear-itinerario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crear-itinerario.html',
  styleUrls: ['./crear-itinerario.css']
})
export class CrearItinerario {
  itinerario: Itinerario = {
    id: '',
    ruta: '',
    fecha: '',
    hora: '',
    paradas: '',
    observaciones: ''
  };

  creado = false;

  constructor(private router: Router) {}

  crear(form: NgForm) {
    if (form.invalid) return;

    // 👉 Aquí luego se haría el POST al backend
    // this.http.post('/api/itinerarios', this.itinerario).subscribe(...)

    this.creado = true;

    // Redirigir al listado después de 1.5s
    setTimeout(() => {
      this.router.navigate(['/mostrar-itinerarios']); // ajusta la ruta según tu app
    }, 1500);
  }
}
