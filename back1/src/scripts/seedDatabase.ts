import 'dotenv/config';
import { faker } from '@faker-js/faker';
import { DataTypes, QueryInterface, QueryTypes } from 'sequelize';
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
import { RefreshToken } from '../database/models/auth/RefreshToken';
import { Resource } from '../database/models/auth/Resource';
import { ResourceRole } from '../database/models/auth/ResourceRole';
import { Role } from '../database/models/auth/Rol';
import { RoleUser } from '../database/models/auth/RolUser';
import { User } from '../database/models/auth/User';

const STATUS_ENUM = ['ACTIVO', 'INACTIVO'] as const;
type StatusValue = (typeof STATUS_ENUM)[number];

interface StatusMigrationConfig {
  table: string;
  column: string;
  oldColumn?: string;
  conversions?: Record<string, StatusValue>;
  defaultValue?: StatusValue;
  allowNull?: boolean;
}

const extractEnumValues = (rawType: string | undefined): string[] => {
  if (!rawType) return [];
  const match = rawType.match(/enum\s*\((.*)\)/i);
  if (!match?.[1]) return [];
  return match[1]
    .split(',')
    .map((value) => value.trim().replace(/^'(.*)'$/, '$1'));
};

const describeOrWarn = async (qi: QueryInterface, table: string): Promise<Record<string, any> | null> => {
  try {
    return await qi.describeTable(table);
  } catch (error) {
    console.warn(`⚠️  No se pudo describir la tabla ${table}:`, (error as Error).message);
    return null;
  }
};

const changeEnumIfNeeded = async (
  qi: QueryInterface,
  table: string,
  column: string,
  values: string[],
  allowNull: boolean,
  defaultValue: string | null
): Promise<void> => {
  const dialect = sequelize.getDialect();

  if (dialect === 'mssql') {
    const quotedTable = quoteIdentifier(table);
    const quotedColumn = quoteIdentifier(column);

    const existingConstraints = await sequelize.query<{ name: string }>(
      `SELECT cc.name AS name
         FROM sys.check_constraints cc
         INNER JOIN sys.columns col
           ON cc.parent_object_id = col.object_id
          AND cc.parent_column_id = col.column_id
         INNER JOIN sys.tables t
           ON t.object_id = cc.parent_object_id
        WHERE t.name = :table
          AND col.name = :column`,
      {
        replacements: { table, column },
        type: QueryTypes.SELECT,
      }
    );

    const defaultConstraints = await sequelize.query<{ name: string }>(
      `SELECT dc.name AS name
         FROM sys.default_constraints dc
         INNER JOIN sys.columns col
           ON dc.parent_object_id = col.object_id
          AND dc.parent_column_id = col.column_id
         INNER JOIN sys.tables t
           ON t.object_id = dc.parent_object_id
        WHERE t.name = :table
          AND col.name = :column`,
      {
        replacements: { table, column },
        type: QueryTypes.SELECT,
      }
    );

    for (const constraint of existingConstraints) {
      await sequelize.query(`ALTER TABLE ${quotedTable} DROP CONSTRAINT ${quoteIdentifier(constraint.name)}`);
    }

    for (const constraint of defaultConstraints) {
      await sequelize.query(`ALTER TABLE ${quotedTable} DROP CONSTRAINT ${quoteIdentifier(constraint.name)}`);
    }

    const constraintName =
      existingConstraints[0]?.name ??
      `${table}_${column}_enum_ck`.slice(0, 127);

    const nullability = allowNull ? 'NULL' : 'NOT NULL';

    await sequelize.query(`ALTER TABLE ${quotedTable} ALTER COLUMN ${quotedColumn} NVARCHAR(255) ${nullability}`);

    if (!values.length) {
      if (defaultValue !== null && defaultValue !== undefined) {
        const defaultConstraintName = `${table}_${column}_default_df`.slice(0, 127);
        const defaultLiteral = `N'${defaultValue.replace(/'/g, "''")}'`;
        await sequelize.query(
          `ALTER TABLE ${quotedTable} ADD CONSTRAINT ${quoteIdentifier(
            defaultConstraintName
          )} DEFAULT ${defaultLiteral} FOR ${quotedColumn}`
        );
      }
      return;
    }

    const uniqueValues = Array.from(
      new Set(values.map((value) => value.trim()))
    );
    const valueList = uniqueValues
      .map((value) => `N'${value.replace(/'/g, "''")}'`)
      .join(', ');

    await sequelize.query(
      `ALTER TABLE ${quotedTable} ADD CONSTRAINT ${quoteIdentifier(
        constraintName
      )} CHECK (${quotedColumn} IN (${valueList}))`
    );

    if (defaultValue !== null && defaultValue !== undefined) {
      const defaultConstraintName = `${table}_${column}_default_df`.slice(0, 127);
      const defaultLiteral = `N'${defaultValue.replace(/'/g, "''")}'`;
      await sequelize.query(
        `ALTER TABLE ${quotedTable} ADD CONSTRAINT ${quoteIdentifier(
          defaultConstraintName
        )} DEFAULT ${defaultLiteral} FOR ${quotedColumn}`
      );
    }

    return;
  }

  await qi.changeColumn(table, column, {
    type: DataTypes.ENUM(...values),
    allowNull,
    defaultValue,
  });
};

