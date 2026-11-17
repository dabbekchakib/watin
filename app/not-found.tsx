import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
};

export default function NotFound() {
  return (
    <main
      lang="fr"
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: '#0d2545',
        color: '#fff',
        fontFamily: 'sans-serif',
        textAlign: 'center',
        padding: 24,
      }}
    >
      <div>
        <p style={{ color: '#37c2b6', fontSize: 96, fontWeight: 800, margin: 0 }}>404</p>
        <h1 style={{ fontSize: 32, margin: '12px 0 24px' }}>Cette page est introuvable</h1>
        <Link href="/fr" style={{ color: '#fff', fontWeight: 700 }}>
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
