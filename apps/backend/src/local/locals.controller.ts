import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { LocalsService } from './locals.service';
import { CreateLocalDto } from 'src/dtos/create-local.dto';
import { UpdateLocalDto } from 'src/dtos/update-local.dto';

@Controller('locals')
export class LocalsController {
    constructor(private readonly localsService: LocalsService) {}

    @Post()
    create(@Body() createLocalDto: CreateLocalDto) {
        return this.localsService.create(createLocalDto);
    }

    @Get()
    findAll() {
        return this.localsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.localsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateLocalDto: UpdateLocalDto) {
        return this.localsService.update(+id, updateLocalDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.localsService.remove(+id);
    }
}