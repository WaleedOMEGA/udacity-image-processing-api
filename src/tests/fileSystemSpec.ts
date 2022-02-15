import { promises as fs } from 'fs';
import path from 'path';
import fileSystem from './../fileSystem';

describe('Test image processing via sharp', (): void => {
  it('raises an error (invalid width value)', async (): Promise<void> => {
    const error: null | string = await fileSystem.createThumb({
      fileName: 'foo',
      width: '-100',
      height: '500',
    });
    expect(error).not.toBeNull();
  });

  it('raises an error (filename does not exist)', async (): Promise<void> => {
    const error: null | string = await fileSystem.createThumb({
      fileName: 'foo',
      width: '100',
      height: '500',
    });
    expect(error).not.toBeNull();
  });

  // Note: Could also fail because of directory permissions
  it('succeeds to write resized thumb file (existing file, valid size values)', async (): Promise<void> => {
    await fileSystem.createThumb({
      fileName: 'fjord',
      width: '99',
      height: '99',
    });

    const resizedImagePath: string = path.resolve(
      fileSystem.thumbPath,
      `fjord-99x99.jpg`,
    );
    let errorFile: null | string = '';

    try {
      await fs.access(resizedImagePath);
      errorFile = null;
    } catch {
      errorFile = 'File was not created';
    }

    expect(errorFile).toBeNull();
  });
});

// Erase test file. Test should not run on productive system to avoid cache loss
afterAll(async (): Promise<void> => {
  const convertedImagePath: string = path.resolve(
    fileSystem.thumbPath,
    'fjord-99x99.jpg',
  );

  try {
    await fs.access(convertedImagePath);
    fs.unlink(convertedImagePath);
  } catch {
    // intentionally left blank
  }
});
