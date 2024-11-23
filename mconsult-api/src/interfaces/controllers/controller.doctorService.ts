import { Request, Response } from 'express';
import { HttpStatusCode, HttpStatusMessages } from '../shared/statusCode.html';
import { CreateDoctorServiceRequestBody, UpdateDoctorServiceRequestBody } from '../shared/requestTypes';
import PrismaDoctorServiceRepository from '../../infrastructure/repositories/PrismaDoctorServiceRepository';


export async function linkDoctorToService(req: Request, res: Response) {
   const body: CreateDoctorServiceRequestBody = req.body;
   const doctorServiceRepository = new PrismaDoctorServiceRepository();
   if (body) {
      try {
          const serviceId = parseInt(body.id_service)
         await doctorServiceRepository.addDoctorService(serviceId, body.id_doctor, body.price)
         res.status(HttpStatusCode.Created).json({
            status: HttpStatusCode.Created,
            message: HttpStatusMessages[HttpStatusCode.Created],
            response_date: new Date().toLocaleString(),
         });
      } catch (error) {
         console.error({
            message: error,
            date: new Date().toLocaleString(),
            on: 'DoctorService - Create',
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

export async function updateDoctorService(req: Request, res: Response) {
  const body: UpdateDoctorServiceRequestBody = req.body;
   const doctorServiceRepository = new PrismaDoctorServiceRepository();
   if (body) {
      try {
         await doctorServiceRepository.updatePriceService(body.id,body.price)
         res.status(HttpStatusCode.Created).json({
            status: HttpStatusCode.Created,
            message: HttpStatusMessages[HttpStatusCode.Created],
            response_date: new Date().toLocaleString(),
         });
      } catch (error) {
         console.error({
            message: error,
            date: new Date().toLocaleString(),
            on: 'DoctorService - Update',
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

export async function unlinkDoctorToService(req: Request, res: Response) {
  const id: number = parseInt(req.body.id);
  const doctorServiceRepository = new PrismaDoctorServiceRepository();
  if (id > 0) {
    try {
      const resp = await doctorServiceRepository.findOne(id);
      if (resp) {
         await doctorServiceRepository.removeDoctorService(id)
        res.status(HttpStatusCode.OK).json({
          status: HttpStatusCode.OK,
          message: "Doctor deleted successfully!",
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
        on: 'DoctorService - Delete',
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
