import swaggerAutogen from 'swagger-autogen';
import appConfig from '../config/environment';

const doc = {
  info: {
    version: 'v1.0.0',
    title: 'MConsult API Overview',
    description:
      'This document contains the API description, which provides the information for the mobile and web interface.',
  },
  servers: [
    {
      url: `http://localhost:${appConfig.htmlPort}`,
      description: '',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

const outputFile = './shared/swagger_output.json';
const endpointsFiles = ['../interfaces/routers/routers.ts'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
