import Link from 'next/link';

export const metadata = {
  title: 'Study Guides',
  description: 'gitResources.',
};

export default function StudyGuidesPage() {
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
        <span style={{ fontWeight: 700, fontSize: '1.7rem', letterSpacing: '2px', fontFamily: "'Montserrat', Arial, sans-serif" }}>
          Thynkr
        </span>
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
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          height: '100vh',
          paddingTop: '100px', // space for nav
          paddingLeft: '12vw',
          background: 'linear-gradient(120deg, #f8fafc 0%, #e9ecef 100%)',
        }}
      >

        <div>
          <h1 style={{
            color: '#000000',
            letterSpacing: ".1px", 
            fontSize: '5rem',
            fontFamily: "'Montserrat', Arial, sans-serif", 
            fontWeight: 500,
            paddingTop: '10px',
            paddingLeft: '65px',
            }}>
            Study Guides
          </h1>
          <a
            href="https://docs.google.com/document/d/1Of_vOhNreL0vXwVVq0JOAXkGvnmE-ZolReKNHCPdW3g/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#7da068',
              color: '#FFFFFF',
              textDecoration: 'none',
              fontSize: '1rem',
              fontFamily: "'Inter', Arial, sans-serif",
              fontWeight: 500,
              padding: '0.5rem 1.5rem',
              borderRadius: '8px',
              marginTop: '1.5rem',
              display: 'inline-block',
              cursor: 'pointer'
            }}
          >
            AP African American Studies Study Guide
          </a>
        </div>



      </div>
      </div>
  );
}

