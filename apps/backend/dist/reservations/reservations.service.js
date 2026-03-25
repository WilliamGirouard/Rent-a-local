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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const reservations_entity_1 = require("./reservations.entity");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
const reservationFactory_1 = require("./reservationFactory");
let ReservationsService = class ReservationsService {
    repo;
    usersService;
    constructor(repo, usersService) {
        this.repo = repo;
        this.usersService = usersService;
    }
    async create(dto) {
        const user = await this.usersService.findOneUserById(dto.userId);
        const reservation = reservationFactory_1.ReservationFactory.create(dto, user);
        return await this.repo.save(reservation);
    }
    async findAll() {
        return await this.repo.find({ relations: ['user'] });
    }
    async findOne(id) {
        const reservation = await this.repo.findOne({ where: { id }, relations: ["user"] });
        if (!reservation) {
            throw new common_1.BadRequestException("Réservation non trouvée.");
        }
        return reservation;
    }
    async remove(id) {
        const reservation = await this.findOne(id);
        return await this.repo.remove(reservation);
    }
    async update(id, attrs) {
        const reservation = await this.findOne(id);
        if (reservation.paid) {
            throw new common_1.BadRequestException("Impossible de modifier le statut de paiement d'une réservation");
        }
        const newStart = attrs.startDate ?? reservation.startDate;
        const newEnd = attrs.endDate ?? reservation.endDate;
        if (newEnd <= newStart) {
            throw new common_1.BadRequestException("Date de fin doit être après la date de début.");
        }
        Object.assign(reservation, attrs);
        return await this.repo.save(reservation);
    }
};
exports.ReservationsService = ReservationsService;
exports.ReservationsService = ReservationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reservations_entity_1.Reservation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], ReservationsService);
//# sourceMappingURL=reservations.service.js.map