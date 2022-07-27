import puppeteer, { PDFOptions } from 'puppeteer';
import fs from 'fs';

const dotenv = require('dotenv-override');
dotenv.config({ override: true });

const AWS = require('aws-sdk');

export type Image = {
  url: string;
  key: string;
};

const s3 = new AWS.S3({
  region: process.env.S3_REGION,
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  signatureVersion: process.env.S3_SIGNATURE_VERSION,
});

export const convertToPDF = async (url: string) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);
  const pdfConfig = {
    path: `invoice-${new Date().getTime()}.pdf`,
    format: 'A4',
    printBackground: true,
  } as PDFOptions;
  await page.emulateMediaType('screen');
  const pdf = await page.pdf(pdfConfig);

  await browser.close();
  fs.unlink(pdfConfig.path!, err => {
    if (err) throw err;
  });

  return pdf;
};

export const uploadPDF = async (url: string) => {
  const pdf = await convertToPDF(url);
  const type = 'application/pdf';

  const key =
    Math.round(new Date().getTime() / 1000).toString() +
    '-' +
    Math.floor(Math.random() * 100000).toString() +
    '.' +
    type.split('/')[1];

  const data = {
    Key: key,
    Body: pdf,
    ContentEncoding: 'base64',
    ContentType: `${type}`,
    Bucket: process.env.S3_BUCKET_NAME,
  };

  try {
    const { Location, key } = await s3.upload(data).promise();
    const result: Image = {
      url: Location,
      key,
    };
    return result;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

export const uploadImage = async (image: string): Promise<Image> => {
  const buf = Buffer.from(
    image.replace(/^data:image\/\w+;base64,/, ''),
    'base64',
  );

  const type = image.split(';')[0].split(':')[1];

  const key =
    Math.round(new Date().getTime() / 1000).toString() +
    '-' +
    Math.floor(Math.random() * 100000).toString() +
    '.' +
    type.split('/')[1];

  const data = {
    Key: key,
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: `${type}`,
    Bucket: process.env.S3_BUCKET_NAME,
  };

  try {
    const { Location, key } = await s3.upload(data).promise();
    const result: Image = {
      url: Location,
      key,
    };
    return result;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

export const deleteImage = async (key: string) => {
  const data = {
    Key: key,
    Bucket: process.env.S3_BUCKET_NAME,
  };
  try {
    return await s3.deleteObject(data).promise();
  } catch (error) {
    console.log(error);
    return error;
  }
};
