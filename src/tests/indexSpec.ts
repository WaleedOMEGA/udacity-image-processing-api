import supertest from 'supertest';
import { promises as fs } from 'fs';
import path from 'path';
import app from '../index';
import fileSystem from './../fileSystem';

const request: supertest.SuperTest<supertest.Test> = supertest(app);
describe('test responses from api', (): void => {
  describe('api: /', (): void => {
    it('gets /', async (): Promise<void> => {
      const res= await request.get('/');

      expect(res.status).toBe(200);
    });
  });

  describe('api: /api/images', (): void => {
    it('gets /api/images?filename=icelandwaterfall (valid args)', async (): Promise<void> => {
      const res = await request.get(
        '/api/images?filename=icelandwaterfall',
      );

      expect(res.status).toBe(200);
    });

    it('gets /api/images?filename=icelandwaterfall&width=200&height=200 (valid args)', async (): Promise<void> => {
      const res = await request.get(
        '/api/images?filename=icelandwaterfall&width=200&height=200',
      );

      expect(res.status).toBe(200);
    });

    it('gets /api/images?filename=icelandwaterfall&width=-200&height=200 (invalid args)', async (): Promise<void> => {
      const res = await request.get(
        '/api/images?filename=icelandwaterfall&width=-200&height=200',
      );

      expect(res.status).toBe(200);
    });

    it('gets /api/images (no arguments)', async (): Promise<void> => {
      const res= await request.get(
        '/api/images',
      );

      expect(res.status).toBe(200);
    });
  });

  describe('endpoint: /omega', (): void => {
    it('returns 404 for invalid endpoint', async (): Promise<void> => {
      const res= await request.get('/omega');

      expect(res.status).toBe(404);
    });
  });
});


