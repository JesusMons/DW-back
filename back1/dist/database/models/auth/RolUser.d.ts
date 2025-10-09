import { Model } from "sequelize";
export declare class RoleUser extends Model {
    id: number;
    role_id: number;
    user_id: number;
    status: "ACTIVO" | "INACTIVO";
}
export interface RoleUserI {
    id?: number;
    role_id: number;
    user_id: number;
    status: "ACTIVO" | "INACTIVO";
}
//# sourceMappingURL=RolUser.d.ts.map