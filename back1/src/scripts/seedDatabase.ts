import 'dotenv/config';
import { faker } from '@faker-js/faker';
import sequelize, { testConnection } from '../database/db';
import { Guardian, GuardianStatus } from '../database/models/guardian';
import { Student, StudentStatus } from '../database/models/student';
import { Driver, DriverStatus } from '../database/models/driver';
import { Bus, BusStatus } from '../database/models/bus';
import { Route, RouteStatus } from '../database/models/route';
import { Stop, StopStatus } from '../database/models/stop';
import { RouteStop } from '../database/models/routeStop';
import { RouteAssignment, AssignmentStatus } from '../database/models/routeAssignment';
import { Itinerary, ItineraryStatus } from '../database/models/itinerari';
import { ItineraryStopSchedule } from '../database/models/ItineraryStopSchedule';
import { Assistance, AssistanceStatus } from '../database/models/assistance';
import { Incidence, IncidenceSeverity, IncidenceStatus } from '../database/models/incidence';
import { Maintenance, MaintenanceStatus, MaintenanceType } from '../database/models/maintenance';

const pickRandomSubset = <T>(items: T[], min: number, max: number): T[] => {
  if (!items.length) {
    return [];
  }
  const safeMax = Math.min(max, items.length);
  const safeMin = Math.min(min, safeMax);
  const count = faker.number.int({ min: safeMin, max: safeMax });
  return faker.helpers.shuffle([...items]).slice(0, count);
};

const randomTime = (startHour: number, endHour: number): string => {
  const hour = faker.number.int({ min: startHour, max: endHour });
  const minute = faker.number.int({ min: 0, max: 59 });
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;
};

const createGuardiansIfNeeded = async (target: number): Promise<Guardian[]> => {
  let guardians = await Guardian.findAll();
  if (guardians.length) {
    console.log(`Guardians encontrados: ${guardians.length}.`);
    return guardians;
  }

  console.log(`Creando ${target} tutores...`);
  for (let i = 0; i < target; i += 1) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const document = faker.string.numeric({ length: 10, allowLeadingZeros: false });
    const relationship = faker.helpers.arrayElement(['Padre', 'Madre', 'Tío/Tía', 'Hermano/a', 'Tutor legal']);
    const status: GuardianStatus = faker.helpers.arrayElement(['ACTIVO', 'INACTIVO']);

    const guardian = await Guardian.create({
      firstName,
      lastName,
      document,
      phone: `09${faker.string.numeric({ length: 8 })}`,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      relationship,
      address: faker.location.streetAddress(),
      status,
    });

    guardians.push(guardian);
  }

  return guardians;
};

const createStudentsIfNeeded = async (target: number, guardians: Guardian[]): Promise<Student[]> => {
  let students = await Student.findAll();
  if (students.length) {
    console.log(`Estudiantes encontrados: ${students.length}.`);
    return students;
  }

  console.log(`Creando ${target} estudiantes...`);
  for (let i = 0; i < target; i += 1) {
    const guardian = guardians.length ? faker.helpers.arrayElement(guardians) : null;
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const status: StudentStatus = faker.helpers.arrayElement(['ACTIVO', 'INACTIVO', 'GRADUADO']);

    const student = await Student.create({
      name: firstName,
      lastName,
      document: faker.string.numeric({ length: 10, allowLeadingZeros: false }),
      guardianId: guardian?.id ?? null,
      grade: faker.number.int({ min: 1, max: 11 }),
      birthdate: faker.date.birthdate({ min: 5, max: 17, mode: 'age' }),
      address: guardian?.address ?? faker.location.streetAddress(),
      phone: `09${faker.string.numeric({ length: 8 })}`,
      guardianPhone: guardian?.phone ?? `09${faker.string.numeric({ length: 8 })}`,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      status,
      allergies: faker.helpers.maybe(() => pickRandomSubset([
        'Penicilina',
        'Maní',
        'Lácteos',
        'Picaduras de insectos',
        'Gluten',
      ], 1, 2), { probability: 0.3 }),
      emergencyContact: guardian
        ? { name: `${guardian.firstName} ${guardian.lastName}`, phone: guardian.phone, relationship: guardian.relationship }
        : {
            name: faker.person.fullName(),
            phone: `09${faker.string.numeric({ length: 8 })}`,
            relationship: faker.helpers.arrayElement(['Abuelo/a', 'Hermano/a', 'Tía/Tío']),
          },
    });

    students.push(student);
  }

  return students;
};

