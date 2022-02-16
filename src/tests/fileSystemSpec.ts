import { promises as fs } from 'fs';
import path from 'path';
import fileSystem from './../fileSystem';

describe('test image converting by sharp', (): void => {
  it('throw error (invalid height value)', async (): Promise<void> => {
    const error: null | string = await fileSystem.createThumb({
      fileName: 'icelandwaterfall',
      width: '200',
      height: '-200',
    });
    expect(error).not.toBeNull();
  });

  it('throw error (filename does not exist)', async (): Promise<void> => {
    const error: null | string = await fileSystem.createThumb({
      fileName: 'omega',
      width: '100',
      height: '500',
    });
    expect(error).not.toBeNull();
  });

  // Note: Could also fail because of directory permissions
  it('succeeds to write resized thumb file (existing file, valid size values)', async (): Promise<void> => {
    await fileSystem.createThumb({
      fileName: 'fjord',
      width: '200',
      height: '200',
    });

    const resizedImagePath: string = path.resolve(
      fileSystem.thumbPath,
      `fjord-200x200.jpg`,
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

