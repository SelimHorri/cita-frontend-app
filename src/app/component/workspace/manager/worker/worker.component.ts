
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Employee } from 'src/app/model/employee';
import { ManagerWorkerInfoResponse } from 'src/app/model/response/manager-worker-info-response';
import { CredentialService } from 'src/app/service/credential.service';
import { ManagerWorkerServiceService } from 'src/app/service/employee/manager/manager-worker-service.service';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';

@Component({
  selector: 'app-manager-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss']
})
export class WorkerComponent implements OnInit {
  
  public accountUrl!: string;
  public managerWorkerInfoResponse!: ManagerWorkerInfoResponse;
  
  constructor(private credentialService: CredentialService,
    private managerWorkerService: ManagerWorkerServiceService,
    private errorHandlerService: ErrorHandlerService) {}
  
  ngOnInit(): void {
    this.accountUrl = this.credentialService.getUserRole(`${sessionStorage.getItem("userRole")}`);
    this.getAllSubWorkers();
  }
  
  private getAllSubWorkers(): void {
    this.managerWorkerService.getAllSubWorkers().subscribe({
      next: (payload: any) => {
        this.managerWorkerInfoResponse = payload?.responseBody;
      },
      error: (errorResponse: HttpErrorResponse) =>
        this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }
  
  public searchBy(key: string): void {
    const res: Employee[] = [];
    this.managerWorkerInfoResponse?.subWorkers?.content.forEach((w: Employee) => {
      if (w?.firstname.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || w?.lastname.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || `${w?.firstname} ${w?.lastname}`.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || w?.saloon?.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || w?.saloon?.code.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || `#${w?.saloon?.code?.substring(0, 8)}`.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || w?.credential?.role?.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || w?.email?.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || w?.phone?.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || moment(w?.birthdate).format(`DD-MMM-yyyy`).toLowerCase().indexOf(key.toLowerCase()) !== -1
          || moment(w?.birthdate).format(`MMMM-yyyy`).toLowerCase().indexOf(key.toLowerCase()) !== -1
          || moment(w?.hiredate).format(`DD-MMM-yyyy`).toLowerCase().indexOf(key.toLowerCase()) !== -1
          || moment(w?.hiredate).format(`MMMM-yyyy`).toLowerCase().indexOf(key.toLowerCase()) !== -1)
        res.push(w);
    });
    this.managerWorkerInfoResponse.subWorkers.content = res;
    if (!key)
      this.getAllSubWorkers();
  }
  
  
  
}













