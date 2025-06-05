'use client';
import { useEffect, useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '../../lib/supabase/client';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const supabase = createClient();
  const [user, setUser] = useState(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user ?? null); // <-- Only set user if data.user exists
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null); // <-- Only set user if session.user exists
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

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
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#fff', textDecoration: 'none', fontFamily: "'Inter', Arial, sans-serif", fontWeight: 500 }}>
            Home
          </Link>
          <Link href="/about" style={{ color: '#fff', textDecoration: 'none', fontFamily: "'Inter', Arial, sans-serif", fontWeight: 500 }}>
            About
          </Link>
          <Link href="/dashboard" style={{ color: '#fff', textDecoration: 'none', fontFamily: "'Inter', Arial, sans-serif", fontWeight: 500 }}>
            Dashboard
          </Link>

          {/* Conditionally render Google icon and Log Out or Log In */}
          {user ? (
            <div
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{ display: 'flex', alignItems: 'center', height: '100%' }}
            >
              {hovered ? (
                <button
                  onClick={handleLogout}
                  style={{
                    background: 'transparent',
                    border: '1px solid #fff',
                    color: '#fff',
                    fontFamily: "'Inter', Arial, sans-serif",
                    fontWeight: 500,
                    fontSize: '1rem',
                    borderRadius: '8px',
                    padding: '4px 12px',
                    cursor: 'pointer',
                  }}
                >
                  Log Out
                </button>
              ) : (
                <Image
                  src="/google-icon.png"
                  alt="Google Account"
                  width={32}
                  height={32}
                  style={{ 
                    borderRadius: '50%',
                    padding: '0px',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    objectFit: 'cover'
                  }}
                />
              )}
            </div>
          ) : (
            <Link href="/logIn" style={{ color: '#fff', textDecoration: 'none', fontFamily: "'Inter', Arial, sans-serif", fontWeight: 500 }}>
              Log In
            </Link>
          )}
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
          paddingTop: '180px', // space for nav
          paddingLeft: '40vw',
          background: 'linear-gradient(120deg, #f8fafc 0%, #e9ecef 100%)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div style={{ width: '320px' }}>
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={['google']}
              redirectTo={`${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


