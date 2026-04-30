"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGuard = void 0;
const common_1 = require("@nestjs/common");
const roles_enum_1 = require("../../users/roles/roles.enum");
class AdminGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user) {
            throw new common_1.ForbiddenException("No user found");
        }
        if (user.role === roles_enum_1.Role.Admin) {
            return true;
        }
        throw new common_1.ForbiddenException("Admin only");
    }
}
exports.AdminGuard = AdminGuard;
//# sourceMappingURL=admin.guard.js.map