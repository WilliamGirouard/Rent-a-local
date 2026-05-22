import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ChangeRequestsService } from './change-requests.service';
import { CreateChangeRequestDto } from './dtos/create-change-request.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('change-requests')
export class ChangeRequestsController {
    constructor(private changeRequestsService: ChangeRequestsService) {}

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() body: CreateChangeRequestDto) {
        return await this.changeRequestsService.create(body);
    }

    @UseGuards(AuthGuard, AdminGuard)
    @Get()
    async findAll() {
        return await this.changeRequestsService.findAll();
    }

    @UseGuards(AuthGuard, AdminGuard)
    @Patch('/:id/approve')
    async approve(@Param('id') id: number) {
        return await this.changeRequestsService.approve(id);
    }

    @UseGuards(AuthGuard, AdminGuard)
    @Patch('/:id/reject')
    async reject(@Param('id') id: number) {
        return await this.changeRequestsService.reject(id);
    }
}