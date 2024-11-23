import { dateToDateHour } from "../shared/dateTools";

export class Appointment {

public id_appointment: number | undefined;
public id_doctor: string;
public id_service: number;
public id_user: string;
public booking_date: Date;

constructor(
    id: number | undefined,
    id_doctor: string,
    id_service: number,
    id_user: string,
    booking_date: Date
){
    this.id_appointment = id;
    this.id_doctor = id_doctor;
    this.id_service = id_service;
    this.id_user = id_user;
    this.booking_date = booking_date;
}
 
public toJSON(){
    return {
        id: this.id_appointment,
        id_doctor: this.id_doctor,
        id_service: this.id_service ,
        id_user: this.id_user ,
        booking_date: dateToDateHour(this.booking_date)
    }
}

}