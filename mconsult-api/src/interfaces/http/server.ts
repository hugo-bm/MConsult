import 'dotenv/config';
import cors from 'cors';
import express, { Errback, Request, Response } from 'express';
import router from '../routers/routers';
import appConfig from '../../config/environment';
import { IncomingMessage, Server, ServerResponse } from 'node:http';
import { HttpStatusCode, HttpStatusMessages } from '../shared/statusCode.html';
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "../../services/shared/swagger_output.json";

function start() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
  app.use(router);

  app.use((_: Request, res: Response) => {
    res.status(404).json({ message: 'Page Not Found' });
  });

  app.use((_err: Errback, _req: Request, res: Response) => {
    res
      .status(HttpStatusCode.InternalServerError)
      .json({
        message: HttpStatusMessages[HttpStatusCode.InternalServerError],
      });
  });
  

  return app.listen(appConfig.htmlPort, () => {
    console.log(
      '\x1b[32m%s\x1b[0m',
      `ℹ️ Info => 🚀 Server running on the port: ${appConfig.htmlPort}`,
    );
  });
}

function shutdown(
  server: Server<typeof IncomingMessage, typeof ServerResponse>,
  signal: NodeJS.Signals,
) {
  console.log(
    '\x1b[33m%s\x1b[0m',
    `⚠ Alert => ${signal} received, gracefully shutting down`,
  );
  server.close(() => {
    console.log('⚠ Alert => Closed out remaining connections');
    process.exit(0);
  });

  setTimeout(() => {
    console.error(
      '⚠ Alert => Could not close connections in time, forcefully shutting down',
    );
    process.exit(1);
  }, 30000);
}

export { start, shutdown };
