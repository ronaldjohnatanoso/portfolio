import { ImageResponse } from 'next/og';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: '#030305',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'monospace',
          color: '#00fff5',
        }}
      >
        $
      </div>
    ),
    {
      width: 32,
      height: 32,
    }
  );
}
