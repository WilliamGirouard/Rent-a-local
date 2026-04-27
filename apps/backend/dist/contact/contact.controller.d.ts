import { ContactService } from './contact.service';
import { ContactDto } from './dtos/contact.dto';
export declare class ContactController {
    private contactService;
    constructor(contactService: ContactService);
    sendEmailToUs(body: ContactDto): Promise<{
        message: string;
    }>;
}