const createBusesIfNeeded = async (target: number): Promise<Bus[]> => {
  let buses = await Bus.findAll();
  if (buses.length) {
    console.log(`Buses encontrados: ${buses.length}.`);
    return buses;
  }

  console.log(`Creando ${target} buses...`);
  for (let i = 0; i < target; i += 1) {
    const status: BusStatus = faker.helpers.arrayElement(['ACTIVO', 'INACTIVO', 'EN MANTENIMIENTO']);
    const bus = await Bus.create({
      plate: `${faker.string.alphanumeric({ length: 3, casing: 'upper' })}-${faker.string.numeric({ length: 3, allowLeadingZeros: false })}`,
      capacity: faker.number.int({ min: 28, max: 45 }),
      mileage: faker.number.int({ min: 5_000, max: 120_000 }),
      model: faker.vehicle.model(),
      brand: faker.vehicle.manufacturer(),
      year: faker.number.int({ min: 2015, max: 2024 }),
      color: faker.vehicle.color(),
      status,
      insuranceExpiry: faker.date.future({ years: 2 }),
      lastMaintenance: faker.date.past({ years: 0.5 }),
      nextMaintenance: faker.date.future({ years: 0.5 }),
    });
    buses.push(bus);
  }

  return buses;
};

const createDriversIfNeeded = async (target: number, buses: Bus[]): Promise<Driver[]> => {
  let drivers = await Driver.findAll();
  if (drivers.length) {
    console.log(`Conductores encontrados: ${drivers.length}.`);
    return drivers;
  }

  console.log(`Creando ${target} conductores...`);
  for (let i = 0; i < target; i += 1) {
    const status: DriverStatus = faker.helpers.arrayElement(['ACTIVO', 'INACTIVO', 'SUSPENDIDO']);
    const bus = buses.length ? faker.helpers.arrayElement(buses) : null;

    const driver = await Driver.create({
      name: faker.person.fullName(),
      document: faker.string.numeric({ length: 10, allowLeadingZeros: false }),
      phone: `09${faker.string.numeric({ length: 8 })}`,
      email: faker.internet.email().toLowerCase(),
      address: faker.location.streetAddress(),
      typeLicence: faker.helpers.arrayElement(['A', 'B', 'C', 'D', 'E']),
      licenceExpiry: faker.date.future({ years: 3 }),
      experienceYears: faker.number.int({ min: 2, max: 20 }),
      status,
      assignedBusId: bus?.id ?? null,
      photoUrl: faker.image.urlPicsumPhotos({ width: 200, height: 200 }),
    });

    drivers.push(driver);
  }

  return drivers;
};

const createRoutesIfNeeded = async (target: number, buses: Bus[], drivers: Driver[]): Promise<Route[]> => {
  let routes = await Route.findAll();
  if (routes.length) {
    console.log(`Rutas encontradas: ${routes.length}.`);
    return routes;
  }

  console.log(`Creando ${target} rutas...`);
  const districts = faker.helpers.arrayElements([
    'Centro Histórico',
    'La Floresta',
    'Cumbayá',
    'Guápulo',
    'Carcelén',
    'Los Chillos',
    'San Rafael',
    'El Condado',
    'Valle de los Chillos',
    'Calderón',
  ], target * 2);

  for (let i = 0; i < target; i += 1) {
    const currentBus = buses.length ? faker.helpers.arrayElement(buses) : null;
    const currentDriver = drivers.length ? faker.helpers.arrayElement(drivers) : null;
    const status: RouteStatus = faker.helpers.arrayElement(['ACTIVE', 'INACTIVE']);

    const route = await Route.create({
      name: `Ruta ${faker.string.alphanumeric({ length: 4, casing: 'upper' })}`,
      startPoint: districts[i],
      endPoint: districts[target + i] ?? faker.location.city(),
      currentBusId: currentBus?.id ?? null,
      currentDriverId: currentDriver?.id ?? null,
      status,
    });

    routes.push(route);
  }

  return routes;
};

const createStopsIfNeeded = async (target: number): Promise<Stop[]> => {
  let stops = await Stop.findAll();
  if (stops.length) {
    console.log(`Paradas encontradas: ${stops.length}.`);
    return stops;
  }

  console.log(`Creando ${target} paradas...`);
  for (let i = 0; i < target; i += 1) {
    const status: StopStatus = faker.helpers.arrayElement(['ACTIVA', 'INACTIVA']);
    const stop = await Stop.create({
      name: `Parada ${faker.location.street()}`,
      direction: faker.location.direction(),
      orderHint: i + 1,
      landmark: faker.location.secondaryAddress(),
      status,
    });
    stops.push(stop);
  }

  return stops;
};

