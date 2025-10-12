import { Model } from "sequelize";
export declare class User extends Model {
    id: number;
    username: string;
    email: string;
    password: string;
    status: "ACTIVO" | "INACTIVO";
    avatar: string;
    mustChangePassword: boolean;
    checkPassword(password: string): Promise<boolean>;
    generateToken(): string;
    generateRefreshToken(): {
        token: string;
        expiresAt: Date;
    };
}
export interface UserI {
    id?: number;
    username: string;
    email: string;
    password: string;
    status: "ACTIVO" | "INACTIVO";
    avatar?: string;
    mustChangePassword?: boolean;
}
//# sourceMappingURL=User.d.ts.map