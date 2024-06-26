import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { handlers } from 'DMH/test/handlers';

const server = setupServer(...handlers);
export { server, rest };
