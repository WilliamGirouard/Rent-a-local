"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const locals_entity_1 = require("./locals.entity");
const locals_service_1 = require("./locals.service");
const locals_controller_1 = require("./locals.controller");
let LocalsModule = class LocalsModule {
};
exports.LocalsModule = LocalsModule;
exports.LocalsModule = LocalsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([locals_entity_1.Local])],
        providers: [locals_service_1.LocalsService],
        controllers: [locals_controller_1.LocalsController],
        exports: [locals_service_1.LocalsService],
    })
], LocalsModule);
//# sourceMappingURL=locals.module.js.map