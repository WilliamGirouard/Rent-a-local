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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const reservations_service_1 = require("../reservations/reservations.service");
const users_service_1 = require("../users/users.service");
let PaymentService = class PaymentService {
    reservationsService;
    usersService;
    constructor(reservationsService, usersService) {
        this.reservationsService = reservationsService;
        this.usersService = usersService;
    }
    async payReservation(reservationId, currentUserId) {
        const reservation = await this.reservationsService.findOne(reservationId);
        if (!reservation) {
            throw new common_1.NotFoundException('Reservation not found');
        }
        if (reservation.user.id !== currentUserId) {
            throw new common_1.BadRequestException('You can only pay your own reservations');
        }
        if (reservation.paid) {
            throw new common_1.BadRequestException('This reservation has already been paid');
        }
        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);
        const nights = Math.max(1, Math.ceil((end.getTime() - start.getTime()) /
            (1000 * 60 * 60 * 24)));
        const amount = nights * reservation.local.pricePerDay;
        const paymentApproved = this.simulatePayment();
        if (!paymentApproved) {
            throw new common_1.BadRequestException('Payment was declined by the issuer');
        }
        await this.reservationsService.update(reservation.id, {
            paid: true,
        });
        return {
            reservationId: reservation.id,
            transactionId: this.generateTransactionId(),
            amount,
            currency: 'CAD',
            paidAt: new Date(),
            status: 'approved',
        };
    }
    simulatePayment() {
        return Math.random() < 0.85;
    }
    generateTransactionId() {
        return `PAY-${Math.random().toString(12).toUpperCase()}-${Date.now()}`;
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [reservations_service_1.ReservationsService,
        users_service_1.UsersService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map