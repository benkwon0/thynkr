import Link from 'next/link';

export const metadata = {
  title: 'Thynkr',
  description: 'Let us do the thinking for you.',
};

export default function Dashboard() {
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
          <a href="#" style={{ color: '#fff', textDecoration: 'none', fontFamily: "'Inter', Arial, sans-serif", fontWeight: 500 }}>Home</a>
          <a href="#" style={{ color: '#fff', textDecoration: 'none', fontFamily: "'Inter', Arial, sans-serif", fontWeight: 500 }}>About</a>
          <Link href="/dashboard" style={{ color: '#fff', textDecoration: 'none', fontFamily: "'Inter', Arial, sans-serif", fontWeight: 500 }}>
            Dashboard
          </Link>
          <a href="#" style={{ color: '#fff', textDecoration: 'none', fontFamily: "'Inter', Arial, sans-serif", fontWeight: 500 }}>Log In</a>
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
          paddingTop: '300px', // space for nav
          paddingLeft: '12vw',
          background: 'linear-gradient(120deg, #f8fafc 0%, #e9ecef 100%)',
        }}
      >
        <div
        >
            <h2
              style={{
                fontFamily: "'Inter', Arial, sans-serif",
                fontSize: '2.5rem',
                fontWeight: 400,
                margin: '1.2rem 0 0 2px',
                color: '#495057',
                letterSpacing: '0.5px',
                lineHeight: 1.3,
                textWrap: 'nowrap',
                paddingLeft: '15rem',
                textShadow: '0 1px 8px rgba(0,0,0,0.03)',
              }}
            >
              Let's start your journey to success with a short quiz.
            </h2>
            
            <nav
            style={{
                width: '10%',
                height: '60px',
                background: '#7da068',
                color: '#495057',
                display: 'flex',
                justifyContent: 'center', // center horizontally
                alignItems: 'center',     // center vertically
                position: 'fixed',
                borderRadius: '15px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                left: '55rem',
                top: '25rem',
            }}
            >
              <Link
                href="/dashboard/quiz"
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontFamily: "'Inter', Arial, sans-serif",
                  fontWeight: 500,
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                Start Quiz
              </Link>
            </nav>
          </div>
        </div>
      </div>
  );
}
