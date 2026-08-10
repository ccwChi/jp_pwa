import { ImageResponse } from 'next/og';
import { IconMark } from '@/app/IconMark';

const size = { width: 192, height: 192 };

export const dynamic = 'force-static';

export async function GET() {
  return new ImageResponse(<IconMark size={size.width} />, size);
}
