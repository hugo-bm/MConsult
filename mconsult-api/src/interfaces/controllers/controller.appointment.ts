import { Request, Response } from 'express';
import * as uuid from 'uuid';
import { HttpStatusCode, HttpStatusMessages } from '../shared/statusCode.html';
import { GetMonthlyAvailability } from '../../application/usecases/GetMonthlyAvailability';
import { PrismaAppointmentRepository } from '../../infrastructure/repositories/PrismaAppointmentRepository';
import {
  CreateAppointmentBody,
  UpdateAppointmentRequestBody,
} from '../shared/requestTypes';
import { Appointment } from '../../domain/enitites/Appointment';
import {dateHourToDate, isValidDate} from "../../domain/shared/dateTools"

const serviceDuration = 30;

export async function getAvailability(req: Request, res: Response) {
  let { month, year } = req.query;
  const { doctorId } = req.body;
  const appointmentRepository = new PrismaAppointmentRepository();
  const getMonthlyAvailability = new GetMonthlyAvailability(
    appointmentRepository,
  );
  if (uuid.validate(doctorId) && parseInt(month as string) && parseInt(year as string)) {
    try {
      const availability = await getMonthlyAvailability.execute(
        doctorId as string,
        serviceDuration,
        parseInt(month as string),
        parseInt(year as string),
      );
      if (availability) {
        res.status(HttpStatusCode.OK).json({
          status: HttpStatusCode.OK,
          message: HttpStatusMessages[HttpStatusCode.OK],
          response_date: new Date().toLocaleString(),
          date: availability,
        });
      }
    } catch (error) {
      console.error({
        message: error,
        date: new Date().toLocaleString(),
        on: 'Appointment - Monthly Availability',
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

export async function findAllByUser(req: Request, res: Response) {
  const id_user = req.body.id;
  const appointmentRepository = new PrismaAppointmentRepository();

  if (uuid.validate(id_user)) {
    try {
      const resp = await appointmentRepository.findAllbyUser(id_user);
      if (resp) {
        const data = resp.map((aptt) => aptt.toJSON());
        res.status(HttpStatusCode.OK).json({
          status: HttpStatusCode.OK,
          message: HttpStatusMessages[HttpStatusCode.OK],
          response_date: new Date().toLocaleString(),
          date: data,
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
        on: 'Appointment - Find all by User',
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

export async function findAllByDoctor(req: Request, res: Response) {
  let { id_doctor, startDate, endDate } = req.body;
  const appointmentRepository = new PrismaAppointmentRepository();

  if (
    uuid.validate(id_doctor) &&
    isValidDate(startDate) &&
    isValidDate(endDate)
  ) {
    try {
      startDate = dateHourToDate(startDate, '00:00');
      endDate = dateHourToDate(endDate, '00:00');
      if (startDate && endDate) {
        const resp = await appointmentRepository.findAllbyDoctor(
          id_doctor,
          startDate,
          endDate,
        );
        if (resp) {
          const data = resp.map((aptt) => aptt.toJSON());
          res.status(HttpStatusCode.OK).json({
            status: HttpStatusCode.OK,
            message: HttpStatusMessages[HttpStatusCode.OK],
            response_date: new Date().toLocaleString(),
            date: data,
          });
        } else {
          res.status(HttpStatusCode.NotFound).json({
            status: HttpStatusCode.NotFound,
            message: HttpStatusMessages[HttpStatusCode.NotFound],
            response_date: new Date().toLocaleString(),
          });
        }
      } else {
        throw new Error('Error converting date');
      }
    } catch (error) {
      console.error({
        message: error,
        date: new Date().toLocaleString(),
        on: 'Appointment - Find all by Doctor',
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

export async function findAll(req: Request, res: Response) {
  let { startDate, endDate } = req.body;
  const appointmentRepository = new PrismaAppointmentRepository();

  if (
    isValidDate(startDate) &&
    isValidDate(endDate)
  ) {
    try {
      startDate = dateHourToDate(startDate, '00:00');
      endDate = dateHourToDate(endDate, '00:00');
      if (startDate && endDate) {
        const resp = await appointmentRepository.findAllbyDate(
          startDate,
          endDate,
        );
        if (resp) {
          const data = resp.map((aptt) => aptt.toJSON());
          res.status(HttpStatusCode.OK).json({
            status: HttpStatusCode.OK,
            message: HttpStatusMessages[HttpStatusCode.OK],
            response_date: new Date().toLocaleString(),
            date: data,
          });
        } else {
          res.status(HttpStatusCode.NotFound).json({
            status: HttpStatusCode.NotFound,
            message: HttpStatusMessages[HttpStatusCode.NotFound],
            response_date: new Date().toLocaleString(),
          });
        }
      } else {
        throw new Error('Error converting date');
      }
    } catch (error) {
      console.error({
        message: error,
        date: new Date().toLocaleString(),
        on: 'Appointment - Find all by Doctor',
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

export async function createAppointment(req: Request, res: Response) {
  let { id_doctor, id_service, id_user, date, time }: CreateAppointmentBody =
    req.body;
  const appointmentRepository = new PrismaAppointmentRepository();
  const fomatedDate = dateHourToDate(date, time);
  if (
    parseInt(id_service) > 0 &&
    uuid.validate(id_doctor) &&
    uuid.validate(id_user) &&
    fomatedDate !== null
  ) {
    try {
      await appointmentRepository.create(
        new Appointment(
          undefined,
          id_doctor,
          parseInt(id_service),
          id_user,
          fomatedDate,
        ),
      );
      res.status(HttpStatusCode.OK).json({
        status: HttpStatusCode.OK,
        message: HttpStatusMessages[HttpStatusCode.OK],
        response_date: new Date().toLocaleString(),
      });
    } catch (error) {
      console.error({
        message: error,
        date: new Date().toLocaleString(),
        on: 'Appointment - Create',
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

export async function updateAppointment(req: Request, res: Response) {
  let { id, date, time }: UpdateAppointmentRequestBody = req.body;
  const appointmentRepository = new PrismaAppointmentRepository();
  const fomatedDate = dateHourToDate(date, time);
  if (parseInt(id) > 0 && fomatedDate !== null) {
    try {
      const updatedAppointment = await appointmentRepository.findById(
        parseInt(id),
      );
      if (updatedAppointment) {
        updatedAppointment.booking_date = fomatedDate;
        await appointmentRepository.update(updatedAppointment);
        res.status(HttpStatusCode.OK).json({
          status: HttpStatusCode.OK,
          message: HttpStatusMessages[HttpStatusCode.OK],
          response_date: new Date().toLocaleString(),
          date: updatedAppointment.toJSON(),
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
        on: 'Appointment - Update',
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

export async function deleteAppointmentt(req: Request, res: Response) {
  const id: string = req.body.id;
  const appointmentRepository = new PrismaAppointmentRepository();
  if (parseInt(id) > 0) {
    try {
      await appointmentRepository.delete(parseInt(id));
      res.status(HttpStatusCode.OK).json({
        status: HttpStatusCode.OK,
        message: HttpStatusMessages[HttpStatusCode.OK],
        response_date: new Date().toLocaleString(),
      });
    } catch (error) {
      console.error({
        message: error,
        date: new Date().toLocaleString(),
        on: 'Appointment - Delete',
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
