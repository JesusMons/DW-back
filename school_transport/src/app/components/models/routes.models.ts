export interface RouteI {
    id?: number;
    name: string;
    stops: string[];
    startPoint: string;
    endPoint: string;
    schedule: string[];
    bus: number;
    driver: string;
    status: "ACTIVE" | "INACTIVE";
    createdAt?: Date;
    updatedAt?: Date;
}