const createRouteStopsIfNeeded = async (routes: Route[], stops: Stop[]): Promise<void> => {
  const existing = await RouteStop.count();
  if (existing) {
    console.log(`Asignaciones de paradas encontradas: ${existing}.`);
    return;
  }

  if (!routes.length || !stops.length) {
    console.log('No hay rutas o paradas suficientes para asociar.');
    return;
  }

  console.log('Vinculando paradas a rutas...');
  for (const route of routes) {
    const selectedStops = pickRandomSubset(stops, 3, Math.min(6, stops.length));
    selectedStops.sort((a, b) => (a.orderHint ?? 0) - (b.orderHint ?? 0));

    let position = 1;
    for (const stop of selectedStops) {
      await RouteStop.create({
        routeId: route.id,
        stopId: stop.id,
        position,
        scheduledTimeHint: randomTime(6, 9),
      });
      position += 1;
    }
  }
};

const createRouteAssignmentsIfNeeded = async (routes: Route[], buses: Bus[], drivers: Driver[]): Promise<void> => {
  const existing = await RouteAssignment.count();
  if (existing) {
    console.log(`Asignaciones de rutas encontradas: ${existing}.`);
    return;
  }

  if (!routes.length || !buses.length) {
    console.log('No hay rutas o buses suficientes para asignaciones históricas.');
    return;
  }

  console.log('Creando asignaciones históricas de rutas...');
  for (const route of routes) {
    const bus = faker.helpers.arrayElement(buses);
    const driver = drivers.length ? faker.helpers.arrayElement(drivers) : null;
    const status: AssignmentStatus = faker.helpers.arrayElement(['ACTIVO', 'INACTIVO']);

    const startDate = faker.date.past({ years: 1 });
    const endDate = faker.helpers.maybe(() => faker.date.future({ years: 0.5, refDate: startDate }), { probability: 0.3 });

    await RouteAssignment.create({
      routeId: route.id,
      busId: bus.id,
      driverId: driver?.id ?? null,
      startDate,
      endDate: endDate ?? null,
      status,
    });
  }
};

const createItinerariesIfNeeded = async (routes: Route[], buses: Bus[], drivers: Driver[]): Promise<Itinerary[]> => {
  let itineraries = await Itinerary.findAll();
  if (itineraries.length) {
    console.log(`Itinerarios encontrados: ${itineraries.length}.`);
    return itineraries;
  }

  if (!routes.length || !buses.length || !drivers.length) {
    console.log('Faltan rutas, buses o conductores para generar itinerarios.');
    return [];
  }

  console.log('Creando itinerarios...');
  for (const route of routes) {
    const baseDate = faker.date.recent({ days: 10 });
    for (let i = 0; i < 2; i += 1) {
      const bus = faker.helpers.arrayElement(buses);
      const driver = faker.helpers.arrayElement(drivers);
      const departure = randomTime(6, 8);
      const arrival = randomTime(9, 12);
      const status: ItineraryStatus = faker.helpers.arrayElement(['PLANEADO', 'EN PROGRESO', 'COMPLETADO', 'CANCELADO']);

      const itinerary = await Itinerary.create({
        routeId: route.id,
        date: faker.date.soon({ days: 15, refDate: baseDate }),
        departureTime: departure,
        arrivalTime: arrival,
        driverId: driver.id,
        busId: bus.id,
        status,
        notes: faker.helpers.maybe(() => faker.lorem.sentence(), { probability: 0.4 }),
      });

      itineraries.push(itinerary);
    }
  }

  return itineraries;
};

const createItineraryStopsIfNeeded = async (itineraries: Itinerary[]): Promise<void> => {
  const existing = await ItineraryStopSchedule.count();
  if (existing) {
    console.log(`Horarios de paradas en itinerarios encontrados: ${existing}.`);
    return;
  }

  if (!itineraries.length) {
    console.log('No hay itinerarios para asociar paradas.');
    return;
  }

  console.log('Asignando paradas a itinerarios...');
  for (const itinerary of itineraries) {
    const routeStops = await RouteStop.findAll({ where: { routeId: itinerary.routeId }, order: [['position', 'ASC']] });

    if (!routeStops.length) {
      continue;
    }

    let offsetMinutes = 0;
    for (const routeStop of routeStops) {
      offsetMinutes += faker.number.int({ min: 5, max: 15 });
      const [hourStr, minuteStr] = itinerary.departureTime.split(':');
      const hour = Number.parseInt(hourStr ?? '0', 10);
      const minute = Number.parseInt(minuteStr ?? '0', 10);
      const baseMinutes = hour * 60 + minute + offsetMinutes;
      const scheduledHour = Math.floor(baseMinutes / 60) % 24;
      const scheduledMinute = baseMinutes % 60;

      await ItineraryStopSchedule.create({
        itineraryId: itinerary.id,
        stopId: routeStop.stopId,
        scheduledTime: `${scheduledHour.toString().padStart(2, '0')}:${scheduledMinute
          .toString()
          .padStart(2, '0')}:00`,
      });
    }
  }
};

