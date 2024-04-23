import 'whatwg-fetch';
import '@testing-library/jest-dom/extend-expect';
import { server } from './test/server.ts';

// process.env.API_URL = 'https://digitalmoney.ctd.academy';
// process.env.MONGODB_URI =
// 	'mongodb+srv://dmh-grupo2:GtQzxsPJvqQupQKL@clusterdmh.29jakjq.mongodb.net/?retryWrites=true&w=majority';
// process.env.DB_NAME = 'DMH';

beforeAll(() => server.listen());
// if you need to add a handler after calling setupServer for some specific test
// this will remove that handler for the rest of them
// (which is important for test isolation):
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
