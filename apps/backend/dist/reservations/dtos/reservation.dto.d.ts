declare class LocalDto {
    id: number;
    name: string;
    address: string;
}
export declare class ReservationDto {
    id: number;
    startDate: Date;
    endDate: Date;
    paid: boolean;
    userId: number;
    localId: number;
    local: LocalDto;
}
export {};
