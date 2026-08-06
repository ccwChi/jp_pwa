import { ImageResponse } from 'next/og';
import { IconMark } from '@/lib/icon-mark';

const size = { width: 192, height: 192 };

export async function GET() {
  return new ImageResponse(<IconMark size={size.width} />, size);
}
