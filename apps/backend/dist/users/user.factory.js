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
exports.UserFactory = void 0;
const common_1 = require("@nestjs/common");
const hashing_service_1 = require("../hashing/hashing.service");
const user_entity_1 = require("./user.entity");
const roles_enum_1 = require("./roles/roles.enum");
let UserFactory = class UserFactory {
    hashingService;
    constructor(hashingService) {
        this.hashingService = hashingService;
    }
    async createUser(dto, role = roles_enum_1.Role.User) {
        const newUser = new user_entity_1.User();
        newUser.email = dto.email;
        newUser.firstName = dto.firstName;
        newUser.lastName = dto.lastName;
        newUser.password = await this.hashingService.passwordHasher(dto.password);
        newUser.role = role;
        return newUser;
    }
};
exports.UserFactory = UserFactory;
exports.UserFactory = UserFactory = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [hashing_service_1.HashingService])
], UserFactory);
//# sourceMappingURL=user.factory.js.map