import { MailerService } from '@nestjs-modules/mailer';
import { ContactDto } from './dtos/contact.dto';
export declare class ContactService {
    private mailService;
    constructor(mailService: MailerService);
    sendEmailToUs(dto: ContactDto, userId: number): Promise<{
        message: string;
    }>;
}
