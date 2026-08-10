import { ImageResponse } from 'next/og';
import { IconMark } from '@/app/IconMark';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default function Icon() {
  return new ImageResponse(<IconMark size={size.width} />, size);
}