const extendEnumForConversions = async (
  qi: QueryInterface,
  table: string,
  column: string,
  conversions: Record<string, StatusValue>
): Promise<{ allowNull: boolean; defaultValue: string | null }> => {
  const definition = await describeOrWarn(qi, table);
  if (!definition) return { allowNull: false, defaultValue: null };
  const columnDefinition = definition[column];
  if (!columnDefinition) return { allowNull: false, defaultValue: null };

  const enumValues = extractEnumValues(columnDefinition.type);
  const allowNull = Boolean(columnDefinition.allowNull);
  const defaultValue = columnDefinition.defaultValue as string | null;

  const required = new Set<string>([
    ...enumValues,
    ...Object.keys(conversions),
    ...Object.values(conversions),
    ...STATUS_ENUM,
  ]);

  const newValues = Array.from(required);
  const hasAll = newValues.length === enumValues.length && newValues.every((value) => enumValues.includes(value));

  if (!enumValues.length || !hasAll) {
    await changeEnumIfNeeded(qi, table, column, newValues, allowNull, defaultValue);
  }

  return { allowNull, defaultValue };
};

const quoteIdentifier = (identifier: string): string => {
  const dialect = sequelize.getDialect();
  if (dialect === 'postgres') {
    return `"${identifier.replace(/"/g, '""')}"`;
  }
  if (dialect === 'mssql') {
    return `[${identifier.replace(/]/g, ']]')}]`;
  }
  return `\`${identifier.replace(/`/g, '``')}\``;
};

const runConversions = async (table: string, column: string, conversions: Record<string, StatusValue>): Promise<void> => {
  const quotedTable = quoteIdentifier(table);
  const quotedColumn = quoteIdentifier(column);
  const dialect = sequelize.getDialect();
  const whereClause =
    dialect === 'postgres' ? `${quotedColumn}::text = :from` : `${quotedColumn} = :from`;

  for (const [from, to] of Object.entries(conversions)) {
    if (from === to) continue;
    await sequelize.query(`UPDATE ${quotedTable} SET ${quotedColumn} = :to WHERE ${whereClause}`, {
      replacements: { from, to },
    });
  }
};

const finalizeEnum = async (
  qi: QueryInterface,
  table: string,
  column: string,
  allowNull: boolean,
  defaultValue: StatusValue
): Promise<void> => {
  await changeEnumIfNeeded(qi, table, column, [...STATUS_ENUM], allowNull, defaultValue);
};

const migrateStatusColumn = async (qi: QueryInterface, config: StatusMigrationConfig): Promise<void> => {
  const { table, column, oldColumn, conversions = {}, defaultValue = 'ACTIVO', allowNull = false } = config;

  const definition = await describeOrWarn(qi, table);
  if (!definition) return;

  const columnExists = column in definition;
  const oldColumnExists = oldColumn ? oldColumn in definition : false;

  if (!columnExists && !oldColumnExists) {
    await qi.addColumn(table, column, {
      type: DataTypes.ENUM(...STATUS_ENUM),
      allowNull,
      defaultValue,
    });
    return;
  }

  const workingColumn = columnExists ? column : (oldColumnExists ? oldColumn! : column);

  const { allowNull: currentAllowNull, defaultValue: currentDefault } = await extendEnumForConversions(
    qi,
    table,
    workingColumn,
    conversions
  );

  await runConversions(table, workingColumn, conversions);

  if (workingColumn !== column) {
    await qi.renameColumn(table, workingColumn, column);
  }

  const sanitizedDefault: StatusValue = STATUS_ENUM.includes((currentDefault as StatusValue) ?? defaultValue)
    ? ((currentDefault as StatusValue) ?? defaultValue)
    : defaultValue;

  await finalizeEnum(qi, table, column, currentAllowNull ?? allowNull, sanitizedDefault);
};

