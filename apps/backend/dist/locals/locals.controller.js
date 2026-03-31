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
const serialize_interceptor_1 = require("../interceptors/serialize.interceptor");
const locals_service_1 = require("./locals.service");
const create_local_dto_1 = require("../dtos/create-local.dto");
const update_local_dto_1 = require("../dtos/update-local.dto");
const local_dto_1 = require("../dtos/local.dto");
let LocalsController = class LocalsController {
    localsService;
    constructor(localsService) {
        this.localsService = localsService;
    }
    async findAll() {
        return await this.localsService.findAll();
    }
    async findOne(id) {
        return await this.localsService.findOne(id);
    }
    async create(body) {
        return await this.localsService.create(body);
    }
    async remove(id) {
        return await this.localsService.remove(id);
    }
    async update(id, body) {
        return await this.localsService.update(id, body);
    }
};
exports.LocalsController = LocalsController;
__decorate([
    (0, serialize_interceptor_1.Serialize)(local_dto_1.LocalDto),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocalsController.prototype, "findAll", null);
__decorate([
    (0, serialize_interceptor_1.Serialize)(local_dto_1.LocalDto),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LocalsController.prototype, "findOne", null);
__decorate([
    (0, serialize_interceptor_1.Serialize)(local_dto_1.LocalDto),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_local_dto_1.CreateLocalDto]),
    __metadata("design:returntype", Promise)
], LocalsController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LocalsController.prototype, "remove", null);
__decorate([
    (0, serialize_interceptor_1.Serialize)(update_local_dto_1.UpdateLocalDto),
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_local_dto_1.UpdateLocalDto]),
    __metadata("design:returntype", Promise)
], LocalsController.prototype, "update", null);
exports.LocalsController = LocalsController = __decorate([
    (0, common_1.Controller)('locals'),
    __metadata("design:paramtypes", [locals_service_1.LocalsService])
], LocalsController);
//# sourceMappingURL=locals.controller.js.map