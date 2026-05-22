"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./users/user.entity");
const hashing_module_1 = require("./hashing/hashing.module");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const reservations_module_1 = require("./reservations/reservations.module");
const reservations_entity_1 = require("./reservations/reservations.entity");
const locals_entity_1 = require("./local/locals.entity");
const locals_module_1 = require("./local/locals.module");
const payment_module_1 = require("./payment/payment.module");
const contact_module_1 = require("./contact/contact.module");
const mailer_1 = require("@nestjs-modules/mailer");
const change_requests_module_1 = require("./change-requests/change-requests.module");
const change_request_entity_1 = require("./change-requests/change-request.entity");
const cloudinary_module_1 = require("./cloudinary/cloudinary.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_DATABASE'),
                    entities: [user_entity_1.User, reservations_entity_1.Reservation, locals_entity_1.Local, change_request_entity_1.ChangeRequest],
                    synchronize: true,
                }),
            }),
            mailer_1.MailerModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    transport: {
                        service: "gmail",
                        auth: {
                            user: configService.get("GMAIL_MAIL"),
                            pass: configService.get("GMAIL_PASS"),
                        },
                    },
                    defaults: {
                        from: `"Rent-a-local" <${configService.get("GMAIL_MAIL")}>`,
                    },
                }),
            }),
            config_1.ConfigModule.forRoot({
                envFilePath: ".env",
                isGlobal: true,
            }),
            users_module_1.UsersModule,
            hashing_module_1.HashingModule,
            auth_module_1.AuthModule,
            reservations_module_1.ReservationsModule,
            locals_module_1.LocalsModule,
            payment_module_1.PaymentModule,
            contact_module_1.ContactModule,
            change_requests_module_1.ChangeRequestsModule,
            cloudinary_module_1.CloudinaryModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map