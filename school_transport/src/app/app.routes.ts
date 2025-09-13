import { Routes } from '@angular/router';
import { HomePage } from './components/home/home';
import { GetRoute } from './components/route/get-route/get-route';
import { AddRoute } from './components/route/add-route/add-route';
import { UpdateRoute } from './components/route/update-route/update-route'
import { GetItinerary } from './components/itinerary/get-itinerary/get-itinerary'
import { AddItinerary } from './components/itinerary/add-itinerary/add-itinerary';
import { UpdateItinerary } from './components/itinerary/update-itinerary/update-itinerary';
import { GetStudent } from './components/student/get-student/get-student';
import { AddStudent } from './components/student/add-student/add-student';
import { UpdateStudent } from './components/student/update-student/update-student';
import { GetGuarden } from './components/guarden/get-guarden/get-guarden';
import { AddGuarden } from './components/guarden/add-guarden/add-guarden';
import { UpdateGuarden } from './components/guarden/update-guarden/update-guarden';
import { GetBus } from './components/bus/get-bus/get-bus';
import { AddBus } from './components/bus/add-bus/add-bus';
import { UpdateBus } from './components/bus/update-bus/update-bus';
import { GetStop } from './components/stop/get-stop/get-stop';
import { AddStop } from './components/stop/add-stop/add-stop';
import { UpdateStop } from './components/stop/update-stop/update-stop';
import { GetIncidence } from './components/incidence/get-incidence/get-incidence';
import { AddIncidence } from './components/incidence/add-incidence/add-incidence';
import { UpdateIncidence } from './components/incidence/update-incidence/update-incidence';
import { GetDriver } from './components/driver/get-driver/get-driver';
import { AddDriver } from './components/driver/add-driver/add-driver';
import { UpdateDriver } from './components/driver/update-driver/update-driver';
import { GetAssistance } from './components/assistance/get-assistance/get-assistance';
import { AddAssistance } from './components/assistance/add-assistance/add-assistance';
import { UpdateAssistance } from './components/assistance/update-assistance/update-assistance';
import { GetRA } from './components/route-assignment/get-ra/get-ra';
import { AddRA } from './components/route-assignment/add-ra/add-ra';
import { UpdateRA } from './components/route-assignment/update-ra/update-ra';
import { GetMantenimientoBus } from './components/mantenimientoBus/get-mantenimiento-bus/get-mantenimiento-bus';
import { AddMantenimientoBus } from './components/mantenimientoBus/add-mantenimiento-bus/add-mantenimiento-bus';
import { UpdateMantenimientoBus } from './components/mantenimientoBus/update-mantenimiento-bus/update-mantenimiento-bus';

export const routes: Routes = [
  { path: '', component: HomePage },

  { path: 'routes', component: GetRoute, },
  { path: 'routes/add', component: AddRoute },
  { path: 'routes/edit/:id', component: UpdateRoute },

  { path: 'itinerary', component: GetItinerary },
  { path: 'itinerary/add', component: AddItinerary },
  { path: 'itinerary/edit/:id', component: UpdateItinerary },

  { path: 'student', component: GetStudent },
  { path: 'student/add', component: AddStudent },
  { path: 'student/edit/:id', component: UpdateStudent },

  { path: 'guardian', component: GetGuarden },
  { path: 'guardian/add', component: AddGuarden },
  { path: 'guardian/edit/:id', component: UpdateGuarden },

  { path: 'bus', component: GetBus },
  { path: 'bus/add', component: AddBus },
  { path: 'bus/edit/:id', component: UpdateBus },

  { path: 'incidence', component: GetIncidence },
  { path: 'incidence/add', component: AddIncidence },
  { path: 'incidence/edit/:id', component: UpdateIncidence },

  { path: 'parada', component: GetStop },
  { path: 'parada/add', component: AddStop },
  { path: 'parada/edit/:id', component: UpdateStop },

  { path: 'driver', component: GetDriver},
  { path: 'driver/add', component: AddDriver},
  { path: 'driver/edit/:id', component: UpdateDriver}, 

  { path: 'assistance', component: GetAssistance},
  { path: 'assistance/add', component: AddAssistance},
  { path: 'assistance/edit/:id', component: UpdateAssistance},

  { path: 'route-assignment', component: GetRA},
  { path: 'route-assignment/add', component: AddRA},
  { path: 'route-assignment/edit/:id', component: UpdateRA},

  { path: 'mantenimiento', component: GetMantenimientoBus},
  { path: 'mantenimiento/add', component: AddMantenimientoBus},
  { path: 'mantenimiento/edit/:id', component: UpdateMantenimientoBus},

];
