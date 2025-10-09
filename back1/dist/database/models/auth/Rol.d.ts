import { Model } from "sequelize";
export declare class Role extends Model {
    id: number;
    name: string;
    status: "ACTIVO" | "INACTIVO";
}
export interface RoleI {
    id?: number;
    name: string;
    status: "ACTIVO" | "INACTIVO";
}
//# sourceMappingURL=Rol.d.ts.map