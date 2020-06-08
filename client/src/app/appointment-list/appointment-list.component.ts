import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { Appointment } from '../Appointment';
import { mergeMap } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  public loading = true;
  public errorMsg: string;
  public successMsg: string;
  public appointments: Appointment[];
  public columns = ['appointmentDate', 'name', 'email','startTime','duration', 'cancel'];

  constructor(private appointmentService: AppointmentService,private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.appointmentService.getAppointments()
      .subscribe((appointments: Appointment[]) => {
        this.appointments = appointments;
        this.loading = false;
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
        this.loading = false;
      });
  }

  cancelAppointment(id: string) {
    this.appointmentService.cancelAppointment(id)
      .pipe(
        mergeMap(() => this.appointmentService.getAppointments())
      )
      .subscribe((appointments: Appointment[]) => {
        this.appointments = appointments;
        this.successMsg = 'Successfully cancelled appointment';
        this._snackBar.open( this.successMsg , "", {
          duration: 2000,
          panelClass: ['mat-toolbar', 'mat-primary']
        });
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
        this._snackBar.open(error.error.message, "", {
          duration: 2000,
          panelClass: ['mat-toolbar', 'mat-warn']
        });
      });
  }

}
