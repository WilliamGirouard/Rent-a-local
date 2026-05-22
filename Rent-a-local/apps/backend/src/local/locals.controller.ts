import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { LocalsService } from './locals.service';
import { CreateLocalDto } from 'src/local/dtos/create-local.dto';
import { UpdateLocalDto } from 'src/local/dtos/update-local.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('locals')
export class LocalsController {
  constructor(private readonly localsService: LocalsService,
    private readonly cloudinaryService : CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images', 5, {
    limits : {fileSize: 5 * 1024 * 1024}
  }))
  async create(@Body() createLocalDto: CreateLocalDto, @UploadedFiles() files : Express.Multer.File[]) {
    const imageURLS = await this.cloudinaryService.uploadImages(files);
    return this.localsService.create(createLocalDto, imageURLS);
  }

  @Get()
  async findAll() {
    return await this.localsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.localsService.findOne(+id);
  }

  @Get(':id/reservations')
  async getReservations(@Param('id') id: string) {
    return await this.localsService.findReservationsForLocal(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLocalDto: UpdateLocalDto) {
    return await this.localsService.update(+id, updateLocalDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.localsService.remove(+id);
  }
}
