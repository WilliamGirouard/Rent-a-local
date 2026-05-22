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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const hashing_service_1 = require("../hashing/hashing.service");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    hashingService;
    jwtService;
    userService;
    constructor(hashingService, jwtService, userService) {
        this.hashingService = hashingService;
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async verifyAlreadyExistingEmail(email) {
        const alreadyExistingBool = await this.userService
            .accessUsersRepo()
            .existsBy({ email: email });
        if (alreadyExistingBool) {
            throw new common_1.ConflictException('Un compte utilise deja cet email.');
        }
    }
    async register(dto) {
        await this.verifyAlreadyExistingEmail(dto.email);
        const hashedPassword = await this.hashingService.passwordHasher(dto.password);
        return await this.userService.createUser(dto, hashedPassword);
    }
    async login(user) {
        const userVerified = await this.userService.findOneUserByEmail(user.email);
        if (userVerified == null) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if ((await this.hashingService.compareHashToPassword(user.password, userVerified?.password)) == false) {
            throw new common_1.UnauthorizedException('Unauthorized connection');
        }
        const payload = {
            sub: userVerified.id,
            role: userVerified.role,
        };
        return { access_token: await this.jwtService.signAsync(payload) };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [hashing_service_1.HashingService,
        jwt_1.JwtService,
        users_service_1.UsersService])
], AuthService);
//# sourceMappingURL=auth.service.js.map