const ensureStatusSchema = async (): Promise<void> => {
  const qi = sequelize.getQueryInterface();

  const migrations: StatusMigrationConfig[] = [
    { table: 'roles', column: 'status', oldColumn: 'is_active', conversions: { ACTIVE: 'ACTIVO', INACTIVE: 'INACTIVO' } },
    { table: 'users', column: 'status', oldColumn: 'is_active', conversions: { ACTIVE: 'ACTIVO', INACTIVE: 'INACTIVO' } },
    { table: 'resources', column: 'status', oldColumn: 'is_active', conversions: { ACTIVE: 'ACTIVO', INACTIVE: 'INACTIVO' } },
    { table: 'resource_roles', column: 'status', oldColumn: 'is_active', conversions: { ACTIVE: 'ACTIVO', INACTIVE: 'INACTIVO' } },
    { table: 'role_users', column: 'status', oldColumn: 'is_active', conversions: { ACTIVE: 'ACTIVO', INACTIVE: 'INACTIVO' } },
    { table: 'refresh_tokens', column: 'status', oldColumn: 'is_valid', conversions: { ACTIVE: 'ACTIVO', INACTIVE: 'INACTIVO' } },
    { table: 'assistances', column: 'status', conversions: { CONFIRMADO: 'ACTIVO', AUSENTE: 'INACTIVO', CANCELADO: 'INACTIVO' } },
    { table: 'itinerary_stop_schedule', column: 'status', allowNull: false, defaultValue: 'ACTIVO' },
    { table: 'route_stops', column: 'status', allowNull: false, defaultValue: 'ACTIVO' },
    { table: 'buses', column: 'status', conversions: { 'EN MANTENIMIENTO': 'INACTIVO' } },
    { table: 'drivers', column: 'status', conversions: { SUSPENDIDO: 'INACTIVO' } },
    { table: 'incidences', column: 'status', conversions: { ABIERTA: 'ACTIVO', 'EN PROGRESO': 'ACTIVO', RESUELTO: 'INACTIVO', CERRADO: 'INACTIVO' } },
    { table: 'itineraries', column: 'status', conversions: { PLANEADO: 'ACTIVO', 'EN PROGRESO': 'ACTIVO', COMPLETADO: 'INACTIVO', CANCELADO: 'INACTIVO' } },
    { table: 'maintenances', column: 'status', conversions: { PENDIENTE: 'ACTIVO', 'EN PROGRESO': 'ACTIVO', COMPLETADO: 'INACTIVO' } },
    { table: 'routes', column: 'status', conversions: { ACTIVE: 'ACTIVO', INACTIVE: 'INACTIVO' } },
    { table: 'stops', column: 'status', conversions: { ACTIVA: 'ACTIVO', INACTIVA: 'INACTIVO' } },
    { table: 'students', column: 'status', conversions: { GRADUADO: 'INACTIVO' } },
    { table: 'route_assignments', column: 'status' },
    { table: 'guardians', column: 'status' },
  ];

  for (const migration of migrations) {
    await migrateStatusColumn(qi, migration);
  }
};

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

const extractHourMinute = (time: unknown): [number, number] => {
  if (typeof time === 'string' && time.length) {
    const parts = time.split(':');
    const hour = Number.parseInt(parts[0] ?? '0', 10);
    const minute = Number.parseInt(parts[1] ?? '0', 10);
    if (Number.isFinite(hour) && Number.isFinite(minute)) {
      return [hour, minute];
    }
  }

  if (time instanceof Date) {
    return [time.getHours(), time.getMinutes()];
  }

  const raw = (time as { hours?: () => number; minutes?: () => number } | null) ?? null;
  if (raw?.hours && raw?.minutes) {
    try {
      const hour = raw.hours();
      const minute = raw.minutes();
      if (Number.isFinite(hour) && Number.isFinite(minute)) {
        return [hour, minute];
      }
    } catch {
      // fall through to default
    }
  }

  return [0, 0];
};

const DEFAULT_USER_PASSWORD = 'Password123!';

const createRolesIfNeeded = async (): Promise<Role[]> => {
  let roles = await Role.findAll();
  if (roles.length) {
    console.log(`Roles encontrados: ${roles.length}.`);
    return roles;
  }

  console.log('Creando roles del sistema...');
  const roleNames = ['ADMIN', 'COORDINATOR', 'SUPPORT', 'DRIVER'];
  const createdRoles: Role[] = [];

  for (const name of roleNames) {
    const role = await Role.create({
      name,
      status: 'ACTIVO',
    });
    createdRoles.push(role);
  }

  return createdRoles;
};

