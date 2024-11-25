import 'express';

declare global {
  namespace Express {
    interface Multer {
      file: {
        filename: string;
        mimetype: string;
        originalname: string;
        size: number;
        path: string;
      };
    }
  }
}
