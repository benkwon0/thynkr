'use client';
import { useEffect, useState } from 'react';
import { createClient } from '../lib/supabase/client';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
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
        <Link href="/study-guides" style={{ color: '#fff', textDecoration: 'none', fontFamily: "'Inter', Arial, sans-serif", fontWeight: 500 }}>
          Study Guides
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
                width={28}
                height={28}
                style={{ borderRadius: '50%', background: '#fff', cursor: 'pointer' }}
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
  );
}