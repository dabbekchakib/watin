import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        background: '#0d2545',
        color: '#ffffff',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <div
          style={{
            display: 'flex',
            width: 18,
            height: 150,
            background: '#14998f',
            transform: 'skewX(-18deg)',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 108, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>
            WATIN
          </div>
          <div style={{ fontSize: 30, fontWeight: 600, color: '#37c2b6', marginTop: 18 }}>
            WE MOVE. YOU GROW.
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', marginTop: 70, fontSize: 32, color: '#d6e2f2' }}>
        Web · Mobile · IA · Tunis
      </div>
    </div>,
    size,
  );
}
