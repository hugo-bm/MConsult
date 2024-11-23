import { shutdown, start } from './interfaces/http/server';

// http server startup
const htppServer = start();

// Graceful shutdown
process.on('SIGINT', (signal) => shutdown(htppServer, signal));
process.on('SIGTERM', (signal) => shutdown(htppServer, signal));
