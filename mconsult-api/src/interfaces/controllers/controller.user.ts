import { Request, Response } from 'express';
import * as uuid from 'uuid';
import { HttpStatusCode, HttpStatusMessages } from '../shared/statusCode.html';
import PrismaUserRepository from '../../infrastructure/repositories/PrismaUserRepository';
import { CreateUserRequestBody, LoginUserRequestBody, UpdateUserRequestBody } from '../shared/requestTypes';
import { User } from '../../domain/enitites/User';
import { Email } from '../../domain/shared/Email';
import { CelPhone } from '../../domain/shared/CelPhone';
import { RegisterUser } from '../../application/usecases/RegisterUser';
import { HashServiceBcrypt } from '../../infrastructure/services/BcryptHashService';
import { LoginUser } from '../../application/usecases/LoginUser';
import { AuthService } from '../../infrastructure/services/AuthServices';


// export function listAll(_req: Request, res: Response) {
//   res.status(200).send('Test 1');
// }

export async function findOne(req: Request, res: Response) {
  const id: string = String(req.userId);
  const userRepository = new PrismaUserRepository();
  if (uuid.validate(id)) {
    try {
      const resp = await userRepository.findById(id);
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
        on: 'User - FindOne',
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

export async function createUser(req: Request, res: Response) {
  const body: CreateUserRequestBody = req.body;


  const registerUser = new RegisterUser(new PrismaUserRepository(), HashServiceBcrypt.instance);
  if (body) {
    try {
      const user = new User(
        undefined,
        body.name,
        Email.create(body.email),
        CelPhone.create(body.phone),
        new Date(body.birth_date),
        body.password,
      );
      await registerUser.execute(user)
      res.status(HttpStatusCode.Created).json({
        status: HttpStatusCode.Created,
        message: HttpStatusMessages[HttpStatusCode.Created],
        response_date: new Date().toLocaleString(),
      });
    } catch (error) {
      console.error({
        message: error,
        date: new Date().toLocaleString(),
        on: 'User - Create',
      });
      if ((error as any).code == "P2002")
        {
          res.status(HttpStatusCode.Conflict).json({
            status: HttpStatusCode.Conflict,
            message: HttpStatusMessages[HttpStatusCode.Conflict],
            soft_message: "User is already registered!",
            response_date: new Date().toLocaleString(),
          });
        }
        else {
          res.status(HttpStatusCode.InternalServerError).json({
            status: HttpStatusCode.InternalServerError,
            message: HttpStatusMessages[HttpStatusCode.InternalServerError],
            response_date: new Date().toLocaleString(),
          });
        }
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

export async function updateUser(req: Request, res: Response) {
  const body: UpdateUserRequestBody = req.body;
  const id: string = String(req.userId);

  const userRepository = new PrismaUserRepository()
  if (uuid.validate(id)) {
    try {
      const user = await userRepository.findById(id);
      if (user) {

        user.name = body.name;
        user.celPhone = CelPhone.create(body.phone);
        user.email = Email.create(body.email);          
        user.birth_date = new Date(body.birth_date);

        await userRepository.update(user);
        res.status(HttpStatusCode.Created).json({
          status: HttpStatusCode.Created,
          message: HttpStatusMessages[HttpStatusCode.Created],
          response_date: new Date().toLocaleString(),
        });
      }
      else {
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
        on: 'User - Update',
      });
      if ((error as any).code == "P2002")
        {
          res.status(HttpStatusCode.Conflict).json({
            status: HttpStatusCode.Conflict,
            message: HttpStatusMessages[HttpStatusCode.Conflict],
            soft_message: "User is already registered!",
            response_date: new Date().toLocaleString(),
          });
        }
        else {
          res.status(HttpStatusCode.InternalServerError).json({
            status: HttpStatusCode.InternalServerError,
            message: HttpStatusMessages[HttpStatusCode.InternalServerError],
            response_date: new Date().toLocaleString(),
          });
        }
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

export async function deleteUser(req: Request, res: Response) {
  const id: string = String(req.userId);
  const userRepository = new PrismaUserRepository();
  if (uuid.validate(id)) {
    try {
      const resp = await userRepository.findById(id);
      if (resp) {
         await userRepository.delete(id)
        res.status(HttpStatusCode.OK).json({
          status: HttpStatusCode.OK,
          message: "User deleted successfully!",
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
        on: 'User - Delete',
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

export async function login(req: Request, res: Response) {
  const {email, password}: LoginUserRequestBody = req.body;
  const userRepository = new PrismaUserRepository();
  const authService = new AuthService();
  const loginUser = new LoginUser(userRepository, HashServiceBcrypt.instance, authService);
  if (email && password) {
    try{
      const token = await loginUser.execute(email, password);
      if (token) {
        res.status(HttpStatusCode.OK).json({
          status: HttpStatusCode.OK,
          message: HttpStatusMessages[HttpStatusCode.OK],
          response_date: new Date().toLocaleString(),
          data: {token: token},
        });
      } else {
        res.status(HttpStatusCode.InternalServerError).json({
          status: HttpStatusCode.InternalServerError,
          message: HttpStatusMessages[HttpStatusCode.InternalServerError],
          response_date: new Date().toLocaleString(),
        });
      }
    } catch (error) {
      console.error({
        message: error,
        date: new Date().toLocaleString(),
        on: 'User - Login',
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