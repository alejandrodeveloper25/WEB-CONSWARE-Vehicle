import { FuelType, VehicleType } from "./configuration.interface";

export interface Vehicle{
    idVehicle: number,
    name: string,
    creationDate: Date,
    updateDate: Date,
    active: boolean
}

export interface VehicleDetails{
    idVehicleDetails: number,
    idVehicle: number,
    vehicleType: VehicleType,
    fuelType: FuelType,
    brand: string,
    model: number,
    cylinderCapacity: number,
    seating: number,
    automatic: boolean,
    manual: boolean,
    price: number,
    urlImg: string,
    creationDate: Date,
    updateDate: Date,
    active: boolean
}