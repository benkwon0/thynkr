import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Thynkr',
  description: 'Let us do the thinking for you.',
};

export default function Home() {
  return (
    <div style={{ fontFamily: "'Montserrat', 'Inter', Arial, sans-serif" }}>
      {/* Google Fonts */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css?family=Montserrat:700,400&display=swap');
          @import url('https://fonts.googleapis.com/css?family=Inter:400,600&display=swap');
        `}
      </style>
      {/* Task Bar */}
      <nav
        style={{
          width: '70%',
          height: '60px',
          background: '#7da068',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          padding: '0 2rem',
          position: 'fixed',
          top: 30,
          left: 300,
          zIndex: 1000,
          borderRadius: '15px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={36}
            height={36}
            style={{ borderRadius: '8px' }}
          />
          <span style={{ fontWeight: 700, fontSize: '1.7rem', letterSpacing: '2px', fontFamily: "'Montserrat', Arial, sans-serif" }}>
            Thynkr
          </span>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '1.5rem' }}>
          <Link href="/" style={{ color: '#fff', textDecoration: 'none', fontFamily: "'Inter', Arial, sans-serif", fontWeight: 500 }}>
            Home
          </Link>
          <Link href="/about" style={{ color: '#fff', textDecoration: 'none', fontFamily: "'Inter', Arial, sans-serif", fontWeight: 500 }}>
            About
          </Link>
          <Link href="/dashboard" style={{ color: '#fff', textDecoration: 'none', fontFamily: "'Inter', Arial, sans-serif", fontWeight: 500 }}>
            Dashboard
          </Link>
          <Link href="/logIn" style={{ color: '#fff', textDecoration: 'none', fontFamily: "'Inter', Arial, sans-serif", fontWeight: 500 }}>
            Log In
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 100px)', // adjust for nav height
          paddingTop: '100px', // space for nav
          paddingLeft: '15vw',
          background: 'linear-gradient(120deg, #f8fafc 0%, #e9ecef 100%)',
        }}
      >
        {/* Left: Text Block */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: 1, minWidth: 0 }}>
          <h1
            style={{
              fontFamily: "'Montserrat', Arial, sans-serif",
              fontSize: '7rem',
              fontWeight: 700,
              margin: 0,
              color: '#23272f',
              letterSpacing: '-2px',
              lineHeight: 1.05,
              textShadow: '0 2px 16px rgba(0,0,0,0.04)',
            }}
          >
            Thynkr
          </h1>
          <h2
            style={{
              fontFamily: "'Inter', Arial, sans-serif",
              fontSize: '2.5rem',
              fontWeight: 400,
              margin: '1.2rem 0 0 2px',
              color: '#495057',
              letterSpacing: '0.5px',
              lineHeight: 1.3,
              maxWidth: 600,
              textShadow: '0 1px 8px rgba(0,0,0,0.03)',
            }}
          >
            Your guide to college readiness, powered by AI. Let us do the thinking for you.
          </h2>
        </div>
        {/* Right: Image */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <Image
            src="/harvard.png"
            alt="Harvard"
            width={600}
            height={600}
            style={{ borderRadius: '16px', maxWidth: '100%', height: 'auto' }}
          />
        </div>
      </div>
    </div>
  );
}

