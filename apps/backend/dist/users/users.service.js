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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
let UsersService = class UsersService {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async findAllUsers() {
        return this.authService.accessUsersRepo().find();
    }
    async findOneUserById(id) {
        const foundUser = await this.authService.accessUsersRepo().findOneBy({ id: id });
        if (foundUser == null) {
            throw new common_1.NotFoundException("Invalid Id");
        }
        return foundUser;
    }
    async findOneUserByEmail(email) {
        const foundUser = await this.authService.accessUsersRepo().findOneBy({ email: email });
        if (foundUser == null) {
            throw new common_1.BadRequestException("Invalid email");
        }
        return foundUser;
    }
    async removeUser(id) {
        const foundUser = await this.findOneUserById(id);
        return await this.authService.accessUsersRepo().remove(foundUser);
    }
    async updateUser(id, attrs) {
        const foundUser = await this.findOneUserById(id);
        if (attrs == id)
            Object.assign(foundUser, attrs);
        return this.authService.accessUsersRepo().save(foundUser);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], UsersService);
//# sourceMappingURL=users.service.js.map