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
exports.LocalsController = void 0;
const common_1 = require("@nestjs/common");
const locals_service_1 = require("./locals.service");
const create_local_dto_1 = require("./dtos/create-local.dto");
const update_local_dto_1 = require("./dtos/update-local.dto");
const platform_express_1 = require("@nestjs/platform-express");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let LocalsController = class LocalsController {
    localsService;
    cloudinaryService;
    constructor(localsService, cloudinaryService) {
        this.localsService = localsService;
        this.cloudinaryService = cloudinaryService;
    }
    async create(createLocalDto, files) {
        const imageURLS = await this.cloudinaryService.uploadImages(files);
        return this.localsService.create(createLocalDto, imageURLS);
    }
    async findAll() {
        return await this.localsService.findAll();
    }
    async findOne(id) {
        return await this.localsService.findOne(+id);
    }
    async getReservations(id) {
        return await this.localsService.findReservationsForLocal(+id);
    }
    async update(id, updateLocalDto) {
        return await this.localsService.update(+id, updateLocalDto);
    }
    async remove(id) {
        return await this.localsService.remove(+id);
    }
};
exports.LocalsController = LocalsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 5, {
        limits: { fileSize: 5 * 1024 * 1024 }
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_local_dto_1.CreateLocalDto, Array]),
    __metadata("design:returntype", Promise)
], LocalsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocalsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocalsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/reservations'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocalsController.prototype, "getReservations", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_local_dto_1.UpdateLocalDto]),
    __metadata("design:returntype", Promise)
], LocalsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocalsController.prototype, "remove", null);
exports.LocalsController = LocalsController = __decorate([
    (0, common_1.Controller)('locals'),
    __metadata("design:paramtypes", [locals_service_1.LocalsService,
        cloudinary_service_1.CloudinaryService])
], LocalsController);
//# sourceMappingURL=locals.controller.js.map