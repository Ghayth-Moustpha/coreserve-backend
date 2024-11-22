import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma/prisma.service'; // Update the import based on your project structure
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET, // Set your JWT secret in .env
    signOptions: { expiresIn: '5h' }, // Token expiration time
  })],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService], // Export UsersService to use it in other modules
})
export class UsersModule {}
