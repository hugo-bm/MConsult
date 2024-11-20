import { Appointment } from "../enitites/Appointment";

export interface IAppointmentRepository{
    findById(id: number): Promise<Appointment |null>;
    findAllbyUser(id_user: string): Promise<Appointment[] |null>;
    findAllbyDoctor(id_doctor: string, startDate: Date, endDate: Date): Promise<Appointment[] |null>;
    findAllbyDate(startDate: Date, endDate: Date): Promise<Appointment[] |null>;
    create(appointment: Appointment): Promise<void>;
    update(appointment: Appointment): Promise<Appointment | null>;
    delete(id: number): Promise<void>;
}