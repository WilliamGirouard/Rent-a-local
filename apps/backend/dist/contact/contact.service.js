"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const reservations_service_1 = require("../reservations/reservations.service");
let ContactService = class ContactService {
    mailService;
    reservationService;
    constructor(mailService, reservationService) {
        this.mailService = mailService;
        this.reservationService = reservationService;
    }
    async sendEmailToUs(dto) {
        const reservation = await this.reservationService.findOne(dto.reservationId);
        if (!reservation) {
            throw new common_1.NotFoundException(`La reservation #${dto.reservationId} n'a pas été trouvé.`);
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
            });
            return { message: "Email envoyé avec succès" };
        }
        catch (e) {
            throw new common_1.InternalServerErrorException("Erreur lors de l'envoi du courriel, veuillez réessayer plus tard.");
        }
    }
};
exports.ContactService = ContactService;
exports.ContactService = ContactService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        reservations_service_1.ReservationsService])
], ContactService);
//# sourceMappingURL=contact.service.js.map