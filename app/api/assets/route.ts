// app/api/assets/route.ts
import { NextResponse } from 'next/server';

const IMAGEKIT_PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY!;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get('folder') || '/';
  const limit = Number(searchParams.get('limit') || '50');
  const skip = Number(searchParams.get('skip') || '0');

  // ImageKit V1 List Files API
  // Using path filter to list files in a specific directory
  const url = `https://api.imagekit.io/v1/files?path=${encodeURIComponent(path)}&limit=${limit}&skip=${skip}`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization:
          'Basic ' + Buffer.from(IMAGEKIT_PRIVATE_KEY + ':').toString('base64'),
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('ImageKit error', res.status, text);
      return NextResponse.json(
        { error: 'Failed to list assets' },
        { status: res.status }
      );
    }

    const data = await res.json();

    // ImageKit returns an array of file objects for the list API
    const items = data.map((item: any) => ({
      id: item.fileId,
      name: item.name,
      url: item.url,
      thumbnailUrl: item.thumbnail || item.url, // ImageKit uses 'thumbnail' field
      type: item.fileType,
      path: item.filePath,
    }));

    return NextResponse.json(items);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
