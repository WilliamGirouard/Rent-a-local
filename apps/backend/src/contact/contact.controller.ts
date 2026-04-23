import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ContactDto } from './dtos/contact.dto';

@Controller('contact')
export class ContactController {
    constructor(private contactService : ContactService) {}


    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post()
    async sendEmailToUs(@Body() body: ContactDto) {
        return await this.contactService.sendEmailToUs(body);
    }
}
