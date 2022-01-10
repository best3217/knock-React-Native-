import { Request } from "express";
import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import { AWS_CONFIG, AWS_S3_BUCKET } from "../config/constants";
import { Storage } from "@google-cloud/storage";

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = AWS_CONFIG;

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
  apiVersion: "2006-03-01"
});

export const allowableFileTypes = [
  "image/jpeg",
  "image/png",
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const fileFilter = (_: Request, file: any, cb: Function) => {
  // if (!allowableFileTypes.includes(file.mimetype)) {
  //   return cb(null, false);
  // }
  cb(null, true);
};

const storage = multerS3({
  s3,
  bucket: AWS_S3_BUCKET,
  metadata: (_, file, cb) => {
    cb(null, { fieldName: file.fieldname });
  },
  contentType: (_, file, cb) => {
    cb(null, file.mimetype);
  },
  key: (_, file, cb) => {
    cb(null, `${Date.now().toString(36)}${path.extname(file.originalname)}`);
  }
});

export const fileUploader = multer({
  fileFilter,
  storage
});

export const singleFileUploader = (fieldName: string) =>
  fileUploader.single(fieldName);

export const cloudStorage = new Storage({
  keyFilename: "./src/config/cloud.json"
});

export const generatePresignedUrl = async (
  filename: string,
  contentType = "image/jpeg"
) => {
  return await cloudStorage
    .bucket("doortoken_bucket")
    .file(filename)
    .getSignedUrl({
      version: "v2",
      action: "write",
      expires: Date.now() + 1000 * 60 * 60,
      contentType
    });
};

export const generateSignedUrl = async ( filename: string) => {
  return await cloudStorage
    .bucket("doortoken_bucket")
    .file(filename)
    .getSignedUrl({
      version: "v4",
      action: "read",
      expires: Date.now() + 1000 * 60 * 60,
    });
}
