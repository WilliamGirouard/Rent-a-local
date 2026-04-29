import { MailerService } from '@nestjs-modules/mailer';
import { ContactDto } from './dtos/contact.dto';
import { ReservationsService } from 'src/reservations/reservations.service';
export declare class ContactService {
    private mailService;
    private reservationService;
    constructor(mailService: MailerService, reservationService: ReservationsService);
    sendEmailToUs(dto: ContactDto, userId: number): Promise<{
        message: string;
    }>;
}
