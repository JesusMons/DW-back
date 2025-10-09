"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const faker_1 = require("@faker-js/faker");
const sequelize_1 = require("sequelize");
const db_1 = __importStar(require("../database/db"));
const guardian_1 = require("../database/models/guardian");
const student_1 = require("../database/models/student");
const driver_1 = require("../database/models/driver");
const bus_1 = require("../database/models/bus");
const route_1 = require("../database/models/route");
const stop_1 = require("../database/models/stop");
const routeStop_1 = require("../database/models/routeStop");
const routeAssignment_1 = require("../database/models/routeAssignment");
const itinerari_1 = require("../database/models/itinerari");
const ItineraryStopSchedule_1 = require("../database/models/ItineraryStopSchedule");
const assistance_1 = require("../database/models/assistance");
const incidence_1 = require("../database/models/incidence");
const maintenance_1 = require("../database/models/maintenance");
const RefreshToken_1 = require("../database/models/auth/RefreshToken");
const Resource_1 = require("../database/models/auth/Resource");
const ResourceRole_1 = require("../database/models/auth/ResourceRole");
const Rol_1 = require("../database/models/auth/Rol");
const RolUser_1 = require("../database/models/auth/RolUser");
const User_1 = require("../database/models/auth/User");
const STATUS_ENUM = ['ACTIVO', 'INACTIVO'];
const extractEnumValues = (rawType) => {
    if (!rawType)
        return [];
    const match = rawType.match(/enum\s*\((.*)\)/i);
    if (!(match === null || match === void 0 ? void 0 : match[1]))
        return [];
    return match[1]
        .split(',')
        .map((value) => value.trim().replace(/^'(.*)'$/, '$1'));
};
const describeOrWarn = (qi, table) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield qi.describeTable(table);
    }
    catch (error) {
        console.warn(`⚠️  No se pudo describir la tabla ${table}:`, error.message);
        return null;
    }
});
const changeEnumIfNeeded = (qi, table, column, values, allowNull, defaultValue) => __awaiter(void 0, void 0, void 0, function* () {
    yield qi.changeColumn(table, column, {
        type: sequelize_1.DataTypes.ENUM(...values),
        allowNull,
        defaultValue,
    });
});
const extendEnumForConversions = (qi, table, column, conversions) => __awaiter(void 0, void 0, void 0, function* () {
    const definition = yield describeOrWarn(qi, table);
    if (!definition)
        return { allowNull: false, defaultValue: null };
    const columnDefinition = definition[column];
    if (!columnDefinition)
        return { allowNull: false, defaultValue: null };
    const enumValues = extractEnumValues(columnDefinition.type);
    const allowNull = Boolean(columnDefinition.allowNull);
    const defaultValue = columnDefinition.defaultValue;
    const required = new Set([
        ...enumValues,
        ...Object.keys(conversions),
        ...Object.values(conversions),
        ...STATUS_ENUM,
    ]);
    const newValues = Array.from(required);
    const hasAll = newValues.length === enumValues.length && newValues.every((value) => enumValues.includes(value));
    if (!enumValues.length || !hasAll) {
        yield changeEnumIfNeeded(qi, table, column, newValues, allowNull, defaultValue);
    }
    return { allowNull, defaultValue };
});
const runConversions = (table, column, conversions) => __awaiter(void 0, void 0, void 0, function* () {
    for (const [from, to] of Object.entries(conversions)) {
        if (from === to)
            continue;
        yield db_1.default.query(`UPDATE \`${table}\` SET \`${column}\` = :to WHERE \`${column}\` = :from`, {
            replacements: { from, to },
        });
    }
});
const finalizeEnum = (qi, table, column, allowNull, defaultValue) => __awaiter(void 0, void 0, void 0, function* () {
    yield changeEnumIfNeeded(qi, table, column, [...STATUS_ENUM], allowNull, defaultValue);
});
const migrateStatusColumn = (qi, config) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { table, column, oldColumn, conversions = {}, defaultValue = 'ACTIVO', allowNull = false } = config;
    const definition = yield describeOrWarn(qi, table);
    if (!definition)
        return;
    const columnExists = column in definition;
    const oldColumnExists = oldColumn ? oldColumn in definition : false;
    if (!columnExists && !oldColumnExists) {
        yield qi.addColumn(table, column, {
            type: sequelize_1.DataTypes.ENUM(...STATUS_ENUM),
            allowNull,
            defaultValue,
        });
        return;
    }
    const workingColumn = columnExists ? column : (oldColumnExists ? oldColumn : column);
    const { allowNull: currentAllowNull, defaultValue: currentDefault } = yield extendEnumForConversions(qi, table, workingColumn, conversions);
    yield runConversions(table, workingColumn, conversions);
    if (workingColumn !== column) {
        yield qi.renameColumn(table, workingColumn, column);
    }
    const sanitizedDefault = STATUS_ENUM.includes((_a = currentDefault) !== null && _a !== void 0 ? _a : defaultValue)
        ? ((_b = currentDefault) !== null && _b !== void 0 ? _b : defaultValue)
        : defaultValue;
    yield finalizeEnum(qi, table, column, currentAllowNull !== null && currentAllowNull !== void 0 ? currentAllowNull : allowNull, sanitizedDefault);
});
const ensureStatusSchema = () => __awaiter(void 0, void 0, void 0, function* () {
    const qi = db_1.default.getQueryInterface();
    const migrations = [
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
        yield migrateStatusColumn(qi, migration);
    }
});
const pickRandomSubset = (items, min, max) => {
    if (!items.length) {
        return [];
    }
    const safeMax = Math.min(max, items.length);
    const safeMin = Math.min(min, safeMax);
    const count = faker_1.faker.number.int({ min: safeMin, max: safeMax });
    return faker_1.faker.helpers.shuffle([...items]).slice(0, count);
};
const randomTime = (startHour, endHour) => {
    const hour = faker_1.faker.number.int({ min: startHour, max: endHour });
    const minute = faker_1.faker.number.int({ min: 0, max: 59 });
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;
};
const DEFAULT_USER_PASSWORD = 'Password123!';
const createRolesIfNeeded = () => __awaiter(void 0, void 0, void 0, function* () {
    let roles = yield Rol_1.Role.findAll();
    if (roles.length) {
        console.log(`Roles encontrados: ${roles.length}.`);
        return roles;
    }
    console.log('Creando roles del sistema...');
    const roleNames = ['ADMIN', 'COORDINATOR', 'SUPPORT', 'DRIVER'];
    const createdRoles = [];
    for (const name of roleNames) {
        const role = yield Rol_1.Role.create({
            name,
            status: 'ACTIVO',
        });
        createdRoles.push(role);
    }
    return createdRoles;
});
const createUsersIfNeeded = () => __awaiter(void 0, void 0, void 0, function* () {
    let users = yield User_1.User.findAll();
    if (users.length) {
        console.log(`Usuarios encontrados: ${users.length}.`);
        return users;
    }
    console.log('Creando usuarios del sistema...');
    const seedUsers = [
        { username: 'admin', email: 'admin@example.com', status: 'ACTIVO' },
        { username: 'coordinator', email: 'coordinator@example.com', status: 'ACTIVO' },
        { username: 'support', email: 'support@example.com', status: 'INACTIVO' },
    ];
    const createdUsers = [];
    for (const seed of seedUsers) {
        const user = yield User_1.User.create({
            username: seed.username,
            email: seed.email,
            password: DEFAULT_USER_PASSWORD,
            status: seed.status,
            avatar: faker_1.faker.image.avatar(),
        });
        createdUsers.push(user);
    }
    for (let i = 0; i < 2; i += 1) {
        const firstName = faker_1.faker.person.firstName();
        const lastName = faker_1.faker.person.lastName();
        const user = yield User_1.User.create({
            username: faker_1.faker.internet
                .username({ firstName, lastName })
                .replace(/\s+/g, '_')
                .toLowerCase(),
            email: faker_1.faker.internet.email({ firstName, lastName }).toLowerCase(),
            password: DEFAULT_USER_PASSWORD,
            status: faker_1.faker.helpers.arrayElement(['ACTIVO', 'INACTIVO']),
            avatar: faker_1.faker.image.avatar(),
        });
        createdUsers.push(user);
    }
    console.log(`Usuarios de prueba creados con contraseña "${DEFAULT_USER_PASSWORD}".`);
    return createdUsers;
});
const createRoleUsersIfNeeded = (users, roles) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const existing = yield RolUser_1.RoleUser.count();
    if (existing) {
        console.log(`Relaciones usuario-rol encontradas: ${existing}.`);
        return;
    }
    if (!users.length || !roles.length) {
        console.log('No hay usuarios o roles suficientes para asociar.');
        return;
    }
    console.log('Asignando roles a usuarios...');
    const combos = new Set();
    const assignRole = (user_1, role_1, ...args_1) => __awaiter(void 0, [user_1, role_1, ...args_1], void 0, function* (user, role, status = 'ACTIVO') {
        const key = `${user.id}-${role.id}`;
        if (combos.has(key)) {
            return;
        }
        combos.add(key);
        yield RolUser_1.RoleUser.create({
            user_id: user.id,
            role_id: role.id,
            status,
        });
    });
    const adminRole = ((_a = roles.find((role) => role.name.toUpperCase() === 'ADMIN')) !== null && _a !== void 0 ? _a : roles[0]);
    const coordinatorRole = (_b = roles.find((role) => role.name.toUpperCase() === 'COORDINATOR')) !== null && _b !== void 0 ? _b : adminRole;
    const supportRole = (_c = roles.find((role) => role.name.toUpperCase() === 'SUPPORT')) !== null && _c !== void 0 ? _c : adminRole;
    if (users[0])
        yield assignRole(users[0], adminRole, 'ACTIVO');
    if (users[1])
        yield assignRole(users[1], coordinatorRole, 'ACTIVO');
    if (users[2])
        yield assignRole(users[2], supportRole, 'ACTIVO');
    for (const user of users) {
        const randomRole = faker_1.faker.helpers.arrayElement(roles);
        yield assignRole(user, randomRole, faker_1.faker.helpers.arrayElement(['ACTIVO', 'INACTIVO']));
    }
});
const createResourcesIfNeeded = () => __awaiter(void 0, void 0, void 0, function* () {
    let resources = yield Resource_1.Resource.findAll();
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
    const createdResources = [];
    for (const seed of resourceSeeds) {
        const resource = yield Resource_1.Resource.create({
            path: seed.path,
            method: seed.method,
            status: 'ACTIVO',
        });
        createdResources.push(resource);
    }
    return createdResources;
});
const createResourceRolesIfNeeded = (roles, resources) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield ResourceRole_1.ResourceRole.count();
    if (existing) {
        console.log(`Relaciones rol-recurso encontradas: ${existing}.`);
        return;
    }
    if (!roles.length || !resources.length) {
        console.log('No hay roles o recursos suficientes para asociar.');
        return;
    }
    console.log('Asignando recursos a roles...');
    const combos = new Set();
    const link = (role_1, resource_1, ...args_1) => __awaiter(void 0, [role_1, resource_1, ...args_1], void 0, function* (role, resource, status = 'ACTIVO') {
        const key = `${role.id}-${resource.id}`;
        if (combos.has(key)) {
            return;
        }
        combos.add(key);
        yield ResourceRole_1.ResourceRole.create({
            role_id: role.id,
            resource_id: resource.id,
            status,
        });
    });
    const adminRole = roles.find((role) => role.name.toUpperCase() === 'ADMIN');
    if (adminRole) {
        for (const resource of resources) {
            yield link(adminRole, resource, 'ACTIVO');
        }
    }
    for (const role of roles) {
        if (adminRole && role.id === adminRole.id) {
            continue;
        }
        const subset = pickRandomSubset(resources, Math.min(2, resources.length), Math.min(6, resources.length));
        for (const resource of subset) {
            yield link(role, resource, faker_1.faker.helpers.arrayElement(['ACTIVO', 'INACTIVO']));
        }
    }
});
const createRefreshTokensIfNeeded = (users) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield RefreshToken_1.RefreshToken.count();
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
        yield RefreshToken_1.RefreshToken.create({
            user_id: user.id,
            token,
            device_info: faker_1.faker.internet.userAgent(),
            status: 'ACTIVO',
            expires_at: expiresAt,
        });
        yield RefreshToken_1.RefreshToken.create({
            user_id: user.id,
            token: faker_1.faker.string.alphanumeric({ length: 64 }),
            device_info: faker_1.faker.internet.userAgent(),
            status: 'INACTIVO',
            expires_at: faker_1.faker.date.past({ years: 0.1 }),
        });
    }
});
const createGuardiansIfNeeded = (target) => __awaiter(void 0, void 0, void 0, function* () {
    let guardians = yield guardian_1.Guardian.findAll();
    if (guardians.length) {
        console.log(`Guardians encontrados: ${guardians.length}.`);
        return guardians;
    }
    console.log(`Creando ${target} tutores...`);
    for (let i = 0; i < target; i += 1) {
        const firstName = faker_1.faker.person.firstName();
        const lastName = faker_1.faker.person.lastName();
        const document = faker_1.faker.string.numeric({ length: 10, allowLeadingZeros: false });
        const relationship = faker_1.faker.helpers.arrayElement(['Padre', 'Madre', 'Tío/Tía', 'Hermano/a', 'Tutor legal']);
        const status = faker_1.faker.helpers.arrayElement(['ACTIVO', 'INACTIVO']);
        const guardian = yield guardian_1.Guardian.create({
            firstName,
            lastName,
            document,
            phone: `09${faker_1.faker.string.numeric({ length: 8 })}`,
            email: faker_1.faker.internet.email({ firstName, lastName }).toLowerCase(),
            relationship,
            address: faker_1.faker.location.streetAddress(),
            status,
        });
        guardians.push(guardian);
    }
    return guardians;
});
const createStudentsIfNeeded = (target, guardians) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    let students = yield student_1.Student.findAll();
    if (students.length) {
        console.log(`Estudiantes encontrados: ${students.length}.`);
        return students;
    }
    console.log(`Creando ${target} estudiantes...`);
    for (let i = 0; i < target; i += 1) {
        const guardian = guardians.length ? faker_1.faker.helpers.arrayElement(guardians) : null;
        const firstName = faker_1.faker.person.firstName();
        const lastName = faker_1.faker.person.lastName();
        const status = faker_1.faker.helpers.arrayElement(['ACTIVO', 'INACTIVO']);
        const student = yield student_1.Student.create({
            name: firstName,
            lastName,
            document: faker_1.faker.string.numeric({ length: 10, allowLeadingZeros: false }),
            guardianId: (_a = guardian === null || guardian === void 0 ? void 0 : guardian.id) !== null && _a !== void 0 ? _a : null,
            grade: faker_1.faker.number.int({ min: 1, max: 11 }),
            birthdate: faker_1.faker.date.birthdate({ min: 5, max: 17, mode: 'age' }),
            address: (_b = guardian === null || guardian === void 0 ? void 0 : guardian.address) !== null && _b !== void 0 ? _b : faker_1.faker.location.streetAddress(),
            phone: `09${faker_1.faker.string.numeric({ length: 8 })}`,
            guardianPhone: (_c = guardian === null || guardian === void 0 ? void 0 : guardian.phone) !== null && _c !== void 0 ? _c : `09${faker_1.faker.string.numeric({ length: 8 })}`,
            email: faker_1.faker.internet.email({ firstName, lastName }).toLowerCase(),
            status,
            allergies: faker_1.faker.helpers.maybe(() => pickRandomSubset([
                'Penicilina',
                'Maní',
                'Lácteos',
                'Picaduras de insectos',
                'Gluten',
            ], 1, 2), { probability: 0.3 }),
            emergencyContact: guardian
                ? { name: `${guardian.firstName} ${guardian.lastName}`, phone: guardian.phone, relationship: guardian.relationship }
                : {
                    name: faker_1.faker.person.fullName(),
                    phone: `09${faker_1.faker.string.numeric({ length: 8 })}`,
                    relationship: faker_1.faker.helpers.arrayElement(['Abuelo/a', 'Hermano/a', 'Tía/Tío']),
                },
        });
        students.push(student);
    }
    return students;
});
const createBusesIfNeeded = (target) => __awaiter(void 0, void 0, void 0, function* () {
    let buses = yield bus_1.Bus.findAll();
    if (buses.length) {
        console.log(`Buses encontrados: ${buses.length}.`);
        return buses;
    }
    console.log(`Creando ${target} buses...`);
    for (let i = 0; i < target; i += 1) {
        const status = faker_1.faker.helpers.arrayElement(['ACTIVO', 'INACTIVO']);
        const bus = yield bus_1.Bus.create({
            plate: `${faker_1.faker.string.alphanumeric({ length: 3, casing: 'upper' })}-${faker_1.faker.string.numeric({ length: 3, allowLeadingZeros: false })}`,
            capacity: faker_1.faker.number.int({ min: 28, max: 45 }),
            mileage: faker_1.faker.number.int({ min: 5000, max: 120000 }),
            model: faker_1.faker.vehicle.model(),
            brand: faker_1.faker.vehicle.manufacturer(),
            year: faker_1.faker.number.int({ min: 2015, max: 2024 }),
            color: faker_1.faker.vehicle.color(),
            status,
            insuranceExpiry: faker_1.faker.date.future({ years: 2 }),
            lastMaintenance: faker_1.faker.date.past({ years: 0.5 }),
            nextMaintenance: faker_1.faker.date.future({ years: 0.5 }),
        });
        buses.push(bus);
    }
    return buses;
});
const createDriversIfNeeded = (target, buses) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let drivers = yield driver_1.Driver.findAll();
    if (drivers.length) {
        console.log(`Conductores encontrados: ${drivers.length}.`);
        return drivers;
    }
    console.log(`Creando ${target} conductores...`);
    for (let i = 0; i < target; i += 1) {
        const status = faker_1.faker.helpers.arrayElement(['ACTIVO', 'INACTIVO']);
        const bus = buses.length ? faker_1.faker.helpers.arrayElement(buses) : null;
        const driver = yield driver_1.Driver.create({
            name: faker_1.faker.person.fullName(),
            document: faker_1.faker.string.numeric({ length: 10, allowLeadingZeros: false }),
            phone: `09${faker_1.faker.string.numeric({ length: 8 })}`,
            email: faker_1.faker.internet.email().toLowerCase(),
            address: faker_1.faker.location.streetAddress(),
            typeLicence: faker_1.faker.helpers.arrayElement(['A', 'B', 'C', 'D', 'E']),
            licenceExpiry: faker_1.faker.date.future({ years: 3 }),
            experienceYears: faker_1.faker.number.int({ min: 2, max: 20 }),
            status,
            assignedBusId: (_a = bus === null || bus === void 0 ? void 0 : bus.id) !== null && _a !== void 0 ? _a : null,
            photoUrl: faker_1.faker.image.urlPicsumPhotos({ width: 200, height: 200 }),
        });
        drivers.push(driver);
    }
    return drivers;
});
const createRoutesIfNeeded = (target, buses, drivers) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    let routes = yield route_1.Route.findAll();
    if (routes.length) {
        console.log(`Rutas encontradas: ${routes.length}.`);
        return routes;
    }
    console.log(`Creando ${target} rutas...`);
    const districts = faker_1.faker.helpers.arrayElements([
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
        const currentBus = buses.length ? faker_1.faker.helpers.arrayElement(buses) : null;
        const currentDriver = drivers.length ? faker_1.faker.helpers.arrayElement(drivers) : null;
        const status = faker_1.faker.helpers.arrayElement(['ACTIVO', 'INACTIVO']);
        const route = yield route_1.Route.create({
            name: `Ruta ${faker_1.faker.string.alphanumeric({ length: 4, casing: 'upper' })}`,
            startPoint: districts[i],
            endPoint: (_a = districts[target + i]) !== null && _a !== void 0 ? _a : faker_1.faker.location.city(),
            currentBusId: (_b = currentBus === null || currentBus === void 0 ? void 0 : currentBus.id) !== null && _b !== void 0 ? _b : null,
            currentDriverId: (_c = currentDriver === null || currentDriver === void 0 ? void 0 : currentDriver.id) !== null && _c !== void 0 ? _c : null,
            status,
        });
        routes.push(route);
    }
    return routes;
});
const createStopsIfNeeded = (target) => __awaiter(void 0, void 0, void 0, function* () {
    let stops = yield stop_1.Stop.findAll();
    if (stops.length) {
        console.log(`Paradas encontradas: ${stops.length}.`);
        return stops;
    }
    console.log(`Creando ${target} paradas...`);
    for (let i = 0; i < target; i += 1) {
        const status = faker_1.faker.helpers.arrayElement(['ACTIVO', 'INACTIVO']);
        const stop = yield stop_1.Stop.create({
            name: `Parada ${faker_1.faker.location.street()}`,
            direction: faker_1.faker.location.direction(),
            orderHint: i + 1,
            landmark: faker_1.faker.location.secondaryAddress(),
            status,
        });
        stops.push(stop);
    }
    return stops;
});
const createRouteStopsIfNeeded = (routes, stops) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield routeStop_1.RouteStop.count();
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
        selectedStops.sort((a, b) => { var _a, _b; return ((_a = a.orderHint) !== null && _a !== void 0 ? _a : 0) - ((_b = b.orderHint) !== null && _b !== void 0 ? _b : 0); });
        let position = 1;
        for (const stop of selectedStops) {
            yield routeStop_1.RouteStop.create({
                routeId: route.id,
                stopId: stop.id,
                position,
                scheduledTimeHint: randomTime(6, 9),
                status: faker_1.faker.helpers.arrayElement(['ACTIVO', 'INACTIVO']),
            });
            position += 1;
        }
    }
});
const createRouteAssignmentsIfNeeded = (routes, buses, drivers) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const existing = yield routeAssignment_1.RouteAssignment.count();
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
        const bus = faker_1.faker.helpers.arrayElement(buses);
        const driver = drivers.length ? faker_1.faker.helpers.arrayElement(drivers) : null;
        const status = faker_1.faker.helpers.arrayElement(['ACTIVO', 'INACTIVO']);
        const startDate = faker_1.faker.date.past({ years: 1 });
        const endDate = faker_1.faker.helpers.maybe(() => faker_1.faker.date.future({ years: 0.5, refDate: startDate }), { probability: 0.3 });
        yield routeAssignment_1.RouteAssignment.create({
            routeId: route.id,
            busId: bus.id,
            driverId: (_a = driver === null || driver === void 0 ? void 0 : driver.id) !== null && _a !== void 0 ? _a : null,
            startDate,
            endDate: endDate !== null && endDate !== void 0 ? endDate : null,
            status,
        });
    }
});
const createItinerariesIfNeeded = (routes, buses, drivers) => __awaiter(void 0, void 0, void 0, function* () {
    let itineraries = yield itinerari_1.Itinerary.findAll();
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
        const baseDate = faker_1.faker.date.recent({ days: 10 });
        for (let i = 0; i < 2; i += 1) {
            const bus = faker_1.faker.helpers.arrayElement(buses);
            const driver = faker_1.faker.helpers.arrayElement(drivers);
            const departure = randomTime(6, 8);
            const arrival = randomTime(9, 12);
            const status = faker_1.faker.helpers.arrayElement(['ACTIVO', 'INACTIVO']);
            const itinerary = yield itinerari_1.Itinerary.create({
                routeId: route.id,
                date: faker_1.faker.date.soon({ days: 15, refDate: baseDate }),
                departureTime: departure,
                arrivalTime: arrival,
                driverId: driver.id,
                busId: bus.id,
                status,
                notes: faker_1.faker.helpers.maybe(() => faker_1.faker.lorem.sentence(), { probability: 0.4 }),
            });
            itineraries.push(itinerary);
        }
    }
    return itineraries;
});
const createItineraryStopsIfNeeded = (itineraries) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield ItineraryStopSchedule_1.ItineraryStopSchedule.count();
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
        const routeStops = yield routeStop_1.RouteStop.findAll({ where: { routeId: itinerary.routeId }, order: [['position', 'ASC']] });
        if (!routeStops.length) {
            continue;
        }
        let offsetMinutes = 0;
        for (const routeStop of routeStops) {
            offsetMinutes += faker_1.faker.number.int({ min: 5, max: 15 });
            const [hourStr, minuteStr] = itinerary.departureTime.split(':');
            const hour = Number.parseInt(hourStr !== null && hourStr !== void 0 ? hourStr : '0', 10);
            const minute = Number.parseInt(minuteStr !== null && minuteStr !== void 0 ? minuteStr : '0', 10);
            const baseMinutes = hour * 60 + minute + offsetMinutes;
            const scheduledHour = Math.floor(baseMinutes / 60) % 24;
            const scheduledMinute = baseMinutes % 60;
            yield ItineraryStopSchedule_1.ItineraryStopSchedule.create({
                itineraryId: itinerary.id,
                stopId: routeStop.stopId,
                scheduledTime: `${scheduledHour.toString().padStart(2, '0')}:${scheduledMinute
                    .toString()
                    .padStart(2, '0')}:00`,
                status: faker_1.faker.helpers.arrayElement(['ACTIVO', 'INACTIVO']),
            });
        }
    }
});
const createAssistancesIfNeeded = (students, routes, buses) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield assistance_1.Assistance.count();
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
        const route = faker_1.faker.helpers.arrayElement(routes);
        const bus = faker_1.faker.helpers.arrayElement(buses);
        const status = faker_1.faker.helpers.arrayElement(['ACTIVO', 'INACTIVO']);
        yield assistance_1.Assistance.create({
            studentId: student.id,
            routeId: route.id,
            busId: bus.id,
            date: faker_1.faker.date.recent({ days: 20 }),
            time: randomTime(6, 9),
            status,
        });
    }
});
const createIncidencesIfNeeded = (routes, buses) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield incidence_1.Incidence.count();
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
        const route = faker_1.faker.helpers.arrayElement(routes);
        const bus = faker_1.faker.helpers.arrayElement(buses);
        const severity = faker_1.faker.helpers.arrayElement(['BAJA', 'MEDIA', 'ALTA', 'CRITICA']);
        const status = faker_1.faker.helpers.arrayElement(['ACTIVO', 'INACTIVO']);
        const reportedAt = faker_1.faker.date.recent({ days: 40 });
        yield incidence_1.Incidence.create({
            routeId: route.id,
            busId: bus.id,
            description: faker_1.faker.lorem.sentences(faker_1.faker.number.int({ min: 1, max: 2 })),
            severity,
            status,
            reportedAt,
            resolvedAt: faker_1.faker.helpers.maybe(() => faker_1.faker.date.soon({ days: 10, refDate: reportedAt }), { probability: 0.4 }),
            reportedBy: faker_1.faker.person.fullName(),
            actionsTaken: faker_1.faker.helpers.maybe(() => faker_1.faker.lorem.sentence(), { probability: 0.5 }),
        });
    }
});
const createMaintenancesIfNeeded = (buses) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield maintenance_1.Maintenance.count();
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
        const type = faker_1.faker.helpers.arrayElement(['PREVENTIVO', 'CORRECTIVO', 'INSPECCION']);
        const status = faker_1.faker.helpers.arrayElement(['ACTIVO', 'INACTIVO']);
        const performedAt = faker_1.faker.date.recent({ days: 90 });
        yield maintenance_1.Maintenance.create({
            busId: bus.id,
            type,
            description: faker_1.faker.vehicle.vehicle(),
            cost: faker_1.faker.number.float({ min: 150, max: 1200, fractionDigits: 2 }),
            performedAt,
            nextDueDate: faker_1.faker.helpers.maybe(() => faker_1.faker.date.soon({ days: 120, refDate: performedAt }), { probability: 0.6 }),
            status,
            mechanic: faker_1.faker.person.fullName(),
            odometer: faker_1.faker.number.int({ min: 10000, max: 120000 }),
        });
    }
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.testConnection)();
        yield ensureStatusSchema();
        yield db_1.default.sync();
        const roles = yield createRolesIfNeeded();
        const users = yield createUsersIfNeeded();
        const resources = yield createResourcesIfNeeded();
        yield createRoleUsersIfNeeded(users, roles);
        yield createResourceRolesIfNeeded(roles, resources);
        yield createRefreshTokensIfNeeded(users);
        const guardians = yield createGuardiansIfNeeded(10);
        const students = yield createStudentsIfNeeded(20, guardians);
        const buses = yield createBusesIfNeeded(6);
        const drivers = yield createDriversIfNeeded(8, buses);
        const routes = yield createRoutesIfNeeded(4, buses, drivers);
        const stops = yield createStopsIfNeeded(12);
        yield createRouteStopsIfNeeded(routes, stops);
        yield createRouteAssignmentsIfNeeded(routes, buses, drivers);
        const itineraries = yield createItinerariesIfNeeded(routes, buses, drivers);
        yield createItineraryStopsIfNeeded(itineraries);
        yield createAssistancesIfNeeded(students, routes, buses);
        yield createIncidencesIfNeeded(routes, buses);
        yield createMaintenancesIfNeeded(buses);
        console.log('✅ Datos de prueba generados correctamente.');
    }
    catch (error) {
        console.error('❌ Error generando datos de prueba:', error);
    }
    finally {
        yield db_1.default.close();
        process.exit(0);
    }
});
void main();
// npm run seed
//# sourceMappingURL=seedDatabase.js.map