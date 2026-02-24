export declare class User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    get fullName(): string;
    logInsert(): void;
    logRemove(): void;
}
