import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FuelType, VehicleType } from '../../interfaces/configuration.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  apiPath: string = 'config';

  constructor(private http: HttpClient) { }

  getListFuelTypes(): Observable<FuelType[]>{
    return this.http.get<FuelType[]>(
      `${environment.apiUrlBase}${this.apiPath}/fuel-type`,
    )
  }

  getListVehicleTypes(): Observable<VehicleType[]>{
    return this.http.get<VehicleType[]>(
      `${environment.apiUrlBase}${this.apiPath}/vehicle-type`,
    )
  }

}
