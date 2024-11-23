import { Request, Response } from 'express';
import * as uuid from 'uuid';
import { HttpStatusCode, HttpStatusMessages } from '../shared/statusCode.html';
import { Email } from '../../domain/shared/Email';
import { CelPhone } from '../../domain/shared/CelPhone';
import PrismaEmployeeRepository from '../../infrastructure/repositories/PrismaEmployeeRepository';
import { Employee } from '../../domain/enitites/Employee';
import {
  CreateEmployeeRequestBody,
  UpdateEmployeeRequestBody,
} from '../shared/requestTypes';
import { isValidRole } from '../../domain/shared/Role';

export async function listAll(_req: Request, res: Response) {
  const employeeRepository = new PrismaEmployeeRepository();
  try {
    const resp = await employeeRepository.findAll();
    if (resp) {
      const data = resp.map((emp) => emp.toJSON());
      res.status(HttpStatusCode.OK).json({
        status: HttpStatusCode.OK,
        message: HttpStatusMessages[HttpStatusCode.OK],
        response_date: new Date().toLocaleString(),
        data: data,
      });
    } else {
      res.status(HttpStatusCode.NotFound).json({
        status: HttpStatusCode.NotFound,
        message: HttpStatusMessages[HttpStatusCode.NotFound],
        response_date: new Date().toLocaleString(),
      });
    }
  } catch (error) {
    console.error({
      message: error,
      date: new Date().toLocaleString(),
      on: 'Employee - FindAll',
    });
    res.status(HttpStatusCode.InternalServerError).json({
      status: HttpStatusCode.InternalServerError,
      message: HttpStatusMessages[HttpStatusCode.InternalServerError],
      response_date: new Date().toLocaleString(),
    });
  }
}

export async function findOne(req: Request, res: Response) {
  const id: string = req.body.id;
  const employeeRepository = new PrismaEmployeeRepository();
  if (uuid.validate(id)) {
    try {
      const resp = await employeeRepository.findById(id);
      if (resp) {
        res.status(HttpStatusCode.OK).json({
          status: HttpStatusCode.OK,
          message: HttpStatusMessages[HttpStatusCode.OK],
          response_date: new Date().toLocaleString(),
          data: resp.toJSON(),
        });
      } else {
        res.status(HttpStatusCode.NotFound).json({
          status: HttpStatusCode.NotFound,
          message: HttpStatusMessages[HttpStatusCode.NotFound],
          response_date: new Date().toLocaleString(),
        });
      }
    } catch (error) {
      console.error({
        message: error,
        date: new Date().toLocaleString(),
        on: 'Employee - FindOne',
      });
      res.status(HttpStatusCode.InternalServerError).json({
        status: HttpStatusCode.InternalServerError,
        message: HttpStatusMessages[HttpStatusCode.InternalServerError],
        response_date: new Date().toLocaleString(),
      });
    }
  } else {
    // Error incorrect data provided
    res.status(HttpStatusCode.BadRequest).json({
      status: HttpStatusCode.BadRequest,
      message: HttpStatusMessages[HttpStatusCode.BadRequest],
      response_date: new Date().toLocaleString(),
    });
  }
}

export async function createEmployee(req: Request, res: Response) {
  const body: CreateEmployeeRequestBody = req.body;
  const userRepository = new PrismaEmployeeRepository();
  if (body) {
    try {
      const employee = new Employee(
        undefined,
        body.name,
        body.user_name,
        Email.create(body.email),
        CelPhone.create(body.phone),
        body.password,
        body.role,
      );
      await userRepository.create(employee);
      res.status(HttpStatusCode.Created).json({
        status: HttpStatusCode.Created,
        message: HttpStatusMessages[HttpStatusCode.Created],
        response_date: new Date().toLocaleString(),
      });
    } catch (error) {
      console.error({
        message: error,
        date: new Date().toLocaleString(),
        on: 'Employee - Create',
      });
      res.status(HttpStatusCode.InternalServerError).json({
        status: HttpStatusCode.InternalServerError,
        message: HttpStatusMessages[HttpStatusCode.InternalServerError],
        response_date: new Date().toLocaleString(),
      });
    }
  } else {
    // Error incorrect data provided
    res.status(HttpStatusCode.BadRequest).json({
      status: HttpStatusCode.BadRequest,
      message: HttpStatusMessages[HttpStatusCode.BadRequest],
      response_date: new Date().toLocaleString(),
    });
  }
}

export async function updateEmployee(req: Request, res: Response) {
  const body: UpdateEmployeeRequestBody = req.body;
  const employeeRepository = new PrismaEmployeeRepository();
  if (body && uuid.validate(body.id) && isValidRole(body.role)) {
    try {
      const employee = await employeeRepository.findById(body.id);
      if (employee) {
        employee.name = body.name;
        employee.userName = body.user_name;
        employee.email = Email.create(body.email);
        employee.celPhone = CelPhone.create(body.phone);
        employee.roleValue = body.role;
        await employeeRepository.update(employee);
        res.status(HttpStatusCode.OK).json({
          status: HttpStatusCode.OK,
          message: HttpStatusMessages[HttpStatusCode.OK],
          response_date: new Date().toLocaleString(),
        });
      } else {
        res.status(HttpStatusCode.NotFound).json({
          status: HttpStatusCode.NotFound,
          message: HttpStatusMessages[HttpStatusCode.NotFound],
          response_date: new Date().toLocaleString(),
        });
      }
    } catch (error) {
      console.error({
        message: error,
        date: new Date().toLocaleString(),
        on: 'Employee - Create',
      });
      res.status(HttpStatusCode.InternalServerError).json({
        status: HttpStatusCode.InternalServerError,
        message: HttpStatusMessages[HttpStatusCode.InternalServerError],
        response_date: new Date().toLocaleString(),
      });
    }
  } else {
    // Error incorrect data provided
    res.status(HttpStatusCode.BadRequest).json({
      status: HttpStatusCode.BadRequest,
      message: HttpStatusMessages[HttpStatusCode.BadRequest],
      response_date: new Date().toLocaleString(),
    });
  }
}

export async function deleteEmployee(req: Request, res: Response) {
  const id: string = req.body.id;
  const employeeRepository = new PrismaEmployeeRepository();
  if (uuid.validate(id)) {
    try {
      const resp = await employeeRepository.findById(id);
      if (resp) {
        await employeeRepository.delete(id);
        res.status(HttpStatusCode.OK).json({
          status: HttpStatusCode.OK,
          message: 'Employee deleted successfully!',
          response_date: new Date().toLocaleString(),
        });
      } else {
        res.status(HttpStatusCode.NotFound).json({
          status: HttpStatusCode.NotFound,
          message: HttpStatusMessages[HttpStatusCode.NotFound],
          response_date: new Date().toLocaleString(),
        });
      }
    } catch (error) {
      console.error({
        message: error,
        date: new Date().toLocaleString(),
        on: 'Employee - Delete',
      });
      res.status(HttpStatusCode.InternalServerError).json({
        status: HttpStatusCode.InternalServerError,
        message: HttpStatusMessages[HttpStatusCode.InternalServerError],
        response_date: new Date().toLocaleString(),
      });
    }
  } else {
    // Error incorrect data provided
    res.status(HttpStatusCode.BadRequest).json({
      status: HttpStatusCode.BadRequest,
      message: HttpStatusMessages[HttpStatusCode.BadRequest],
      response_date: new Date().toLocaleString(),
    });
  }
}
