export interface VehicleType {
    idVehicleType: number,
    name: string,
    code: string,
    creationDate: Date,
    updateDate: Date,
    active: boolean
}

export interface FuelType{
    idFuelType: number,
    name: string,
    code: string,
    creationDate: Date,
    updateDate: Date,
    active: boolean
}

export interface Criteria{
    name: string,
    model: number,
    idFuelType: number,
    idVehicleType: number
}