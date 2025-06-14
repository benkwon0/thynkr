'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '../lib/supabase/client';

export default function Home() {
  const supabase = createClient();
  const [user, setUser] = useState(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
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
                    background: '#E37573',
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
                  src={user.user_metadata?.avatar_url || "/default-avatar.png"}
                  alt="Profile"
                  width={42}
                  height={42}
                  style={{ 
                    borderRadius: '50%',
                    padding: '0px',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    objectFit: 'cover',
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


      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 100px)',
          paddingTop: '100px',
          paddingLeft: '15vw',
          background: 'linear-gradient(120deg, #f8fafc 0%, #e9ecef 100%)',
        }}
      >

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: 1, minWidth: 0 }}>
          <h1
            style={{
              fontFamily: "'Montserrat', Arial, sans-serif",
              fontSize: '8.5rem',
              fontWeight: 530,
              margin: 0,
              color: '#23272f',
              letterSpacing: '-2px',
              lineHeight: 1.05,
              textShadow: '0 2px 16px rgba(0,0,0,0.04)',
            }}
          >
            thynkr
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
            Your 1 on 1 study tool, powered by AI. Let us do the thinking for you.
          </h2>
          <Link
            href="/dashboard"
            style={{
              marginTop: '2.5rem',
              padding: '1rem 2.5rem',
              background: '#7da068',
              color: '#fff',
              fontFamily: "'Inter', Arial, sans-serif",
              fontWeight: 600,
              fontSize: '1.5rem',
              borderRadius: '12px',
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              transition: 'background 0.2s, transform 0.2s',
              display: 'inline-block',
            }}
          >
            Start Now
          </Link>
        </div>
      </div>
    </div>
  );
}

