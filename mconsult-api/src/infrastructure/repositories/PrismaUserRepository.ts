import { PrismaClient } from '@prisma/client';
import { User } from '../../domain/enitites/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { PrismaSingleton } from '../database/PrismaSingleton';
import { Email } from '../../domain/shared/Email';
import { CelPhone } from '../../domain/shared/CelPhone';

export default class PrismaUserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = PrismaSingleton.prismaInstance;
  }
  public async findById(id: string): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { id_user: id },
    });
    return userData
      ? new User(
          userData.id_user,
          userData.name,
          Email.create(userData.email),
          CelPhone.create(userData.celPhone),
          userData.birth_date,
          userData.password,
          userData.createAt,
          userData.upadteAt,
        )
      : null;
  }

  public async findByEmail(email: Email): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { email: email.getValue() },
    });
    return userData
      ? new User(
          userData.id_user,
          userData.name,
          Email.create(userData.email),
          CelPhone.create(userData.celPhone),
          userData.birth_date,
          userData.password,
          userData.createAt,
          userData.upadteAt,
        )
      : null;
  }
  public async create(user: User): Promise<void> {
    await this.prisma.user.create({data: {
        name: user.name,
        birth_date: user.birth_date,
        email: user.email.getValue(),
        celPhone: user.celPhone.getValue(),
        password: user.password,
    }})
  }
  public async update(user: User): Promise<void> {
    await this.prisma.user.update({data: {
      name: user.name,
      birth_date: user.birth_date,
      email: user.email.getValue(),
      celPhone: user.celPhone.getValue(),
      password: user.password,
  }, where: {
    id_user: user.id_user
  }})
  }
  public async delete(id: string): Promise<void> {
   await this.prisma.user.delete({where: {
    id_user: id
   }});
  }
}
