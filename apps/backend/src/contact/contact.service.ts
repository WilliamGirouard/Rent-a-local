import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ContactDto } from './dtos/contact.dto';
import { ReservationsService } from 'src/reservations/reservations.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ContactService {
    constructor(private mailService: MailerService,
        private reservationService : ReservationsService
    ) {}

    async sendEmailToUs(dto: ContactDto) {
        const reservation = await this.reservationService.findOne(dto.reservationId);
        if (!reservation) {
            throw new NotFoundException(`La reservation #${dto.reservationId} n'a pas été trouvé.`);
        }
        try {
            await this.mailService.sendMail({
            to: process.env.GMAIL_MAIL,
            subject: `"Request - Reservation Changes #${dto.reservationId}"`,
            text: `
                Name: ${dto.name}
                Email: ${dto.email}
                Reservation Id : ${dto.reservationId}
                Message: ${dto.message}
            `
        })
            return { message: "Email envoyé avec succès"}
        } catch (e) {
            throw new InternalServerErrorException("Erreur lors de l'envoi du courriel, veuillez réessayer plus tard.")
        }
    }
}
