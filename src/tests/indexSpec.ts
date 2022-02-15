const request = require('supertest');
import { promises as fs } from 'fs';
import path from 'path';
import fileSystem from './../fileSystem';


describe('Test responses from endpoints', (): void => {
  describe('endpoint: /', (): void => {
    it('gets /', async (): Promise<void> => {
      const res= await request.get('/');

      expect(res.status).toBe(200);
    });
  });

  describe('endpoint: /api/images', (): void => {
    it('gets /api/images?filename=fjord (valid args)', async (): Promise<void> => {
      const res= await request.get(
        '/api/images?filename=fjord',
      );

      expect(res.status).toBe(200);
    });

    it('gets /api/images?filename=fjord&width=199&height=199 (valid args)', async (): Promise<void> => {
      const res= await request.get(
        '/api/images?filename=fjord&width=199&height=199',
      );

      expect(res.status).toBe(200);
    });

    it('gets /api/images?filename=fjord&width=-200&height=200 (invalid args)', async (): Promise<void> => {
      const res= await request.get(
        '/api/images?filename=fjord&width=-200&height=200',
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

  describe('endpoint: /foo', (): void => {
    it('returns 404 for invalid endpoint', async (): Promise<void> => {
      const res= await request.get('/foo');

      expect(res.status).toBe(404);
    });
  });
});

// Erase test file. Test should not run on productive system to avoid cache loss
afterAll(async (): Promise<void> => {
  const convertedImagePath: string = path.resolve(
    fileSystem.thumbPath,
    'fjord-199x199.jpg',
  );

  try {
    await fs.access(convertedImagePath);
    fs.unlink(convertedImagePath);
  } catch {
    // intentionally left blank
  }
});
