// app/layout.tsx
export default function Home() {
  return (
    <div style={{ fontFamily: "'Roboto Condensed', Arial, sans-serif" }}>
      <head>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* Task Bar */}
      <nav
        style={{
          width: '50%',
          height: '60px',
          background: '#222',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          padding: '0 2rem',
          position: 'fixed',
          top: 30,
          left: 500,
          zIndex: 1000,
          borderRadius: '15px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <span style={{ fontWeight: 'bold', fontSize: '1.5rem', letterSpacing: '2px' }}>
          Thynkr
        </span>
        {/* Add more nav items here if needed */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '1.5rem' }}>
          <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Home</a>
          <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>About</a>
          <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Profile</a>
          <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Log In</a>
        </div>
      </nav>

      {/* Main Content */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
          paddingTop: '60px', // To prevent content from being hidden behind the nav
        }}
      >
        <h1 style={{ fontFamily: "'Roboto Condensed', Arial, sans-serif", fontSize: '15rem' }}>
          Thynkr
        </h1>
      </div>
    </div>
  );
}

