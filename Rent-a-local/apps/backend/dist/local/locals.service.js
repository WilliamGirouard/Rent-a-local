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
exports.LocalsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const locals_entity_1 = require("./locals.entity");
const reservations_entity_1 = require("../reservations/reservations.entity");
const locals_builder_1 = require("./locals.builder");
let LocalsService = class LocalsService {
    localsRepository;
    reservationsRepository;
    constructor(localsRepository, reservationsRepository) {
        this.localsRepository = localsRepository;
        this.reservationsRepository = reservationsRepository;
    }
    async findAll() {
        return this.localsRepository.find();
    }
    async findOne(id) {
        const local = await this.localsRepository.findOneBy({ id });
        if (!local) {
            throw new common_1.NotFoundException(`Local with ID ${id} not found`);
        }
        return local;
    }
    async findReservationsForLocal(localId) {
        return this.reservationsRepository.find({
            where: { local: { id: localId } },
            relations: ['local'],
            select: ['startDate', 'endDate'],
        });
    }
    async create(dto, imageURLS) {
        const local = new locals_builder_1.LocalBuilder()
            .setName(dto.name)
            .setAddress(dto.address)
            .setDescription(dto.description)
            .setPricePerDay(dto.pricePerDay)
            .setLat(dto.lat)
            .setLng(dto.lng)
            .setImages(imageURLS)
            .build();
        return await this.localsRepository.save(local);
    }
    async update(id, dto) {
        const local = await this.findOne(id);
        if (local.isReserved) {
            throw new common_1.BadRequestException(`Local with ID ${id} is reserved and cannot be Updated`);
        }
        Object.assign(local, dto);
        return await this.localsRepository.save(local);
    }
    async remove(id) {
        const local = await this.findOne(id);
        if (local.isReserved) {
            throw new common_1.BadRequestException(`Local with ID ${id} is reserved and cannot be Removed`);
        }
        return await this.localsRepository.remove(local);
    }
};
exports.LocalsService = LocalsService;
exports.LocalsService = LocalsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(locals_entity_1.Local)),
    __param(1, (0, typeorm_1.InjectRepository)(reservations_entity_1.Reservation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], LocalsService);
//# sourceMappingURL=locals.service.js.map