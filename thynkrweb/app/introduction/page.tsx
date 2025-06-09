'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CursiveLogo() {
    const [fillVisible, setFillVisible] = React.useState(false);
    const [logoMoved, setLogoMoved] = React.useState(false);
    const [showNewPage, setShowNewPage] = React.useState(false);
    const [fade, setFade] = React.useState(false);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => setFillVisible(true), 1500);
        const moveTimer = setTimeout(() => setLogoMoved(true), 2500);
        const pageTimer = setTimeout(() => {
            setFade(true);
            setTimeout(() => setShowNewPage(true), 100); 
        }, 4000);

        return () => {
            clearTimeout(timer);
            clearTimeout(moveTimer);
            clearTimeout(pageTimer);
        };
    }, []);

    useEffect(() => {
        if (showNewPage) {
            router.push('/');
        }
    }, [showNewPage, router]);

    return (
        <div className="flex items-center justify-center h-screen bg-white" style={{ position: 'relative', overflow: 'hidden' }}>
            <div
                style={{
                    transition: 'transform 2s ease, opacity 2s ease',
                    transform: logoMoved
                        ? 'translateX(-440px) translateY(-130px) scale(0.5)'
                        : 'scale(1)',
                    opacity: logoMoved ? 0.8 : 1,
                    transformOrigin: 'center',
                    willChange: 'transform, opacity',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <svg
                    viewBox="0 0 149 38"
                    style={{ width: '90vw', maxWidth: '900px', height: 'auto', display: 'block' }}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M5.6 11H1.8V8.2H5.6V1.8H11.2V8.2H17.4V11H11.2V21.4C11.2 22.4133 11.3067 23.28 11.52 24C11.76 24.6933 12.0667 25.2667 12.44 25.72C12.84 26.1467 13.2933 26.4667 13.8 26.68C14.3067 26.8933 14.84 27 15.4 27C16.2 27 16.9733 26.88 17.72 26.64C18.4667 26.3733 19.0933 26.0933 19.6 25.8L20.8 28.4C20 28.8 19.08 29.1333 18.04 29.4C17.0267 29.6667 16.0133 29.8 15 29.8C11.9867 29.8 9.66667 29.0533 8.04 27.56C6.41333 26.0667 5.6 24.0133 5.6 21.4V11Z
                        M45.9953 29H40.3953V16.4C40.3953 14.48 39.9153 13.1067 38.9553 12.28C37.9953 11.4267 36.6086 11 34.7953 11H29.5953V29H23.9953V0.999998H29.5953V8.2H34.7953C38.6086 8.2 41.422 8.89333 43.2353 10.28C45.0753 11.64 45.9953 13.68 45.9953 16.4V29Z
                        M67.7781 28.2H62.5781C58.7648 28.2 55.9381 27.52 54.0981 26.16C52.2848 24.7733 51.3781 22.72 51.3781 20V8.2H56.9781V20C56.9781 21.92 57.4581 23.3067 58.4181 24.16C59.3781 24.9867 60.7648 25.4 62.5781 25.4H67.7781V8.2H73.3781V28.6C73.3781 29.8533 73.1381 30.9867 72.6581 32C72.1781 33.04 71.4581 33.9333 70.4981 34.68C69.5648 35.4267 68.3781 36 66.9381 36.4C65.5248 36.8 63.8715 37 61.9781 37C61.3381 37 60.6448 36.9467 59.8981 36.84C59.1781 36.76 58.4448 36.6133 57.6981 36.4C56.9515 36.2133 56.2181 35.96 55.4981 35.64C54.8048 35.3467 54.1648 35 53.5781 34.6L55.1781 32.2C56.0848 32.8133 57.0981 33.2933 58.2181 33.64C59.3381 34.0133 60.4581 34.2 61.5781 34.2C63.5781 34.2 65.1115 33.7467 66.1781 32.84C67.2448 31.9333 67.7781 30.52 67.7781 28.6V28.2Z
                        M100.995 29H95.3953V16.4C95.3953 14.48 94.9153 13.1067 93.9553 12.28C92.9953 11.4267 91.6086 11 89.7953 11H84.5953V29H78.9953V8.2H89.7953C93.6086 8.2 96.422 8.89333 98.2353 10.28C100.075 11.64 100.995 13.68 100.995 16.4V29Z
                        M116.178 19.8H111.978V29H106.378V0.999998H111.978V17H116.178L122.378 8.2H128.378L121.378 18.2L128.778 29H122.378L116.178 19.8Z
                        M147.764 11H142.964C141.151 11 139.764 11.4933 138.804 12.48C137.844 13.44 137.364 14.88 137.364 16.8V29H131.764V16.8C131.764 14.08 132.617 11.9733 134.324 10.48C136.057 8.96 138.537 8.2 141.764 8.2H147.764V11Z"
                        stroke="#7da068"
                        strokeWidth="1"
                        strokeDasharray="2400"
                        strokeDashoffset="2400"
                        fill={fillVisible ? "#7da068" : "transparent"}
                        style={{
                            transition: 'fill 1s ease-in-out',
                        }}
                    >
                        <animate
                            attributeName="stroke-dashoffset"
                            from="2400"
                            to="0"
                            dur="30s"
                            fill="freeze"
                        />
                    </path>
                </svg>
            </div>

            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: '#fff',
                    opacity: fade ? 1 : 0,
                    pointerEvents: fade ? 'auto' : 'none',
                    transition: 'opacity 0.8s',
                    zIndex: 50,
                }}
            />
        </div>
    );
}
