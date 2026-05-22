import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ContactDto } from './dtos/contact.dto';

@Injectable()
export class ContactService {
  constructor(private mailService: MailerService) {}

  async sendEmailToUs(dto: ContactDto, userId: number) {
    try {
      await this.mailService.sendMail({
        to: process.env.GMAIL_MAIL,
        subject: `"Question from User : #${userId}"`,
        text: `
                Name: ${dto.name}
                Email: ${dto.email}
                Message: ${dto.message}
            `,
      });
      return { message: 'Email envoyé avec succès' };
    } catch (e) {
      throw new InternalServerErrorException(
        "Erreur lors de l'envoi du courriel, veuillez réessayer plus tard.",
      );
    }
  }
}
