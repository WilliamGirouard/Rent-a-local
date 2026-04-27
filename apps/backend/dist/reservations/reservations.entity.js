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
exports.Reservation = void 0;
const class_transformer_1 = require("class-transformer");
const user_entity_1 = require("../users/user.entity");
const locals_entity_1 = require("../local/locals.entity");
const typeorm_1 = require("typeorm");
let Reservation = class Reservation {
    id;
    startDate;
    endDate;
    paid;
    user;
    get userId() {
        return this.user.id;
    }
    local;
    get localId() {
        return this.local.id;
    }
    logInsert() {
        console.log(`Reservation inserted with ID: ${this.id}`);
    }
    logRemove() {
        console.log(`Reservation deleted with ID: ${this.id}`);
    }
};
exports.Reservation = Reservation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Reservation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Reservation.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Reservation.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Reservation.prototype, "paid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Reservation.prototype, "user", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], Reservation.prototype, "userId", null);
__decorate([
    (0, typeorm_1.ManyToOne)(() => locals_entity_1.Local),
    __metadata("design:type", locals_entity_1.Local)
], Reservation.prototype, "local", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], Reservation.prototype, "localId", null);
__decorate([
    (0, typeorm_1.AfterInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Reservation.prototype, "logInsert", null);
__decorate([
    (0, typeorm_1.BeforeRemove)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Reservation.prototype, "logRemove", null);
exports.Reservation = Reservation = __decorate([
    (0, typeorm_1.Entity)()
], Reservation);
//# sourceMappingURL=reservations.entity.js.map