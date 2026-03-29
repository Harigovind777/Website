'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const sliderImages = [
  { src: '/bjp-leaders.png', alt: 'BJP Leaders' },
  { src: '/rajeev-1.jpeg', alt: 'Rajeev Chandrasekhar' },
  { src: '/rajeev-2.jpeg', alt: 'Rajeev Chandrasekhar' },
  { src: '/rajeev-3.jpeg', alt: 'Rajeev Chandrasekhar' },
  { src: '/rajeev-4.jpeg', alt: 'Rajeev Chandrasekhar' },
];

function ImageSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const next = () => setCurrent((current + 1) % sliderImages.length);
  const prev = () => setCurrent((current - 1 + sliderImages.length) % sliderImages.length);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl border-4 border-orange-400">
      {sliderImages.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${index === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={img.src} alt={img.alt} className="w-full h-full object-contain bg-gradient-to-br from-orange-600 via-orange-500 to-yellow-400" />
        </div>
      ))}
      {sliderImages.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-12 h-12 rounded-full flex items-center justify-center transition">
            ‹
          </button>
          <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-12 h-12 rounded-full flex items-center justify-center transition">
            ›
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition ${index === current ? 'bg-white' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,128,0,0.22),_transparent_65%),linear-gradient(to_bottom,_rgb(255,176,77),_rgb(255,244,214))]">
      <header className="bg-[#ff8c00] text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <img src="/bjp-logo.png" alt="BJP Logo" className="h-10 md:h-12 w-auto object-contain" />
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight">BJP</h1>
              <p className="text-xs md:text-sm text-orange-100">People's Power Voter Portal</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-4 text-sm font-semibold">
            <Link href="/" className="px-3 py-2 rounded-lg hover:bg-white/20">Home</Link>
            <Link href="/register" className="px-3 py-2 rounded-lg hover:bg-white/20">Register</Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/register" className="px-4 py-2 text-sm font-bold bg-orange-700 text-white rounded-lg shadow-sm hover:brightness-110 transition">Register</Link>
          </div>
        </div>
      </header>

      <main className="relative overflow-hidden">
        <section id="home" className="pt-14 pb-20">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-sm text-orange-100 font-semibold uppercase tracking-wide">India at the helm</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#660000] leading-tight mt-3 mb-6">Join the movement, register to vote, empower your voice.</h2>
              <p className="text-lg md:text-xl text-gray-800 mb-8">A dedicated page for BJP Naruvamoodu members to verify eligibility and manage registrations from one central dashboard.</p>

              <div className="flex gap-3 flex-wrap">
                <Link href="/register" className="px-6 py-3 bg-orange-600 text-white font-bold rounded-lg shadow-lg hover:bg-orange-700 transition">Register Now</Link>
              </div>
            </div>

            <div className="relative">
              <ImageSlider />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

