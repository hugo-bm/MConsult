import { IEmployeeRepository } from "../../domain/repositories/IEmployeeRepository";
import { CelPhone } from "../../domain/shared/CelPhone";
import { Email } from "../../domain/shared/Email";
import { PrismaSingleton } from "../database/PrismaSingleton";
import {Employee} from "../../domain/enitites/Employee";
import { PrismaClient } from "@prisma/client";

export default class PrismaEmployeeRepository implements IEmployeeRepository {
    private prisma: PrismaClient;
  
    constructor() {
      this.prisma = PrismaSingleton.prismaInstance;
    }

    async findAll(): Promise<Employee[] | null> {
        const resp= await this.prisma.employee.findMany();
        return resp? resp.map((emp)=>new Employee(
            emp.id_employee,
            emp.name,
            emp.user_name,
            Email.create(emp.email),
            CelPhone.create(emp.celPhone),
            emp.password,
            emp.role,
            emp.createAt,
            emp.upadteAt,
          )) : null;
    }

    public async findById(id: string): Promise<Employee | null> {
      const employeeData = await this.prisma.employee.findUnique({
        where: { id_employee: id },
      });
      return employeeData
        ? new Employee(
            employeeData.id_employee,
            employeeData.name,
            employeeData.user_name,
            Email.create(employeeData.email),
            CelPhone.create(employeeData.celPhone),
            employeeData.password,
            employeeData.role,
            employeeData.createAt,
            employeeData.upadteAt,
          )
        : null;
    }
    public async create(employee: Employee): Promise<void> {
      await this.prisma.employee.create({data: {
          name: employee.name,
          role: employee.role,
          user_name: employee.userName,
          email: employee.email.getValue(),
          celPhone: employee.celPhone.getValue(),
          password: employee.password,
      }})
    }
    public async update(employee: Employee): Promise<void> {
      await this.prisma.employee.update({data: {
        name: employee.name,
        user_name: employee.userName,
        email: employee.email.getValue(),
        celPhone: employee.celPhone.getValue(),
        password: employee.password,
    }, where: {
      id_employee: employee.id_employee
    }})
    }
    public async delete(id: string): Promise<void> {
     await this.prisma.employee.delete({where: {
      id_employee: id
     }})
    }
  }
  