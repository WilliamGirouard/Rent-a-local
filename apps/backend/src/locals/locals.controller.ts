import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { LocalsService } from './locals.service';
import { CreateLocalDto } from 'src/dtos/create-local.dto';
import { UpdateLocalDto } from 'src/dtos/update-local.dto';
import { LocalDto } from 'src/dtos/local.dto';

@Controller('locals')
export class LocalsController {
    constructor(private localsService: LocalsService) {}

    @Serialize(LocalDto)
    @Get()
    async findAll() {
        return await this.localsService.findAll();
    }

    @Serialize(LocalDto)
    @Get('/:id')
    async findOne(@Param('id') id: number) {
        return await this.localsService.findOne(id);
    }

    @Serialize(LocalDto)
    @Post()
    async create(@Body() body: CreateLocalDto) {
        return await this.localsService.create(body);
    }

    @Delete('/:id')
    async remove(@Param('id') id: number) {
        return await this.localsService.remove(id);
    }

    @Serialize(UpdateLocalDto)
    @Patch('/:id')
    async update(@Param('id') id: number, @Body() body: UpdateLocalDto) {
        return await this.localsService.update(id, body);
    }
}