const createUsersIfNeeded = async (): Promise<User[]> => {
  let users = await User.findAll();
  if (users.length) {
    console.log(`Usuarios encontrados: ${users.length}.`);
    return users;
  }

  console.log('Creando usuarios del sistema...');
  const seedUsers = [
    { username: 'admin', email: 'admin@example.com', status: 'ACTIVO' as const },
    { username: 'coordinator', email: 'coordinator@example.com', status: 'ACTIVO' as const },
    { username: 'support', email: 'support@example.com', status: 'INACTIVO' as const },
  ];

  const createdUsers: User[] = [];

  for (const seed of seedUsers) {
    const user = await User.create({
      username: seed.username,
      email: seed.email,
      password: DEFAULT_USER_PASSWORD,
      status: seed.status,
      avatar: faker.image.avatar(),
    });
    createdUsers.push(user);
  }

  for (let i = 0; i < 2; i += 1) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const user = await User.create({
      username: faker.internet
        .username({ firstName, lastName })
        .replace(/\s+/g, '_')
        .toLowerCase(),
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      password: DEFAULT_USER_PASSWORD,
      status: faker.helpers.arrayElement(['ACTIVO', 'INACTIVO']),
      avatar: faker.image.avatar(),
    });
    createdUsers.push(user);
  }

  console.log(`Usuarios de prueba creados con contraseña "${DEFAULT_USER_PASSWORD}".`);
  return createdUsers;
};

const createRoleUsersIfNeeded = async (users: User[], roles: Role[]): Promise<void> => {
  const existing = await RoleUser.count();
  if (existing) {
    console.log(`Relaciones usuario-rol encontradas: ${existing}.`);
    return;
  }

  if (!users.length || !roles.length) {
    console.log('No hay usuarios o roles suficientes para asociar.');
    return;
  }

  console.log('Asignando roles a usuarios...');
  const combos = new Set<string>();

  const assignRole = async (user: User, role: Role, status: 'ACTIVO' | 'INACTIVO' = 'ACTIVO') => {
    const key = `${user.id}-${role.id}`;
    if (combos.has(key)) {
      return;
    }

    combos.add(key);
    await RoleUser.create({
      user_id: user.id,
      role_id: role.id,
      status,
    });
  };

  const adminRole = (roles.find((role) => role.name.toUpperCase() === 'ADMIN') ?? roles[0])!;
  const coordinatorRole = roles.find((role) => role.name.toUpperCase() === 'COORDINATOR') ?? adminRole;
  const supportRole = roles.find((role) => role.name.toUpperCase() === 'SUPPORT') ?? adminRole;

  if (users[0]) await assignRole(users[0], adminRole, 'ACTIVO');
  if (users[1]) await assignRole(users[1], coordinatorRole, 'ACTIVO');
  if (users[2]) await assignRole(users[2], supportRole, 'ACTIVO');

  for (const user of users) {
    const randomRole = faker.helpers.arrayElement(roles);
    await assignRole(user, randomRole, faker.helpers.arrayElement(['ACTIVO', 'INACTIVO']));
  }
};

const createResourcesIfNeeded = async (): Promise<Resource[]> => {
  let resources = await Resource.findAll();
  if (resources.length) {
    console.log(`Recursos encontrados: ${resources.length}.`);
    return resources;
  }

  console.log('Creando recursos protegidos...');
  const resourceSeeds = [
    { path: '/api/auth/users', method: 'GET' },
    { path: '/api/auth/users/:id', method: 'GET' },
    { path: '/api/auth/roles', method: 'GET' },
    { path: '/api/auth/roles/:id', method: 'GET' },
    { path: '/api/auth/role-users', method: 'GET' },
    { path: '/api/auth/role-users/:id', method: 'GET' },
    { path: '/api/auth/resources', method: 'GET' },
    { path: '/api/auth/resources/:id', method: 'GET' },
    { path: '/api/auth/resource-roles', method: 'GET' },
    { path: '/api/auth/resource-roles/:id', method: 'GET' },
    { path: '/api/auth/refresh-tokens', method: 'GET' },
    { path: '/api/auth/refresh-tokens/:id', method: 'GET' },
  ];

  const createdResources: Resource[] = [];

  for (const seed of resourceSeeds) {
    const resource = await Resource.create({
      path: seed.path,
      method: seed.method,
      status: 'ACTIVO',
    });
    createdResources.push(resource);
  }

  return createdResources;
};

