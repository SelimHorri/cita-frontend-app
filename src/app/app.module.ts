
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { AuthenticationComponent } from './component/authentication/authentication.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { AuthenticationService } from './service/authentication.service';
import { RegistrationService } from './service/registration.service';
import { Error404Component } from './component/error/error404/error404.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { ContactComponent } from './component/contact/contact.component';
import { AboutComponent } from './component/about/about.component';
import { TagService } from './service/tag.service';
import { IndexComponent } from './component/workspace/customer/index/index.component';
import { ProfileComponent } from './component/workspace/customer/profile/profile.component';
import { LogoutComponent } from './component/logout/logout.component';
import { CredentialService } from './service/credential.service';
import { ErrorHandlerService } from './service/error-handler.service';
import { CustomerService } from './service/customer.service';
import { FavouriteComponent } from './component/workspace/customer/favourite/favourite.component';
import { RatingComponent } from './component/workspace/customer/rating/rating.component';
import { ReservationComponent } from './component/workspace/customer/reservation/reservation.component';
import { ReservationService } from './service/reservation.service';
import { SaloonService } from './service/saloon.service';
import { DatePipe } from '@angular/common';
import { TaskService } from './service/task.service';
import { ReservationDetailsComponent } from './component/workspace/customer/reservation/reservation-details/reservation-details.component';
import { AssignedWorkerComponent } from './component/workspace/customer/reservation/assigned-worker/assigned-worker.component';
import { ServiceDetailService } from './service/service-detail.service';
import { OrderedDetailService } from './service/ordered-detail.service';
import { HealthLivenessService } from './service/health-liveness.service';
import { SaloonComponent } from './component/saloon/saloon.component';
import { LocationComponent } from './component/location/location.component';
import { SaloonDetailComponent } from './component/saloon/saloon-detail/saloon-detail.component';
import { ToastNoAnimationModule, ToastrModule, ToastrService } from 'ngx-toastr';
import { NotificationService } from './service/notification.service';
import { EmployeeService } from './service/employee.service';
import { CustomerReservationService } from './service/customer/customer-reservation.service';
import { CustomerReservationDetailService } from './service/customer/customer-reservation-detail.service';
import { CustomerProfileService } from './service/customer/customer-profile.service';
import { CustomerFavouriteService } from './service/customer/customer-favourite.service';
import { SaloonCalendarComponent } from './component/saloon/saloon-calendar/saloon-calendar/saloon-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  timeGridPlugin,
  dayGridPlugin,
  interactionPlugin,
]);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticationComponent,
    RegistrationComponent,
    Error404Component,
    NavbarComponent,
    ContactComponent,
    AboutComponent,
    IndexComponent,
    ProfileComponent,
    LogoutComponent,
    FavouriteComponent,
    RatingComponent,
    ReservationComponent,
    ReservationDetailsComponent,
    AssignedWorkerComponent,
    SaloonComponent,
    LocationComponent,
    SaloonDetailComponent,
    SaloonCalendarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    FullCalendarModule,
  ],
  providers: [
    AuthenticationService,
    RegistrationService,
    TagService,
    CredentialService,
    CustomerService,
    CustomerProfileService,
    CustomerFavouriteService,
    CustomerReservationService,
    CustomerReservationDetailService,
    ErrorHandlerService,
    ReservationService,
    SaloonService,
    DatePipe,
    TaskService,
    ServiceDetailService,
    OrderedDetailService,
    HealthLivenessService,
    EmployeeService,
    ToastrService,
    NotificationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
