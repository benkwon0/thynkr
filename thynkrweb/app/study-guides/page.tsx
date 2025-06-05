'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';



export default function StudyGuidesPage() {
  // Add user state and hover state for profile logic
  const [user, setUser] = useState(null);
  const [hovered, setHovered] = useState(false);

  // Import your Supabase client
  // Adjust the import path as needed for your project structure
  // Example: import { createClient } from '../../lib/supabase/client';
  // If you use a shared Navbar, you can remove this logic and use the Navbar instead
  useEffect(() => {
    // Only run if window is defined (client-side)
    if (typeof window !== 'undefined') {
      import('../../lib/supabase/client').then(({ createClient }) => {
        const supabase = createClient();
        supabase.auth.getUser().then(({ data }) => {
          setUser(data?.user ?? null);
        });
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user ?? null);
        });
        return () => {
          listener?.subscription.unsubscribe();
        };
      });
    }
  }, []);

  const handleLogout = async () => {
    const { createClient } = await import('../../lib/supabase/client');
    const supabase = createClient();
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
          {/* Conditionally render profile image and Log Out or Log In */}
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
                    padding: 0,
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
              marginBottom: '0.75rem',
              display: 'inline-block',
              cursor: 'pointer'
            }}
          >
            AP African American Studies Study Guide
          </a>
          <a
            href="https://docs.google.com/document/d/1U4GVOM-CaG71AF1rvrDIOTRDYaAUNo6alCDwGpQ3Sbk/edit?usp=sharing"
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
              marginBottom: '0.75rem',
              marginLeft: '20px',
              display: 'inline-block',
              cursor: 'pointer'
            }}
          >
            AP Comparative Government and Politics Study Guide
          </a>
          <a
            href="https://docs.google.com/document/d/1C4elsWWtOVNApcno5RKgPaMxdAUpfWD_NRfzcfNv6jY/edit?usp=sharing"
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
              marginBottom: '0.75rem',
              marginLeft: '20px',
              display: 'inline-block',
              cursor: 'pointer'
            }}
          >
            AP European History Study Guide
          </a>
        </div>
      </div>
    </div>
  );
}