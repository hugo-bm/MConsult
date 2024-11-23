import { PrismaClient } from '@prisma/client';
import { Service } from '../../domain/enitites/Service';
import { IServiceRepository } from '../../domain/repositories/IServiceRepository';
import { PrismaSingleton } from '../database/PrismaSingleton';

export default class PrismaServiceRepository implements IServiceRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = PrismaSingleton.prismaInstance;
  }
  async findOne(id: number): Promise<Service | null> {
    const resp = await this.prisma.service.findFirst({
      where: { id_service: id },
    });
    return resp ? new Service(resp.id_service, resp.service, resp.desc) : null;
  }

  async findAll(): Promise<Service[] | null> {
    const resp = await this.prisma.service.findMany();
    return resp
      ? resp.map((ser) => new Service(ser.id_service, ser.service, ser.desc))
      : null;
  }
  async create(service: Service): Promise<void> {
    await this.prisma.service.create({
      data: {
        service: service.service,
        desc: service.desc,
      },
    });
  }
  async update(service: Service): Promise<void> {
    try {
      await this.prisma.service.update({
        data: {
          service: service.service,
          desc: service.desc,
        },
        where: { id_service: service.id_service },
      });
    } catch (error) {
      throw new Error(`Error on update service data: ${error}`);
    }
  }
  async delete(id: number): Promise<void> {
    // Check if there are doctors who provide this service before deleting
    const checkForDoctors = await this.prisma.doctor_Service.findMany({
      select: { doctor: true },
      where: { id_service: id },
    });

    if (checkForDoctors.length > 0) {
      const err = new Error();
      const doctors = checkForDoctors.map((item) => item.doctor.name);
      let message = `It was not possible to remove the service resource, as it is in use by doctors: |`;
      message = message + doctors.join(';&');
      err.message = message;
      err.name = 'Conflict when removing service';
      throw err;
    }
    // In case there are no doctors using the service, it can be removed directly
    else {
      await this.prisma.service.delete({ where: { id_service: id } });
    }
  }
}
