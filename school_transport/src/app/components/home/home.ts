import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="p-6">
      <h1 class="text-2xl font-bold mb-2">Bienvenido</h1>
      <p class="text-gray-700">Selecciona una opción del menú para empezar.</p>
    </section>
  `
})
export class HomePage {}

