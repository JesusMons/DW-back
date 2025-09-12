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

export const routes: Routes = [
  {path: '',component: HomePage},
  
  {path: 'routes', component: GetRoute,},
  {path: 'routes/add', component: AddRoute},
  {path: 'routes/edit/:id', component: UpdateRoute},

  {path: 'itinerary', component: GetItinerary},
  {path: 'itinerary/add', component: AddItinerary},
  {path: 'itinerary/edit/:id', component: UpdateItinerary},

  {path: 'student', component: GetStudent}, 
  {path: 'student/add', component: AddStudent}, 
  {path: 'student/edit/:id', component: UpdateStudent}, 

  {path: 'guardian', component: GetGuarden},
  {path: 'guardian/add', component: AddGuarden},
  {path: 'guardian/edit/:id', component: UpdateGuarden},
 
];
