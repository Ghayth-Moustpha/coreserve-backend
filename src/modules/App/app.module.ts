import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../../auth/auth.module';
import { ServicesModule } from '../services/services.module';
import { FileModule } from '../file/file.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, ServicesModule , ServicesModule, FileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
