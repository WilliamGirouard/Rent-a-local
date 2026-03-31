"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalFactory = void 0;
const locals_entity_1 = require("./locals.entity");
class LocalFactory {
    static create(dto) {
        const local = new locals_entity_1.Local();
        local.name = dto.name;
        local.address = dto.address;
        local.description = dto.description;
        local.pricePerDay = dto.pricePerDay;
        return local;
    }
}
exports.LocalFactory = LocalFactory;
//# sourceMappingURL=locals.factory.js.map