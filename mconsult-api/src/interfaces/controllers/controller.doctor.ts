import { Request, Response } from 'express';
import * as uuid from 'uuid';
import { HttpStatusCode, HttpStatusMessages } from '../shared/statusCode.html';
import { CreateDoctorRequestBody, UpdateDoctorRequestBody } from '../shared/requestTypes';
import PrismaDoctorRepository from '../../infrastructure/repositories/PrismaDoctorRpository';
import { Doctor } from '../../domain/enitites/Doctor';
import PrismaServiceRepository from '../../infrastructure/repositories/PrismaSeviceRepository';
import { Service } from '../../domain/enitites/Service';

export async function listAll(_req: Request, res: Response) {
  const doctorRepository = new PrismaDoctorRepository();
  
  try {
    const resp = await doctorRepository.findAll();
    if (resp) {
      const data = resp.map((doc) => {
       
             
        return {
          id: doc.id_doctor,
          name: doc.name,
          password: doc.password,
          specialty: doc.specialty,
          icon: doc.icon,
          createAt: doc.createAt,
          updateAt: doc.updateAt,
        };
      });
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
      on: 'Doctor - FindAll',
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
  const doctorRepository = new PrismaDoctorRepository();
  const serviceRepository = new PrismaServiceRepository();
  if (uuid.validate(id)) {
    try {
      const resp = await doctorRepository.findById(id);

      if (resp) {
        const servicesList = async (list: { id_service: number; id_doctor_service: any; id_doctor: any; price: any; }[])=>{
          const services = [];
          for (let item of list) {

              const service: Service | null =  await serviceRepository.findOne(item.id_service);
              services.push({
                id_doctor_service: item.id_doctor_service,
                id_doctor: item.id_doctor,
                id_service: item.id_service,
                service_name: service?.service,
                description: service?.desc,
                price: item.price
              });
          }
          return services;
        }
        
        const services = resp.Doctor_Service? await servicesList(resp.Doctor_Service): null;
        res.status(HttpStatusCode.OK).json({
          status: HttpStatusCode.OK,
          message: HttpStatusMessages[HttpStatusCode.OK],
          response_date: new Date().toLocaleString(),
          data:  {
            id: resp.id_doctor,
            name: resp.name,
            password: resp.password,
            specialty: resp.specialty,
            icon: resp.icon,
            services: services,
            createAt: resp.createAt,
            updateAt: resp.updateAt,
          },
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
        on: 'Doctor - FindOne',
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

export async function createDoctor(req: Request, res: Response) {
  const body: CreateDoctorRequestBody = req.body;
  const doctorRepository = new PrismaDoctorRepository();
  if (body) {
    try {
      const doctor = new Doctor(
        undefined,
        body.name,
        body.user_name,
        body.specialty,
        body.icon,
        body.password,
        undefined,
      );
      await doctorRepository.create(doctor);
      res.status(HttpStatusCode.Created).json({
        status: HttpStatusCode.Created,
        message: HttpStatusMessages[HttpStatusCode.Created],
        response_date: new Date().toLocaleString(),
      });
    } catch (error) {
      console.error({
        message: error,
        date: new Date().toLocaleString(),
        on: 'Doctor - Create',
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

export async function updateDoctor(req: Request, res: Response) {
  const body: UpdateDoctorRequestBody = req.body;
  const doctorRepository = new PrismaDoctorRepository();
  if (body) {
    try {
      const doctor = new Doctor(
        body.id,
        body.name,
        body.user_name,
        body.specialty,
        body.icon,
        body.password,
        undefined,
      );
      const updatedDoctor = await doctorRepository.update(doctor);
      if (updatedDoctor) {
        const data = {
          id: updatedDoctor.id_doctor,
          name: updatedDoctor.name,
          password: updatedDoctor.password,
          specialty: updatedDoctor.specialty,
          icon: updatedDoctor.icon,
          createAt: updatedDoctor.createAt,
          updateAt: updatedDoctor.updateAt,
        }
        res.status(HttpStatusCode.OK).json({
          status: HttpStatusCode.OK,
          message: HttpStatusMessages[HttpStatusCode.OK],
          response_date: new Date().toLocaleString(),
          data: data
        });
      }
    } catch (error) {
      console.error({
        message: error,
        date: new Date().toLocaleString(),
        on: 'Doctor - Create',
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

export async function deleteDoctor(req: Request, res: Response) {
  const id: string = req.body.id;
  const doctorRepository = new PrismaDoctorRepository();
  if (uuid.validate(id)) {
    try {
      const resp = await doctorRepository.findById(id);
      if (resp) {
        await doctorRepository.delete(id);
        res.status(HttpStatusCode.OK).json({
          status: HttpStatusCode.OK,
          message: 'Doctor deleted successfully!',
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
        on: 'Doctor - Delete',
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
