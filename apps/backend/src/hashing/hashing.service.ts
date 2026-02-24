import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {

    async passwordHasher(password: string) : Promise<string> {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }
    
    async compareHashToPassword(password:string, hash:string) : Promise<boolean> {
        return await bcrypt.compare(password, hash)
    }
}
