import { Routes } from '@angular/router';
import { App } from './app';
import { Home } from './components/home/home';
import { CrearRutas } from './components/rutas/crear-rutas/crear-rutas';
import { MostrarRut } from './components/rutas/mostrar-rut/mostrar-rut';
import { EditarRutas } from './components/rutas/editar-rutas/editar-rutas';
import { MostrarItinerario } from './components/itinerario/mostrar-itinerario/mostrar-itinerario';
import { CrearItinerario } from './components/itinerario/crear-itinerario/crear-itinerario';
import { EditarItinerario } from './components/itinerario/editar-itinerario/editar-itinerario';
import { MostrarEstudi } from './components/usuarios/estudiante/mostrar-estudi/mostrar-estudi';
import { CrearEstudi } from './components/usuarios/estudiante/crear-estudi/crear-estudi';
import { EditarEstudi } from './components/usuarios/estudiante/editar-estudi/editar-estudi';
import { MostrarEstudiDetalle } from './components/usuarios/estudiante/mostrar-estudi-detalle/mostrar-estudi-detalle';
import { MostrarAcudiente } from './components/usuarios/acudiente/mostrar-acudiente/mostrar-acudiente';
import { CrearAcudiente } from './components/usuarios/acudiente/crear-acudiente/crear-acudiente';
import { EditarAcudiente } from './components/usuarios/acudiente/editar-acudiente/editar-acudiente';
import { Inscribirse } from './components/formulario/inscribirse/inscribirse';
import { MostrarInscritos } from './components/formulario/mostrar-inscritos/mostrar-inscritos';
import { EditarInscripcion } from './components/formulario/editar-inscripcion/editar-inscripcion';
import { MostrarConductor } from './components/bus/conductor/mostrar-conductor/mostrar-conductor';
import { EditarConductor } from './components/bus/conductor/editar-conductor/editar-conductor';
import { CrearConductor } from './components/bus/conductor/crear-conductor/crear-conductor';
import { MostrarIncidencia } from './components/bus/incidencia/mostrar-incidencia/mostrar-incidencia';
import { EditarIncidencia } from './components/bus/incidencia/editar-incidencia/editar-incidencia';
import { CrearIncidencia } from './components/bus/incidencia/crear-incidencia/crear-incidencia';
// importa aquí también editar-rutas / mostrar-rut si los vas a usar

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'crear-rutas', component: CrearRutas },
  {path: 'mostrar-rutas', component: MostrarRut},
  { path: 'editar-ruta', component: EditarRutas },

  {path: 'mostrar-itinerario', component: MostrarItinerario},
  {path: 'crear-itinerario', component: CrearItinerario},
  {path: 'editar-itinerario', component: EditarItinerario},

  {path: 'estudiantes/listado', component: MostrarEstudi},
  {path: 'estudiantes/listado/editar/:id', component: EditarEstudi },
  {path: 'estudiantes/listado/detalle/:id', component: MostrarEstudiDetalle },
  {path: 'estudiantes/registrar', component: CrearEstudi},

  {path: 'acudientes/listado', component: MostrarAcudiente},
  {path: 'acudientes/registrar', component: CrearAcudiente},
  {path: 'acudientes/listado/editar/:id', component: EditarAcudiente},

  {path : 'formulario', component: Inscribirse },
  {path : 'listado-inscripciones', component: MostrarInscritos },
  {path : 'listado-inscripciones/editar/:id', component: EditarInscripcion },

  {path: 'bus/conductor', component: MostrarConductor},
  {path: 'bus/conductor/editar/:id', component: EditarConductor},
  {path: 'bus/conductor/crear', component: CrearConductor},

  {path: 'bus/incidentes', component: MostrarIncidencia},
  {path: 'bus/incidencias/editar/:id', component: EditarIncidencia},
  {path: 'bus/incidencias/crear', component: CrearIncidencia},
  { path: '**', redirectTo: '' }
];

