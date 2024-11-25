import {
    Controller,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    Get,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { FilesService } from './file.service';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { CreateFileDto } from './dto/create-file.dto';
  import { UpdateFileTempStatusDto } from './dto/update-file.dto';
  
  @Controller('files')
  export class FilesController {
    constructor(private readonly filesService: FilesService) {}
  
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
      const fileUrl = `/uploads/${file.filename}`;
  
      const newFile: CreateFileDto = {
        title: file.originalname,
        description: '',
        url: fileUrl,
        public: true,
        temp: true,
      };
  
      return this.filesService.createFile(newFile);
    }
  
    @Get(':id')
    async getFile(@Param('id') id: string) {
      return this.filesService.getFileById(id);
    }
  
    @Patch(':id/temp')
    async updateTempStatus(
      @Param('id') id: string,
      @Body() updateFileDto: UpdateFileTempStatusDto,
    ) {
      return this.filesService.updateFileTempStatus(id, updateFileDto);
    }
  
    @Delete(':id')
    async deleteFile(@Param('id') id: string) {
      return this.filesService.deleteFile(id);
    }
  }
  