import { Component } from '@angular/core';
import { Criteria, FuelType, VehicleType } from '../../interfaces/configuration.interface';
import { EMPTY, Observable, catchError, of } from 'rxjs';
import { ConfigurationService } from '../../core/services/configuration.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { FormsModule } from '@angular/forms';
import { VehicleService } from '../../core/services/vehicle.service';
import { Vehicle } from '../../interfaces/vehicle.interface';

@Component({
  selector: 'app-vechicles-list',
  standalone: true,
  imports: [AsyncPipe, ErrorMessageComponent, FormsModule, CommonModule],
  templateUrl: './vechicles-list.component.html',
  styleUrl: './vechicles-list.component.scss'
})
export class VechiclesListComponent {

  public fuelTypeResult$!: Observable<FuelType[]>;
  public vehicleTypeResults$!: Observable<VehicleType[]>;
  public modelList: number[] = [];
  public errorMessage!: string;
  public vechileResult$!: Observable<Vehicle[]>;

  public applyLoading: boolean = false;
  
  public applyEdit: boolean = false;
  public titleFrom: string = 'Crear Vehiculo';

  public criteria = {
    name: "",
    model: "",
    idFuelType: "",
    idVehicleType: ""
  };

  public formData = {
    idVehicle:"",
    name: "",
    idVehicleType: "",
    idFuelType: "",
    brand: "",
    model: "",
    cylinderCapacity: 0.0,
    seating: 0,
    automatic: false,
    manual: false,
    price: 0.0
  }

  constructor(
    private configurationService: ConfigurationService,
    private vehicleServices: VehicleService
  ) { }

  ngOnInit(): void {
    this.initComponent();
  }

  initComponent() {
    this.fuelTypeResult$ = this.configurationService.getListFuelTypes().pipe(catchError((error: string) => {
      this.errorMessage = error;
      return EMPTY;
    }))

    this.vehicleTypeResults$ = this.configurationService.getListVehicleTypes().pipe(catchError((error: string) => {
      this.errorMessage = error;
      return EMPTY;
    }))

    const nextYear: number = new Date().getFullYear() + 1;
    this.modelList = [];
    for (let i = 0; i < 30; i++) {
      this.modelList.push(nextYear - i);
    }

    this.searchByCriteria();
  }

  searchByCriteria() {
    this.applyLoading = true;
    if (!this.criteria.name && !this.criteria.model && !this.criteria.idVehicleType && !this.criteria.idFuelType) {
      this.vehicleServices.getListVehicle().subscribe(
        (result) => {
          this.vechileResult$ = of(result); 
          this.applyLoading = false;
        },
        (error) => {
          console.error("Error occurred:", error);
        }
      );
    }else{
      
    }
  }

  selectedVehicle(id:any){
    this.applyLoading = true;
    this.applyEdit = true;

    this.vehicleServices.getVehicleById(id).subscribe(
      (result: any) => {
        
        this.formData.idVehicle = result.idVehicle; 
        this.formData.name = result.name;

        this.vehicleServices.getVehicleDetailsByIdVehicle(this.formData.idVehicle).subscribe(
          (resp: any) =>{
            console.log(resp);
            this.formData.idVehicleType = resp.idVehicleType;
            this.formData.idFuelType = resp.idFuelType;
            this.formData.brand = resp.brand;
            this.formData.model = resp.model;
            this.formData.cylinderCapacity = resp.cylinderCapacity;
            this.formData.seating = resp.seating;
            this.formData.automatic  =resp.automatic;
            this.formData.manual = resp.manual;
            this.formData.price = resp.price;
            this.applyLoading = false;
          },(error) =>{
            console.error("Error occurred:", error);
            this.applyLoading = false;
          }
        );
      
      },
      (error) => {
        console.error("Error occurred:", error);
        this.applyLoading = false;
      }
    );
    
  }

  removeVehicule(id:any){
    this.applyLoading = true;
    this.vehicleServices.removeVehicle(id).subscribe((result) => {
      console.log(result);

      this.searchByCriteria();
    },
      (error) => {
        console.error("Error occurred:", error);
        this.applyLoading = false;
      }
    );
  }

  createVehicle() {
    
    this.applyLoading = true;
    this.vehicleServices.createVehicle(this.formData).subscribe((result) => {
      this.formData = {
        idVehicle: "",
        name: "",
        idVehicleType: "",
        idFuelType: "",
        brand: "",
        model: "",
        cylinderCapacity: 0.0,
        seating: 0,
        automatic: false,
        manual: false,
        price: 0.0
      }

      this.searchByCriteria();
    },
      (error) => {
        console.error("Error occurred:", error);
        this.applyLoading = false;
      }
    );
  }

  editVehicule(){
    this.applyLoading = true;
    let id = parseInt(this.formData.idVehicle);
    this.vehicleServices.updateVehicle(id, this.formData).subscribe((result) => {
      console.log(result);
      this.formData = {
        idVehicle: "",
        name: "",
        idVehicleType: "",
        idFuelType: "",
        brand: "",
        model: "",
        cylinderCapacity: 0.0,
        seating: 0,
        automatic: false,
        manual: false,
        price: 0.0
      }

      this.searchByCriteria();
    },
      (error) => {
        console.error("Error occurred:", error);
        this.applyLoading = false;
      }
    );
  }
}
