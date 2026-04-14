import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { LocalsService } from './locals.service';
import { CreateLocalDto } from 'src/dtos/create-local.dto';
import { UpdateLocalDto } from 'src/dtos/update-local.dto';

@Controller('locals')
export class LocalsController {
    constructor(private localsService: LocalsService) {}

    @Get()
    async findAll() {
        return await this.localsService.findAll();
    }

    @Get('/:id')
    async findOne(@Param('id') id: number) {
        return await this.localsService.findOne(id);
    }

    @Post()
    async create(@Body() body: CreateLocalDto) {
        return await this.localsService.create(body);
    }

    @Patch('/:id')
    async update(@Param('id') id: number, @Body() body: UpdateLocalDto) {
        return await this.localsService.update(id, body);
    }

    @Delete('/:id')
    async remove(@Param('id') id: number) {
        return await this.localsService.remove(id);
    }
}