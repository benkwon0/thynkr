'use client';
import Link from 'next/link';
import React from 'react';
// @ts-ignore
import FullCalendar from '@fullcalendar/react';
// @ts-ignore
import dayGridPlugin from '@fullcalendar/daygrid';

export default function DashboardHome() {
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
                    <a href="#" style={{ color: '#fff', textDecoration: 'none', fontFamily: "'Inter', Arial, sans-serif", fontWeight: 500 }}>About</a>
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
                    paddingTop: '120px',
                    paddingLeft: '12vw',
                    background: 'linear-gradient(120deg, #f8fafc 0%, #e9ecef 100%)',
                }}
            >
                {/* Calendar Container */}
                <div
                    style={{
                        width: '600px', // set your desired width
                        height: '430px', // set your desired height
                        marginTop: '40px',
                        marginLeft: '900px',
                        paddingLeft: '40px auto',
                        paddingTop: '10px',
                        background: '#fff',
                        borderRadius: '15px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        padding: '24px',
                    }}
                >
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        events={[
                            { title: 'Event 1', start: '2023-10-01' },
                            { title: 'Event 2', start: '2023-10-07' },
                            { title: 'Event 3', start: '2023-10-15' },
                        ]}
                        eventColor="#7da068"
                        height="400px"
                    />
                </div>
            </div>
        </div>
    );
}
