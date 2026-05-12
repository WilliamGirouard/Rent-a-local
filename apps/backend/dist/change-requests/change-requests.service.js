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
exports.ChangeRequestsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const change_request_entity_1 = require("./change-request.entity");
const status_enum_1 = require("./status/status.enum");
const reservations_service_1 = require("../reservations/reservations.service");
const users_service_1 = require("../users/users.service");
let ChangeRequestsService = class ChangeRequestsService {
    repo;
    reservationsService;
    usersService;
    constructor(repo, reservationsService, usersService) {
        this.repo = repo;
        this.reservationsService = reservationsService;
        this.usersService = usersService;
    }
    async create(dto) {
        const reservation = await this.reservationsService.findOne(dto.reservationId);
        if (reservation.paid) {
            throw new common_1.BadRequestException('Impossible de demander un changement pour une réservation déjà payée.');
        }
        if (dto.newEndDate <= dto.newStartDate) {
            throw new common_1.BadRequestException('La date de fin doit être après la date de début.');
        }
        const existingRequest = await this.repo.findOne({
            where: {
                reservation: { id: dto.reservationId },
                status: status_enum_1.ChangeRequestStatus.PENDING,
            },
        });
        if (existingRequest) {
            throw new common_1.BadRequestException('Une demande de changement est déjà en attente pour cette réservation.');
        }
        const conflicts = await this.reservationsService.findByLocalId(reservation.local.id, reservation.id);
        for (const c of conflicts) {
            if (c.startDate < dto.newEndDate && c.endDate > dto.newStartDate) {
                throw new common_1.BadRequestException('Ces dates sont déjà réservées pour ce local.');
            }
        }
        const user = await this.usersService.findOneUserById(dto.userId);
        const changeRequest = new change_request_entity_1.ChangeRequest();
        changeRequest.newStartDate = dto.newStartDate;
        changeRequest.newEndDate = dto.newEndDate;
        changeRequest.reservation = reservation;
        changeRequest.user = user;
        return await this.repo.save(changeRequest);
    }
    async findAll() {
        return await this.repo.find({
            where: { status: status_enum_1.ChangeRequestStatus.PENDING },
            relations: ['reservation', 'user', 'reservation.local'],
        });
    }
    async approve(id) {
        const changeRequest = await this.repo.findOne({
            where: { id },
            relations: ['reservation'],
        });
        if (!changeRequest) {
            throw new common_1.NotFoundException('Change request non trouvé.');
        }
        if (changeRequest.status !== status_enum_1.ChangeRequestStatus.PENDING) {
            throw new common_1.BadRequestException('Cette demande a déjà été traitée.');
        }
        await this.reservationsService.update(changeRequest.reservation.id, {
            startDate: changeRequest.newStartDate,
            endDate: changeRequest.newEndDate,
        });
        changeRequest.status = status_enum_1.ChangeRequestStatus.APPROVED;
        return await this.repo.save(changeRequest);
    }
    async reject(id) {
        const changeRequest = await this.repo.findOne({ where: { id } });
        if (!changeRequest) {
            throw new common_1.NotFoundException('Change request non trouvé.');
        }
        if (changeRequest.status !== status_enum_1.ChangeRequestStatus.PENDING) {
            throw new common_1.BadRequestException('Cette demande a déjà été traitée.');
        }
        changeRequest.status = status_enum_1.ChangeRequestStatus.REJECTED;
        return await this.repo.save(changeRequest);
    }
};
exports.ChangeRequestsService = ChangeRequestsService;
exports.ChangeRequestsService = ChangeRequestsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(change_request_entity_1.ChangeRequest)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        reservations_service_1.ReservationsService,
        users_service_1.UsersService])
], ChangeRequestsService);
//# sourceMappingURL=change-requests.service.js.map