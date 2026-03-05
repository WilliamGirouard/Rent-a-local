"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGuard = void 0;
const common_1 = require("@nestjs/common");
const roles_enum_1 = require("../../users/roles/roles.enum");
class AdminGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const userRole = request['user'].role;
        if (userRole === roles_enum_1.Role.Admin) {
            return true;
        }
        else {
            throw new common_1.UnauthorizedException("Vous n'avez pas l'autorisation.");
        }
    }
}
exports.AdminGuard = AdminGuard;
//# sourceMappingURL=admin.guard.js.map