import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileTempStatusDto } from './dto/update-file.dto';

@Injectable()
export class FilesService {
  constructor(private readonly prisma: PrismaService) {}

  async createFile(data: CreateFileDto) {
    return this.prisma.file.create({ data });
  }

  async getFileById(id: string) {
    return this.prisma.file.findUnique({ where: { id } });
  }

  async updateFileTempStatus(id: string, updateFileDto: UpdateFileTempStatusDto) {
    return this.prisma.file.update({
      where: { id },
      data: { temp: updateFileDto.temp },
    });
  }

  async deleteFile(id: string) {
    return this.prisma.file.delete({ where: { id } });
  }
}
