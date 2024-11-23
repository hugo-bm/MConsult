import { PrismaClient } from '@prisma/client';
import { Appointment } from '../../domain/enitites/Appointment';
import { IAppointmentRepository } from '../../domain/repositories/IAppointmentRepository';
import { PrismaSingleton } from '../database/PrismaSingleton';

export class PrismaAppointmentRepository implements IAppointmentRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = PrismaSingleton.prismaInstance;
  }
  async findAllbyDate(startDate: Date, endDate: Date): Promise<Appointment[] | null> {  
    const appointments = await this.prisma.appointment.findMany({
        where: {
          booking_date: { gte: startDate, lte: endDate },
        },
      });
  
      const response: Appointment[] = [];
      if (appointments.length > 0) {
        for (let appointment of appointments) {
          response.push(
            new Appointment(
              appointment.id_appointment,
              appointment.id_doctor,
              appointment.id_service,
              appointment.id_user,
              appointment.booking_date,
            ),
          );
        }
        return response;
      } else {
        return null;
      }
  }
  async findById(id: number): Promise<Appointment | null> {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id_appointment: id },
    });
    if (appointment) {
      return new Appointment(
        appointment.id_appointment,
        appointment.id_doctor,
        appointment.id_service,
        appointment.id_user,
        appointment.booking_date,
      );
    } else {
      return null;
    }
  }
  async findAllbyUser(id_user: string): Promise<Appointment[] | null> {
    const appointments = await this.prisma.appointment.findMany({
      where: { id_user: id_user },
    });
    const response: Appointment[] = [];
    if (appointments.length > 0) {
      for (let appointment of appointments) {
        response.push(
          new Appointment(
            appointment.id_appointment,
            appointment.id_doctor,
            appointment.id_service,
            appointment.id_user,
            appointment.booking_date,
          ),
        );
      }
      return response;
    } else {
      return null;
    }
  }
  async findAllbyDoctor(
    id_doctor: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Appointment[] | null> {
    const appointments = await this.prisma.appointment.findMany({
      where: {
        id_doctor: id_doctor,
        booking_date: { gte: startDate, lte: endDate },
      },
    });

    const response: Appointment[] = [];
    if (appointments.length > 0) {
      for (let appointment of appointments) {
        response.push(
          new Appointment(
            appointment.id_appointment,
            appointment.id_doctor,
            appointment.id_service,
            appointment.id_user,
            appointment.booking_date,
          ),
        );
      }
      return response;
    } else {
      return null;
    }
  }
  async create(appointment: Appointment): Promise<void> {
    await this.prisma.appointment.create({
      data: {
        id_doctor: appointment.id_doctor,
        id_service: appointment.id_service,
        id_user: appointment.id_user,
        booking_date: appointment.booking_date,
      },
    });
  }
  async update(appointment: Appointment): Promise<Appointment | null> {
    const appointmentUpdated = await this.prisma.appointment.update({
      where: {
        id_appointment: appointment.id_appointment,
      },
      data: {
        booking_date: appointment.booking_date,
      },
    });
    if (appointmentUpdated) {
      return new Appointment(
        appointmentUpdated.id_appointment,
        appointmentUpdated.id_doctor,
        appointmentUpdated.id_service,
        appointmentUpdated.id_user,
        appointmentUpdated.booking_date,
      );
    }
    return null;
  }
  async delete(id: number): Promise<void> {
    await this.prisma.appointment.delete({
      where: {
        id_appointment: id,
      },
    });
  }
}
