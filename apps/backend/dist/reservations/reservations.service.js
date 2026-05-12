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
const locals_service_1 = require("../local/locals.service");
const reservation_factory_1 = require("./reservation.factory");
let ReservationsService = class ReservationsService {
    repo;
    usersService;
    localsService;
    constructor(repo, usersService, localsService) {
        this.repo = repo;
        this.usersService = usersService;
        this.localsService = localsService;
    }
    async create(dto) {
        const { startDate, endDate, userId, localId } = dto;
        if (endDate <= startDate) {
            throw new common_1.BadRequestException('Date de fin doit être après la date de début.');
        }
        const user = await this.usersService.findOneUserById(userId);
        const local = await this.localsService.findOne(localId);
        if (local.isReserved) {
            throw new common_1.BadRequestException('Local déjà réservé pour ces dates.');
        }
        const conflict = await this.repo.find({ where: { local: { id: localId }, }
        });
        for (const c of conflict) {
            if (c.startDate < endDate && c.endDate > startDate) {
                throw new common_1.BadRequestException('Local déjà réservé pour ces dates.');
            }
        }
        const reservation = reservation_factory_1.ReservationFactory.create(dto, user, local);
        await this.checkOverlap(localId, new Date(startDate), new Date(endDate));
        return await this.repo.save(reservation);
    }
    async findAll() {
        return await this.repo.find({
            relations: ['user', 'local'],
            select: {
                user: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                },
                local: {
                    id: true,
                    name: true,
                    address: true,
                    pricePerDay: true,
                }
            }
        });
    }
    async findOne(id) {
        const reservation = await this.repo.findOne({
            where: { id },
            relations: ['user', 'local'],
        });
        if (!reservation) {
            throw new common_1.BadRequestException('Réservation non trouvée.');
        }
        return reservation;
    }
    async findOneSecure(id, user) {
        const reservation = await this.repo.findOne({
            where: { id },
            relations: ['user', 'local'],
        });
        if (!reservation) {
            throw new common_1.NotFoundException('Réservation non trouvée.');
        }
        const isOwner = reservation.user.id === user.sub;
        const isAdmin = user.role === 'administrator';
        if (!isOwner && !isAdmin) {
            throw new common_1.ForbiddenException("Vous n'avez pas accès à cette réservation.");
        }
        return reservation;
    }
    async findAllForUser(userId) {
        return this.repo.find({
            where: {
                user: { id: userId },
            },
            relations: ['local', 'user'],
            order: {
                startDate: 'DESC',
            },
        });
    }
    async UserActiveReservationValidation(userId, reservationId) {
        const currentDate = new Date();
        const reservation = await this.repo.findOne({
            where: {
                id: reservationId,
                userId: userId,
            },
        });
        if (!reservation) {
            throw new common_1.NotFoundException("Reservation not found");
        }
        if (reservation.endDate < currentDate) {
            throw new common_1.BadRequestException("Reservation is expired.");
        }
        return reservation;
    }
    async remove(id) {
        const reservation = await this.findOne(id);
        if (reservation.paid) {
            throw new common_1.BadRequestException('Impossible de supprimer une réservation déjà payée.');
        }
        return await this.repo.remove(reservation);
    }
    async update(id, attrs) {
        const reservation = await this.findOne(id);
        if (reservation.paid) {
            throw new common_1.BadRequestException('Impossible de modifier une réservation déjà payée.');
        }
        const newStart = attrs.startDate ?? reservation.startDate;
        const newEnd = attrs.endDate ?? reservation.endDate;
        if (newEnd <= newStart) {
            throw new common_1.BadRequestException('Date de fin doit être après la date de début.');
        }
        const conflict = await this.repo.find({ where: { local: { id: reservation.localId },
                id: (0, typeorm_2.Not)(reservation.id), }
        });
        for (const c of conflict) {
            if (c.startDate < newEnd && c.endDate > newStart) {
                throw new common_1.BadRequestException('Local déjà réservé pour ces dates.');
            }
        }
        Object.assign(reservation, attrs);
        await this.checkOverlap(reservation.local.id, new Date(newStart), new Date(newEnd), id);
        return await this.repo.save(reservation);
    }
    async findAllForLocal(localId) {
        const reservations = await this.repo.find({
            where: { local: { id: localId } },
            relations: ['local'],
            select: ['startDate', 'endDate'],
        });
        return reservations;
    }
    async checkOverlap(localId, startDate, endDate, excludeId) {
        const query = this.repo
            .createQueryBuilder('r')
            .innerJoin('r.local', 'local')
            .where('local.id = :localId', { localId })
            .andWhere('r.paid = :paid', { paid: true })
            .andWhere('r.startDate < :endDate', { endDate })
            .andWhere('r.endDate > :startDate', { startDate });
        if (excludeId) {
            query.andWhere('r.id != :excludeId', { excludeId });
        }
        const overlapping = await query.getOne();
        if (overlapping) {
            throw new common_1.BadRequestException('Ce local est déjà réservé pour ces dates.');
        }
    }
};
exports.ReservationsService = ReservationsService;
exports.ReservationsService = ReservationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reservations_entity_1.Reservation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        locals_service_1.LocalsService])
], ReservationsService);
//# sourceMappingURL=reservations.service.js.map