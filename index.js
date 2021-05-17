import { listen } from './server.js';

listen(process.argv[2] || 8080);
