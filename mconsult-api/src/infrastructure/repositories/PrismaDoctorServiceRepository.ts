import { PrismaClient } from '@prisma/client';
import { DoctorService } from '../../domain/enitites/DoctorService';
import { IDoctorServiceRepository } from '../../domain/repositories/IDoctorServiceRepository';
import { PrismaSingleton } from '../database/PrismaSingleton';
import * as uuid from 'uuid';

export default class PrismaDoctorServiceRepository
  implements IDoctorServiceRepository
{
  private prisma: PrismaClient;

  constructor() {
    this.prisma = PrismaSingleton.prismaInstance;
  }

  async findOne(id_doctor_service: number): Promise<DoctorService | null> {
    const resp = await this.prisma.doctor_Service.findFirst({
      where: {
        id_doctor_service: id_doctor_service,
      },
    });
    if (resp) {
      return new DoctorService(
        resp.id_doctor_service,
        resp.id_doctor,
        resp.id_service,
        resp.price.toNumber(),
      );
    }
    return null;
  }
  async addDoctorService(
    service_id: number,
    doctor_id: string,
    price: number,
  ): Promise<void> {
    if (uuid.validate(doctor_id) && service_id > 0 && price > 0.0) {
      await this.prisma.doctor_Service.create({
        data: {
          id_service: service_id,
          id_doctor: doctor_id,
          price: price,
        },
      });
    } else {
      throw new Error(
        'Incorrect parameters, it was not possible to link the service to the doctor.',
      );
    }
  }
  async updatePriceService(
    id_doctor_service: number,
    price: number,
  ): Promise<void> {
    if (id_doctor_service > 0 && price > 0.0) {
      await this.prisma.doctor_Service.update({
        data: {
          price: price,
        },
        where: {
          id_doctor_service: id_doctor_service,
        },
      });
    } else {
      throw new Error('Incorrect parameters, unable to update service price.');
    }
  }
  async removeDoctorService(id_doctor_service: number): Promise<void> {
    if (id_doctor_service > 0) {
      await this.prisma.doctor_Service.delete({
        where: {
          id_doctor_service: id_doctor_service,
        },
      });
    } else {
      throw new Error(
        'Incorrect parameters, it was not possible to unlink the service to the doctor.',
      );
    }
  }
}
