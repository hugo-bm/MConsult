import { Service } from '../../domain/enitites/Service';
import PrismaServiceRepository from '../../infrastructure/repositories/PrismaSeviceRepository';
import {
  CreateServiceRequestBody,
  UpdateServiceRequestBody,
} from '../shared/requestTypes';
import { HttpStatusCode, HttpStatusMessages } from '../shared/statusCode.html';
import { Request, Response } from 'express';

export async function listAll(_req: Request, res: Response) {
  const serviceRepository = new PrismaServiceRepository();
  try {
    const resp = await serviceRepository.findAll();
    if (resp) {
      const data = resp.map((ser) => ser.toJSON());
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
      on: 'Service - FindAll',
    });
    res.status(HttpStatusCode.InternalServerError).json({
      status: HttpStatusCode.InternalServerError,
      message: HttpStatusMessages[HttpStatusCode.InternalServerError],
      response_date: new Date().toLocaleString(),
    });
  }
}

export async function findOne(req: Request, res: Response) {
  const id: string = req.params.id;
  const serviceRepository = new PrismaServiceRepository();
  if (parseInt(id) > 0) {
    try {
      const resp = await serviceRepository.findOne(parseInt(id));
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
        on: 'Service - FindOne',
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

export async function createService(req: Request, res: Response) {
  const body: CreateServiceRequestBody = req.body;
  const serviceRepository = new PrismaServiceRepository();
  if (body) {
    try {
      const service = new Service(undefined, body.service, body.description);
      await serviceRepository.create(service);
      res.status(HttpStatusCode.Created).json({
        status: HttpStatusCode.Created,
        message: HttpStatusMessages[HttpStatusCode.Created],
        response_date: new Date().toLocaleString(),
      });
    } catch (error) {
      console.error({
        message: error,
        date: new Date().toLocaleString(),
        on: 'Service - Create',
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

export async function updateService(req: Request, res: Response) {
  const body: UpdateServiceRequestBody = req.body;
  const serviceRepository = new PrismaServiceRepository();
  if (body) {
    try {
      const service = new Service(body.id, body.service, body.description);
      await serviceRepository.update(service);
      res.status(HttpStatusCode.OK).json({
        status: HttpStatusCode.OK,
        message: HttpStatusMessages[HttpStatusCode.OK],
        response_date: new Date().toLocaleString(),
      });
    } catch (error) {
      console.error({
        message: error,
        date: new Date().toLocaleString(),
        on: 'Service - Update',
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

export async function deleteService(req: Request, res: Response) {
  const id: string = req.body.id;
  const serviceRepository = new PrismaServiceRepository();
  if (parseInt(id) > 0) {
    try {
      await serviceRepository.delete(parseInt(id));
      res.status(HttpStatusCode.OK).json({
        status: HttpStatusCode.OK,
        message: HttpStatusMessages[HttpStatusCode.OK],
        response_date: new Date().toLocaleString(),
      });
    } catch (error) {
      console.error({
        message: error,
        date: new Date().toLocaleString(),
        on: 'Service - Delete',
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