const createResourceRolesIfNeeded = async (roles: Role[], resources: Resource[]): Promise<void> => {
  const existing = await ResourceRole.count();
  if (existing) {
    console.log(`Relaciones rol-recurso encontradas: ${existing}.`);
    return;
  }

  if (!roles.length || !resources.length) {
    console.log('No hay roles o recursos suficientes para asociar.');
    return;
  }

  console.log('Asignando recursos a roles...');
  const combos = new Set<string>();

  const link = async (role: Role, resource: Resource, status: 'ACTIVO' | 'INACTIVO' = 'ACTIVO') => {
    const key = `${role.id}-${resource.id}`;
    if (combos.has(key)) {
      return;
    }
    combos.add(key);

    await ResourceRole.create({
      role_id: role.id,
      resource_id: resource.id,
      status,
    });
  };

  const adminRole = roles.find((role) => role.name.toUpperCase() === 'ADMIN');
  if (adminRole) {
    for (const resource of resources) {
      await link(adminRole, resource, 'ACTIVO');
    }
  }

  for (const role of roles) {
    if (adminRole && role.id === adminRole.id) {
      continue;
    }

    const subset = pickRandomSubset(resources, Math.min(2, resources.length), Math.min(6, resources.length));
    for (const resource of subset) {
      await link(role, resource, faker.helpers.arrayElement(['ACTIVO', 'INACTIVO']));
    }
  }
};

const createRefreshTokensIfNeeded = async (users: User[]): Promise<void> => {
  const existing = await RefreshToken.count();
  if (existing) {
    console.log(`Tokens de refresco encontrados: ${existing}.`);
    return;
  }

  if (!users.length) {
    console.log('No hay usuarios para generar tokens de refresco.');
    return;
  }

  console.log('Creando tokens de refresco...');
  for (const user of users) {
    const { token, expiresAt } = user.generateRefreshToken();

    await RefreshToken.create({
      user_id: user.id,
      token,
      device_info: faker.internet.userAgent(),
      status: 'ACTIVO',
      expires_at: expiresAt,
    });

    await RefreshToken.create({
      user_id: user.id,
      token: faker.string.alphanumeric({ length: 64 }),
      device_info: faker.internet.userAgent(),
      status: 'INACTIVO',
      expires_at: faker.date.past({ years: 0.1 }),
    });
  }
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
    const status: StudentStatus = faker.helpers.arrayElement(['ACTIVO', 'INACTIVO']);

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
    const status: BusStatus = faker.helpers.arrayElement(['ACTIVO', 'INACTIVO']);
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
    const status: DriverStatus = faker.helpers.arrayElement(['ACTIVO', 'INACTIVO']);
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
    const status: RouteStatus = faker.helpers.arrayElement(['ACTIVO', 'INACTIVO']);

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
    const status: StopStatus = faker.helpers.arrayElement(['ACTIVO', 'INACTIVO']);
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
        status: faker.helpers.arrayElement(['ACTIVO', 'INACTIVO']),
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
      const status: ItineraryStatus = faker.helpers.arrayElement(['ACTIVO', 'INACTIVO']);

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
      const [hour, minute] = extractHourMinute(itinerary.departureTime);
      const baseMinutes = hour * 60 + minute + offsetMinutes;
      const scheduledHour = Math.floor(baseMinutes / 60) % 24;
      const scheduledMinute = baseMinutes % 60;

      await ItineraryStopSchedule.create({
        itineraryId: itinerary.id,
        stopId: routeStop.stopId,
        scheduledTime: `${scheduledHour.toString().padStart(2, '0')}:${scheduledMinute
          .toString()
          .padStart(2, '0')}:00`,
        status: faker.helpers.arrayElement(['ACTIVO', 'INACTIVO']),
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
    const status: AssistanceStatus = faker.helpers.arrayElement(['ACTIVO', 'INACTIVO']);

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
    const status: IncidenceStatus = faker.helpers.arrayElement(['ACTIVO', 'INACTIVO']);
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
    const status: MaintenanceStatus = faker.helpers.arrayElement(['ACTIVO', 'INACTIVO']);
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
    await ensureStatusSchema();
    await sequelize.sync();

    const roles = await createRolesIfNeeded();
    const users = await createUsersIfNeeded();
    const resources = await createResourcesIfNeeded();

    await createRoleUsersIfNeeded(users, roles);
    await createResourceRolesIfNeeded(roles, resources);
    await createRefreshTokensIfNeeded(users);

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
