export declare class HashingService {
    passwordHasher(password: string): Promise<string>;
    compareHashToPassword(password: string, hash: string): Promise<boolean>;
}
