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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./service/users.service");
const create_user_dto_1 = require("./dtos/create-user.dto");
const update_user_dto_1 = require("./dtos/update-user.dto");
const serialize_interceptor_1 = require("../interceptors/serialize.interceptor");
const user_dto_1 = require("./dtos/user.dto");
const auth_service_1 = require("./service/auth.service");
const current_user_decorator_1 = require("./decorators/current-user.decorator");
const users_entity_1 = require("./users.entity");
const admin_guard_1 = require("./guards/admin.guard");
let UsersController = class UsersController {
    service;
    auth;
    constructor(service, auth) {
        this.service = service;
        this.auth = auth;
    }
    async createUser(body, session) {
        const user = await this.auth.signup(body.email, body.password);
        session.userId = user.id;
        return user;
    }
    async signin(body, session) {
        const user = await this.auth.signin(body.email, body.password);
        session.userId = user.id;
        return user;
    }
    signout(session) {
        session.userId = null;
        return "Successfully logged out";
    }
    whoami(user) {
        return user;
    }
    findUser(id) {
        return this.service.findOne(parseInt(id));
    }
    findAllUsers() {
        return this.service.findAll();
    }
    updateUser(id, body) {
        return this.service.updateUser(parseInt(id), body);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)("/signup"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)("signin"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signin", null);
__decorate([
    (0, common_1.Post)("signout"),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "signout", null);
__decorate([
    (0, common_1.Get)("/whoami"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_entity_1.User]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "whoami", null);
__decorate([
    (0, serialize_interceptor_1.Serialize)(user_dto_1.UserDto),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findUser", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAllUsers", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.updateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [users_service_1.UsersService, auth_service_1.AuthService])
], UsersController);
//# sourceMappingURL=users.controller.js.map