const createAssistancesIfNeeded = async (students: Student[], routes: Route[], buses: Bus[]): Promise<void> => {
  const existing = await Assistance.count();
  if (existing) {
    console.log(`Registros de asistencia encontrados: ${existing}.`);
    return;
  }

  if (!students.length || !routes.length || !buses.length) {
    console.log('Faltan estudiantes, rutas o buses para registrar asistencias.');
    return;
  }

  console.log('Creando asistencias...');
  for (const student of students) {
    const route = faker.helpers.arrayElement(routes);
    const bus = faker.helpers.arrayElement(buses);
    const status: AssistanceStatus = faker.helpers.arrayElement(['CONFIRMADO', 'AUSENTE', 'CANCELADO']);

    await Assistance.create({
      studentId: student.id,
      routeId: route.id,
      busId: bus.id,
      date: faker.date.recent({ days: 20 }),
      time: randomTime(6, 9),
      status,
    });
  }
};

const createIncidencesIfNeeded = async (routes: Route[], buses: Bus[]): Promise<void> => {
  const existing = await Incidence.count();
  if (existing) {
    console.log(`Incidencias encontradas: ${existing}.`);
    return;
  }

  if (!routes.length || !buses.length) {
    console.log('Faltan rutas o buses para registrar incidencias.');
    return;
  }

  console.log('Creando incidencias...');
  for (let i = 0; i < Math.max(3, routes.length); i += 1) {
    const route = faker.helpers.arrayElement(routes);
    const bus = faker.helpers.arrayElement(buses);
    const severity: IncidenceSeverity = faker.helpers.arrayElement(['BAJA', 'MEDIA', 'ALTA', 'CRITICA']);
    const status: IncidenceStatus = faker.helpers.arrayElement(['ABIERTA', 'EN PROGRESO', 'RESUELTO', 'CERRADO']);
    const reportedAt = faker.date.recent({ days: 40 });

    await Incidence.create({
      routeId: route.id,
      busId: bus.id,
      description: faker.lorem.sentences(faker.number.int({ min: 1, max: 2 })),
      severity,
      status,
      reportedAt,
      resolvedAt: faker.helpers.maybe(() => faker.date.soon({ days: 10, refDate: reportedAt }), { probability: 0.4 }),
      reportedBy: faker.person.fullName(),
      actionsTaken: faker.helpers.maybe(() => faker.lorem.sentence(), { probability: 0.5 }),
    });
  }
};

const createMaintenancesIfNeeded = async (buses: Bus[]): Promise<void> => {
  const existing = await Maintenance.count();
  if (existing) {
    console.log(`Mantenimientos encontrados: ${existing}.`);
    return;
  }

  if (!buses.length) {
    console.log('No hay buses para registrar mantenimientos.');
    return;
  }

  console.log('Creando mantenimientos...');
  for (const bus of buses) {
    const type: MaintenanceType = faker.helpers.arrayElement(['PREVENTIVO', 'CORRECTIVO', 'INSPECCION']);
    const status: MaintenanceStatus = faker.helpers.arrayElement(['PENDIENTE', 'EN PROGRESO', 'COMPLETADO']);
    const performedAt = faker.date.recent({ days: 90 });

    await Maintenance.create({
      busId: bus.id,
      type,
      description: faker.vehicle.vehicle(),
      cost: faker.number.float({ min: 150, max: 1200, fractionDigits: 2 }),
      performedAt,
      nextDueDate: faker.helpers.maybe(() => faker.date.soon({ days: 120, refDate: performedAt }), { probability: 0.6 }),
      status,
      mechanic: faker.person.fullName(),
      odometer: faker.number.int({ min: 10_000, max: 120_000 }),
    });
  }
};

const main = async () => {
  try {
    await testConnection();
    await sequelize.sync();

    const guardians = await createGuardiansIfNeeded(10);
    const students = await createStudentsIfNeeded(20, guardians);
    const buses = await createBusesIfNeeded(6);
    const drivers = await createDriversIfNeeded(8, buses);
    const routes = await createRoutesIfNeeded(4, buses, drivers);
    const stops = await createStopsIfNeeded(12);

    await createRouteStopsIfNeeded(routes, stops);
    await createRouteAssignmentsIfNeeded(routes, buses, drivers);

    const itineraries = await createItinerariesIfNeeded(routes, buses, drivers);
    await createItineraryStopsIfNeeded(itineraries);

    await createAssistancesIfNeeded(students, routes, buses);
    await createIncidencesIfNeeded(routes, buses);
    await createMaintenancesIfNeeded(buses);

    console.log('✅ Datos de prueba generados correctamente.');
  } catch (error) {
    console.error('❌ Error generando datos de prueba:', error);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
};

void main();

// npm run seed
