import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ContactDto } from './dtos/contact.dto';
import { currentUser } from 'src/users/decorators/current-user.decorator';

@Controller('contact')
export class ContactController {
    constructor(private contactService : ContactService) {}


    @UseGuards(AuthGuard)
    @Post()
    async sendEmailToUs(@currentUser()user: any, @Body() body: ContactDto) {
        return await this.contactService.sendEmailToUs(body, user.sub);
    }
}
