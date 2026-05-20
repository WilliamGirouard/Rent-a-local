import { Local } from "./locals.entity";

export class LocalBuilder {
    private local: Local;

    constructor() {
        this.local = new Local();
    }

    setName(name: string): LocalBuilder {
        this.local.name = name;
        return this;
    }

    setAddress(address: string): LocalBuilder {
        this.local.address = address;
        return this;
    }

    setDescription(description: string): LocalBuilder {
        this.local.description = description;
        return this;
    }

    setPricePerDay(pricePerDay: number): LocalBuilder {
        this.local.pricePerDay = pricePerDay;
        return this;
    }
    setLat(lat: number): LocalBuilder {
        this.local.lat = lat;
        return this;
    }

    setLng(lng: number): LocalBuilder {
        this.local.lng = lng;
        return this;
    }
    // setOwner est ENLEVÉ - pas de lien direct User → Local

    setImages(images:string[]) : LocalBuilder {
        this.local.images = images;
        return this;
    }
    
    build(): Local {
        return this.local;
    }
}