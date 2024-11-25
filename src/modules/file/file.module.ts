import { Module } from '@nestjs/common';
import { FilesController } from './file.controller';
import { FilesService } from './file.service';
import { PrismaModule } from '../prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [PrismaModule ,  MulterModule.register({
    storage: diskStorage({
      destination: './uploads', // Path to save files
      filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
      },
    }),
  }),], // Import PrismaModule here
  controllers: [FilesController],
  providers: [FilesService]
})
export class FileModule {}
