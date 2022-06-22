
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ClientPageRequest } from 'src/app/model/request/client-page-request';
import { Reservation } from 'src/app/model/reservation';
import { ManagerReservationResponse } from 'src/app/model/response/manager-reservation-response';
import { CredentialService } from 'src/app/service/credential.service';
import { ManagerReservationService } from 'src/app/service/employee/manager/manager-reservation.service';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';

@Component({
  selector: 'app-manager-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  
  public accountUrl!: string;
  public managerReservationResponse!: ManagerReservationResponse;
  public pages: number[] = [];

  constructor(private credentialService: CredentialService,
    private managerReservationService: ManagerReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private errorHandlerService: ErrorHandlerService) {}

  ngOnInit(): void {
    this.accountUrl = this.credentialService.getUserRole(`${sessionStorage.getItem("userRole")}`);
    this.getAllPagedReservations();
  }

  public getCompletedReservations(): Reservation[] {
    return this.managerReservationService.getCompletedReservations(this.managerReservationResponse?.reservations?.content);
  }

  public getPendingReservations(): Reservation[] {
    return this.managerReservationService.getPendingReservations(this.managerReservationResponse?.reservations?.content);
  }

  public getAllPagedReservations(): void {
    this.activatedRoute.queryParams.subscribe({
      next: (q: any) => {
        if (q?.offset === undefined || q?.offset === null || q?.offset as number < 1 || q?.size as number < 1)
          this.router.navigateByUrl(`/workspace/${this.accountUrl}/reservations?offset=1`);
        else
          this.managerReservationService
            .getAllPagedReservations(new ClientPageRequest(q?.offset, q?.size, ['startDate', 'createdAt'], 'desc')).subscribe({
              next: (payload: any) => {
                this.managerReservationResponse = payload?.responseBody;
                const reservationsSet: Set<Reservation> = new Set<Reservation>();
                this.managerReservationResponse?.reservations?.content?.forEach((r: Reservation) => {
                  reservationsSet.add(r);
                });
                this.managerReservationResponse.reservations.content = Array.from(reservationsSet);
                this.pages = new Array<number>(this.managerReservationResponse?.reservations?.totalPages);
              },
              error: (errorResponse: HttpErrorResponse) =>
                this.errorHandlerService.extractExceptionMsg(errorResponse)
            });
      }
    });
  }

  public searchBy(key: string): void {
    const res: Reservation[] = [];
    this.managerReservationResponse?.reservations?.content.forEach((r: Reservation) => {
      if (`REF-${r?.code}`.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || moment(r?.startDate).format(`DD-MMM-yyyy HH:mm`).toLowerCase().indexOf(key.toLowerCase()) !== -1
          || moment(r?.cancelDate).format(`DD-MMM-yyyy HH:mm`).toLowerCase().indexOf(key.toLowerCase()) !== -1
          // || r?.description.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || r?.status.toLowerCase().indexOf(key.toLowerCase()) !== -1)
        res.push(r);
    });

    this.managerReservationResponse.reservations.content = res;
    if (res.length === 0 || !key)
      this.getAllPagedReservations();
  }

  public onNavigatePagination(offset?: number): string | void {
    this.activatedRoute.queryParams.subscribe({
      next: (q: any) => {
        let url: string = `/workspace/${this.accountUrl}/reservations?offset=${offset}`;
        if (q?.size !== undefined && q?.size !== null && q?.size >= 1)
          url = `${url}&size=${q?.size}`;
        this.router.navigateByUrl(url);
        return url;
      }
    });
  }

  public onSelectPageSize(size: string): void {
    this.activatedRoute.queryParams.subscribe({
      next: (q: any) => {
        if (q?.offset === undefined || size.trim() === '' || size === undefined || size === null || parseInt(size.trim()) < 1)
          this.router.navigateByUrl(`/workspace/${this.accountUrl}/reservations?offset=1`);
        else
          this.router.navigateByUrl(`${window.location.pathname}?offset=${q?.offset}&size=${size}`);
      }
    });
  }
  
  
  
}













