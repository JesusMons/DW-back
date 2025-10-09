import { Model } from "sequelize";
export declare class User extends Model {
    id: number;
    username: string;
    email: string;
    password: string;
    status: "ACTIVO" | "INACTIVO";
    avatar: string;
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
}
//# sourceMappingURL=User.d.ts.map