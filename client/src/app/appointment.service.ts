import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from './Appointment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private BASE_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.BASE_URL}/appointments`);
  }
//this.duration,this.endTime,this.startTime
  createAppointment(appointmentDate: string, name: string, email: string,duration:string,endTime:string,startTime:string): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.BASE_URL}/appointments`, { appointmentDate, name, email,duration,endTime,startTime });
  }

  cancelAppointment(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/appointments/${id}`);
  }
}
