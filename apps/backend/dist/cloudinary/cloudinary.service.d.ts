import { ConfigService } from '@nestjs/config';
import { UploadApiResponse } from 'cloudinary';
import 'multer';
export declare class CloudinaryService {
    private configService;
    constructor(configService: ConfigService);
    uploadImage(file: Express.Multer.File): Promise<UploadApiResponse>;
    uploadImages(files: Express.Multer.File[]): Promise<string[]>;
}
