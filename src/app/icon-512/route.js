import { ImageResponse } from 'next/og';
import { IconMark } from '@/app/IconMark';

const size = { width: 512, height: 512 };

export async function GET() {
  return new ImageResponse(<IconMark size={size.width} />, size);
}
