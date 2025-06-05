'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
// @ts-ignore
import FullCalendar from '@fullcalendar/react';
// @ts-ignore
import dayGridPlugin from '@fullcalendar/daygrid';
import { createClient } from '../../../lib/supabase/client';

export default function DashboardHome() {
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
                    <a href="#" style={{ color: '#fff', textDecoration: 'none', fontFamily: "'Inter', Arial, sans-serif", fontWeight: 500 }}>About</a>
                    <Link href="/dashboard" style={{ color: '#fff', textDecoration: 'none', fontFamily: "'Inter', Arial, sans-serif", fontWeight: 500 }}>
                        Dashboard
                    </Link>
                    {/* Google icon / Log Out / Log In */}
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
                                        backgroundColor: '#fff',
                                        cursor: 'pointer',
                                        objectFit: 'cover',
                                        padding: 0,
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

            {/* Study Planner */}
            <div 
            className="transition-transform duration-300 hover:scale-105"
                style={{
                    width: '500px',
                    height: '300px',
                    background: '#ffffff',
                    color: '#fffff',
                    position: 'fixed',
                    top: 160,
                    left: 70,
                    zIndex: 1000,
                    borderRadius: '15px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    paddingTop: '20px',
                    paddingLeft: '20px',
                }}
                >
            <a
                href="#"
                style={{
                    top: 250,
                    left: 90,
                    background: 'transparent',
                    color: '#000000',
                    fontFamily: "'Inter', Arial, sans-serif",
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: '1.2rem',
                    paddingTop: '100px',
                }}
            >
                Study Planner
            </a>
            </div>


            {/* Study Guide */}
            <Link href="/study-guides" style={{ textDecoration: 'none' }}>
            <div
                className="transition-transform duration-300 hover:scale-105"
                style={{
                    width: '500px',
                    height: '300px',
                    background: '#ffffff',
                    color: '#fffff',
                    position: 'fixed',
                    top: 160,
                    left: 600,
                    zIndex: 1000,
                    borderRadius: '15px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    paddingTop: '20px',
                    paddingLeft: '20px',
                }}
            >
                <a
                    href="#"
                    style={{
                        top: 250,
                        left: 90,
                        background: 'transparent',
                        color: '#000000',
                        fontFamily: "'Inter', Arial, sans-serif",
                        textDecoration: 'none',
                        fontWeight: 500,
                        fontSize: '1.2rem',
                        paddingTop: '100px',
                    }}
                >
                    Study Guides
                </a>
                <Image
                    src="/apafrica.png"
                    alt="AP Africa"
                    width={160}
                    height={160}
                    style={{
                        marginTop: '10px',
                        borderRadius: '12px',
                        background: '#f5f5f5',
                    }}
                    />
            </div>
            </Link>
            


           

            {/* Main Content */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    height: '100vh',
                    paddingTop: '120px',
                    paddingLeft: '12vw',
                    background: 'linear-gradient(120deg, #f8fafc 0%, #e9ecef 100%)',
                }}
            >
                {/* Calendar */}
                <div className="transition-transform duration-300 hover:scale-105"
                    style={{
                        width: '500px', // set your desired width
                        height: '440px', // set your desired height
                        marginTop: '40px',
                        marginLeft: '1100px',
                        paddingLeft: '40px auto',
                        paddingTop: '10px',
                        background: '#fff',
                        borderRadius: '15px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        padding: '50px',
                    }}
                >
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        events={[
                            { title: 'Physics 1 Exam', start: '2025-5-20' },
                        ]}
                        eventColor="#7da068"
                        height={"350px"}
                    />
                </div>
            </div>
        </div>
    );
}
