"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalBuilder = void 0;
const locals_entity_1 = require("./locals.entity");
class LocalBuilder {
    local;
    constructor() {
        this.local = new locals_entity_1.Local();
    }
    setName(name) {
        this.local.name = name;
        return this;
    }
    setAddress(address) {
        this.local.address = address;
        return this;
    }
    setDescription(description) {
        this.local.description = description;
        return this;
    }
    setPricePerDay(pricePerDay) {
        this.local.pricePerDay = pricePerDay;
        return this;
    }
    setLat(lat) {
        this.local.lat = lat;
        return this;
    }
    setLng(lng) {
        this.local.lng = lng;
        return this;
    }
    setImages(images) {
        this.local.images = images;
        return this;
    }
    build() {
        return this.local;
    }
}
exports.LocalBuilder = LocalBuilder;
//# sourceMappingURL=locals.builder.js.map