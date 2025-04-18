// app/api/culfest-images/route.js
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { imageSize } from 'image-size';

export async function GET(req) {
  const url = new URL(req.url);
  const event = url.searchParams.get('event');

  const dir = path.join(process.cwd(), 'public', 'gallery', event);

  const imageFiles = fs.readdirSync(dir).filter(file =>
    /\.(png|jpe?g|webp|gif)$/i.test(file)
  );

  const imageArray = imageFiles.map(file => {
    const filePath = path.join(dir, file);
    const buffer = fs.readFileSync(filePath); // Read as buffer
    const { width, height } = imageSize(buffer); // Pass buffer here
    const aspect_ratio = width && height ? width / height : 16 / 9;

    return {
      src: `/gallery/${event}/${file}`,
      aspect_ratio,
    };
  });

  return NextResponse.json(imageArray);
}
