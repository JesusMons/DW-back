import { Model } from "sequelize";
export declare class ResourceRole extends Model {
    id: number;
    resource_id: number;
    role_id: number;
    status: "ACTIVO" | "INACTIVO";
}
export interface ResourceRoleI {
    id?: number;
    resource_id: number;
    role_id: number;
    status: "ACTIVO" | "INACTIVO";
}
//# sourceMappingURL=ResourceRole.d.ts.map