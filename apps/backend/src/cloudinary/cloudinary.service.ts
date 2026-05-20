import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import 'multer';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {

constructor(private configService : ConfigService) {
    cloudinary.config({
        cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
        api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
        api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
}

  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploader = cloudinary.uploader.upload_stream(
        { folder: 'rent-a-local' },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve(result);
        }
      );
      Readable.from(file.buffer).pipe(uploader);
    });
  }
  async uploadImages(files: Express.Multer.File[]): Promise<string[]> {
    const uploader = await Promise.all(files.map((f) => this.uploadImage(f)));
    return uploader.map((result) => result.secure_url);
  }
}
