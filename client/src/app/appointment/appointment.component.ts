import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { Appointment } from '../Appointment';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  public successMsg: string;
  public errorMsg: string;
  appointmentDate: string;
  name: string;
  email: string;
  duration:string;
  startTime:string;
  endTime:string;

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
  }

timeValidate(time){
  if (time.length == 2 ) {
   
    if (Number(time)>23) {
     return '00:';
    } else{
      return time+':';
    }
   
   
   } else if(time.length == 5){
    
     if (Number(time.slice(3,5))>59) {
      return time.slice(0,3)+ '00:';
      } else{
        return time+':';
      }

   }else if(time.length == 8){
    console.log(time,8)
     if (Number(time.slice(6,8))>59) {
      return time.slice(0,6)+ '00';
      } else{
        return  time;
      }

   }else{
     return time;
   }
}



  fromTime(){
    this.startTime = this.timeValidate(this.startTime);
  }

  toTime(){
    this.endTime = this.timeValidate(this.endTime);
      if ( this.endTime.length == 8) {
      //  this.calDuration();
      // alert(8)
      let startTime = this.miliseconds(
        Number(this.startTime.slice(0,2)),
        Number(this.startTime.slice(3,5)),
        Number(this.startTime.slice(6,8))
         )
        let endTime = this.miliseconds(
          Number(this.endTime.slice(0,2)),
          Number(this.endTime.slice(3,5)),
          Number(this.endTime.slice(6,8))
           )
          console.log( startTime,endTime);
       if (startTime>=endTime) {
        
         this.errorMsg = `EndTime ${this.endTime} must be greater then StartTime ${this.startTime}`;
         this.endTime = '';
       }else{
         
      this.duration=  this.difference((endTime -startTime)/1000);
       }
           
      }
      
  }
 // var milisec = miliseconds(24,36,0);
difference(timestamp){
 console.log(timestamp)
let hrs: number | string;
hrs = Math.floor(timestamp / 60 / 60);
if (hrs<10) {
  hrs = "0"+hrs;
}
let min: number | string;
 min = Math.floor(timestamp / 60) - (Number(hrs) * 60);
if (min<10) {
  min = "0"+min;
}

let sec: number | string;
sec = timestamp % 60;
if (sec<10) {
  sec = "0"+sec;
}

return `${hrs}:${min}:${sec}`;
}
singleDigit(){

}

   miliseconds(hrs,min,sec)
  {
      return((hrs*60*60+min*60+sec)*1000);
  }
 // calDuration(){

  // }
   
  createAppointment() {

    this.successMsg = '';
    this.errorMsg = '';
    this.appointmentService.createAppointment(this.appointmentDate, this.name, this.email,this.duration,this.endTime,this.startTime)
      .subscribe((createdAppointment: Appointment) => {
        this.appointmentDate = '';
        this.name = '';
        this.email = '';
        this.duration = '';
        this.endTime = '';
        this.startTime = '';
        const appointmentDate = new Date(createdAppointment.appointmentDate).toDateString();
        this.successMsg = `Appointment Booked Successfully for ${appointmentDate}`;
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
      });
  }

}
