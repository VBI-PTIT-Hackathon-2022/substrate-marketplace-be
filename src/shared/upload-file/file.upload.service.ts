import { Injectable, Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { fileUpload } from './file.interface';

@Injectable()
export class FileUploadService {

  async uploadS3(file: Express.Multer.File, bucket, name) {
    const s3 = this.getS3();
    const base64data = await file.buffer;
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: base64data,
    };

    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data: fileUpload) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data.Location);
      });
    });
  }

  async deleteS3(bucket, name: string) {
    const s3 = this.getS3();
    const params = {
      Bucket: bucket,
      Key: String(name),
    };
    return new Promise((resolve, reject) => {
      s3.deleteObject(params, (err, data: fileUpload) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data.Location);
      });
    });
  };

  getS3() {
    return new S3({
      accessKeyId: process.env.ACCESSKEYID,
      secretAccessKey: process.env.SECRETACCESSKEY,
    });
  };
}
