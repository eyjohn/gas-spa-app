import { Server } from './server';

const server = new Server();

// Expose app to global scope for entrypoints.js
declare global { var server: Server; }
globalThis.server = server;
