import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle, VehicleDetails } from '../../interfaces/vehicle.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  apiPath: string = 'vehicle';

  constructor(private http: HttpClient) { }

  getListVehicle(): Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(
      `${environment.apiUrlBase}${this.apiPath}`
    )
  }

  getVehicleById(id: any): Observable<Vehicle>{
    return this.http.get<Vehicle>(
      `${environment.apiUrlBase}${this.apiPath}/${id}`
    )
  }

  getVehicleByCriteria(criteria: any): Observable<Vehicle[]>{
    return this.http.post<Vehicle[]>(
      `${environment.apiUrlBase}${this.apiPath}/criteria`,
      criteria
    )
  }

  getListVehicleByCriteria(criteria: any): Observable<Vehicle[]>{
    return this.http.post<Vehicle[]>(
      `${environment.apiUrlBase}${this.apiPath}/criteria`,
      criteria
    )
  }

  createVehicle(newVehicle: any): Observable<Vehicle>{
    console.log(newVehicle)
    return this.http.post<Vehicle>(
      `${environment.apiUrlBase}${this.apiPath}`,
      newVehicle
    )
  }

  updateVehicle(idVehicle: number, vehicle: any): Observable<Vehicle>{
    return this.http.put<Vehicle>(
      `${environment.apiUrlBase}${this.apiPath}/?id=${idVehicle}`,
      vehicle
    )
  }

  removeVehicle(idVehicle: number): Observable<Vehicle>{
    return this.http.post<Vehicle>(
      `${environment.apiUrlBase}${this.apiPath}/${idVehicle}/delete`,{}
    )
  }

  getVehicleDetailsByIdVehicle(idVehicle:any): Observable<VehicleDetails>{
    return this.http.get<VehicleDetails>(
      `${environment.apiUrlBase}${this.apiPath}/${idVehicle}/details`
    )
  }

}
