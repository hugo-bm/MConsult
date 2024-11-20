import { PrismaClient } from '@prisma/client';
import { Doctor } from '../../domain/enitites/Doctor';
import { IDoctorRepository } from '../../domain/repositories/IDoctorRepository';
import { PrismaSingleton } from '../database/PrismaSingleton';
import { DoctorService } from '../../domain/enitites/DoctorService';

export default class PrismaDoctorRepository implements IDoctorRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = PrismaSingleton.prismaInstance;
  }
  async findById(id: string): Promise<Doctor | null> {
    const resp = await this.prisma.doctor.findFirst({
      include: { Doctor_Service: true },
      where: { id_doctor: id },
    });
    return resp
      ? new Doctor(
          resp.id_doctor,
          resp.name,
          resp.user_name,
          resp.specialty,
          resp.icon,
          resp.password,
          resp.Doctor_Service.map(
            (item) =>
              new DoctorService(
                item.id_doctor_service,
                item.id_doctor,
                item.id_service,
                item.price.toNumber(),
              ),
          ),
        )
      : null;
  }
  async findAll(): Promise<Doctor[] | null> {
    const resp = await this.prisma.doctor.findMany({
      include: { Doctor_Service: true },
    });
    return resp
      ? resp.map(
          (doc) =>
            new Doctor(
              doc.id_doctor,
              doc.name,
              doc.user_name,
              doc.specialty,
              doc.icon,
              doc.password,
              doc.Doctor_Service.map(
                (item) =>
                  new DoctorService(
                    item.id_doctor_service,
                    item.id_doctor,
                    item.id_service,
                    item.price.toNumber(),
                  ),
              ),
            ),
        )
      : null;
  }
  async create(doctor: Doctor): Promise<void> {
    await this.prisma.doctor.create({
      data: {
        user_name: doctor.userName,
        name: doctor.name,
        specialty: doctor.specialty,
        icon: doctor.icon,
        password: doctor.password,
      },
    });
  }
  async update(doctor: Doctor): Promise<Doctor | null> {
    try {
      const doctorUpdated = await this.prisma.doctor.update({
        data: {
          user_name: doctor.userName,
          name: doctor.name,
          specialty: doctor.specialty,
          icon: doctor.icon,
          password: doctor.password,
        },
        where: { id_doctor: doctor.id_doctor },
      });
      if (doctorUpdated) {
        return new Doctor(
          doctorUpdated.id_doctor,
          doctorUpdated.name,
          doctorUpdated.user_name,
          doctorUpdated.specialty,
          doctorUpdated.icon,
          doctorUpdated.password,
          undefined,
        );
      }
      return null;
    } catch (error) {
      throw new Error(`Error on update doctor data: ${error}`);
    }
  }
  async delete(id: string): Promise<void> {
    // Check if there are services provide by this doctor before deleting
    const checkForLinkedServices = await this.prisma.doctor_Service.findMany({
      where: { id_doctor: id },
    });

    if (checkForLinkedServices.length > 0) {
      const servicesName: string[] = [];

      for (let service of checkForLinkedServices) {
        const resp = await this.prisma.service.findUnique({
          where: { id_service: service.id_service },
          select: { service: true },
        });
        if (resp) {
          servicesName.push(resp.service);
        }
      }
      const err = new Error();
      let message = `The doctor resource could not be removed because it is linked to the following services: |`;
      message = message + servicesName.join(';&');
      err.message = message;
      err.name = 'Conflict when removing doctor';
      throw err;
    }
    else {
      await this.prisma.doctor.delete({ where: { id_doctor: id } });
    }
  }
}
