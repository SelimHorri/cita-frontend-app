
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import * as moment from 'moment';
import { DateBackendFormat } from 'src/app/model/date-backend-format';
import { ReservationStatus } from 'src/app/model/reservation-status';
import { PageResponse } from 'src/app/model/response/page/page-response';
import { CalendarService } from 'src/app/service/calendar.service';
import { CredentialService } from 'src/app/service/credential.service';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';
import { ReservationService } from 'src/app/service/reservation.service';

@Component({
  selector: 'app-saloon-calendar',
  templateUrl: './saloon-calendar.component.html',
  styleUrls: ['./saloon-calendar.component.scss']
})
export class SaloonCalendarComponent implements OnInit {
  
  public accountUrl!: string;
  public saloonReservations!: PageResponse;
  public calendarOptions!: CalendarOptions;
  
  constructor(private credentialService: CredentialService,
    private reservationService: ReservationService,
    private calendarService: CalendarService,
    private activatedRoute: ActivatedRoute,
    private errorHandlerService: ErrorHandlerService) {}
  
  ngOnInit(): void {
    this.accountUrl = this.credentialService.getUserRole(`${sessionStorage.getItem("userRole")}`);
    this.getAllReservationsBySaloonId();
  }
  
  public getAllReservationsBySaloonId(): void {
    this.activatedRoute.params.subscribe({
      next: (p: any) => {
        this.reservationService.findAllBySaloonId(p?.id).subscribe({
          next: (saloonReservationsPayload: any) => {
            this.saloonReservations = saloonReservationsPayload?.responseBody;
            this.calendarOptions = this.calendarService.createSaloonCalendar();
            this.saloonReservations?.content?.forEach(r => {
              if (r?.status !== ReservationStatus.CANCELLED && r?.status !== ReservationStatus.COMPLETED)
                (this.calendarOptions.events as Array<any>).push({
                  title: `REF-${r?.code?.substring(0, 8)}`,
                  date: `${moment(r?.startDate).format(`yyyy-MM-DD HH:mm`)}`,
                  interactive: true,
                  className: 'btn btn-outline-danger',
                  url: `/workspace/${this.accountUrl}/reservations/${r?.id}`
                });
            });
          },
          error: (errorResponse: HttpErrorResponse) =>
              this.errorHandlerService.extractExceptionMsg(errorResponse)
        });
      }
    });
  }
  
  
  
}











