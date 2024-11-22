// src/services/services.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';
import { Service } from '@prisma/client';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateServiceDto): Promise<Service> {
    return this.prisma.service.create({ data });
  }

  async findAll(): Promise<Service[]> {
    return this.prisma.service.findMany();
  }

  async findOne(id: number): Promise<Service> {
    return this.prisma.service.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateServiceDto): Promise<Service> {
    return this.prisma.service.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Service> {
    return this.prisma.service.delete({
      where: { id },
    });
  }
}
