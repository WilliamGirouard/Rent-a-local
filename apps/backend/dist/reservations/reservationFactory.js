"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationFactory = void 0;
const reservations_entity_1 = require("./reservations.entity");
const bad_request_exception_1 = require("@nestjs/common/exceptions/bad-request.exception");
class ReservationFactory {
    static create(dto, user) {
        if (dto.endDate <= dto.startDate) {
            throw new bad_request_exception_1.BadRequestException("Date de fin doit être après la date de début.");
        }
        const reservation = new reservations_entity_1.Reservation();
        reservation.startDate = dto.startDate;
        reservation.endDate = dto.endDate;
        reservation.paid = false;
        reservation.user = user;
        return reservation;
    }
}
exports.ReservationFactory = ReservationFactory;
//# sourceMappingURL=reservationFactory.js.map