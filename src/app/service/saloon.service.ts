
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiPayloadSaloon } from '../model/response/api/api-payload-saloon';
import { ApiPayloadSaloonList } from '../model/response/api/api-payload-saloon-list';

@Injectable({
  providedIn: 'root'
})
export class SaloonService {
  
  private apiUrl: string = environment.API_URL;
  
  constructor(private http: HttpClient) {
    this.apiUrl = `${this.apiUrl}/saloons`;
  }
  
  public findAllWithOffset(offset: number): Observable<ApiPayloadSaloonList> {
    return this.http.get<ApiPayloadSaloonList>(`${this.apiUrl}/offset/${offset}`)
        .pipe(map(payload => {
          payload?.responseBody?.forEach(s => s.openingDate = new Date(s?.openingDate));
          return payload;
        }));
  }
  
  public findById(id: number): Observable<ApiPayloadSaloon> {
    return this.http.get<ApiPayloadSaloon>(`${this.apiUrl}/${id}`)
        .pipe(map(res => {
          res.responseBody.openingDate = new Date(res?.responseBody?.openingDate);
          return res;
    }));
  }
  
  public findAllByCode(code: string): Observable<ApiPayloadSaloonList> {
    return this.http.get<ApiPayloadSaloonList>(`${this.apiUrl}/code/${code}`)
        .pipe(map(res => {
          res?.responseBody?.forEach(s => s.openingDate = new Date(s?.openingDate));
          return res;
    }));
  }
  
  
  
}













