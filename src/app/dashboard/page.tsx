'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface RegistrationData {
  id: string;
  name: string;
  age: number;
  city: string;
  phoneNumber: string;
  email: string;
  isEligible: boolean;
  registeredAt: string;
}

const bjpLeaders = [
  {
    name: 'Narendra Modi',
    title: 'Prime Minister of India',
    image: 'https://pbs.twimg.com/profile_images/1494344089175326720/Mzfn4Nbi_400x400.jpg',
  },
  {
    name: 'Amit Shah',
    title: 'Home Minister of India',
    image: 'https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_400x400.jpg',
  },
  {
    name: 'K. Surendran',
    title: 'BJP Kerala State President',
    image: 'https://pbs.twimg.com/profile_images/1566763465760235520/J3lR6M7t_400x400.jpg',
  },
  {
    name: 'Rajeev Chandrasekhar',
    title: 'Union Minister, BJP Kerala',
    image: 'https://pbs.twimg.com/profile_images/1699435023640596480/r7BDqp4a_400x400.jpg',
  },
  {
    name: 'V. Muraleedharan',
    title: 'BJP State President, Kerala',
    image: 'https://pbs.twimg.com/profile_images/1592634893423718400/lnKvyGJa_400x400.jpg',
  },
];

function Card({ title, value, from, to }: { title: string; value: number; from: string; to: string }) {
  return (
    <div className={`bg-gradient-to-br from-${from} to-${to} p-6 rounded-xl shadow-lg text-white`}>
      <h3 className="text-sm font-semibold text-white/90">{title}</h3>
      <p className="text-4xl font-bold mt-2">{value}</p>
    </div>
  );
}

function LeaderCard({ leader }: { leader: { name: string; title: string; image: string } }) {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden border">
      <div className="relative w-full h-56 overflow-hidden bg-gray-100">
        <img
          src={leader.image}
          alt={leader.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
          style={{ objectPosition: 'center 20%' }}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = 'https://i.pravatar.cc/150?u=fallback';
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg">{leader.name}</h3>
        <p className="text-sm text-gray-600">{leader.title}</p>
      </div>
    </div>
  );
}

function RegistrationTable({ registrations }: { registrations: RegistrationData[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-orange-600 to-orange-500 text-white">
          <tr>
            <th className="px-6 py-4 text-left font-bold">Name</th>
            <th className="px-6 py-4 text-left font-bold">Age</th>
            <th className="px-6 py-4 text-left font-bold">Email</th>
            <th className="px-6 py-4 text-left font-bold">Phone</th>
            <th className="px-6 py-4 text-left font-bold">City</th>
            <th className="px-6 py-4 text-left font-bold">Eligible</th>
            <th className="px-6 py-4 text-left font-bold">Registered</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {registrations.map((reg) => (
            <tr key={reg.id} className="hover:bg-orange-50 transition">
              <td className="px-6 py-4 font-bold text-gray-800">{reg.name}</td>
              <td className="px-6 py-4 text-gray-700">{reg.age}</td>
              <td className="px-6 py-4 text-gray-700">{reg.email}</td>
              <td className="px-6 py-4 text-gray-700">{reg.phoneNumber}</td>
              <td className="px-6 py-4 text-gray-700">{reg.city}</td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${reg.isEligible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {reg.isEligible ? '✓ Yes' : '✗ No'}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-600 text-sm">{new Date(reg.registeredAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Dashboard() {
  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [homeTitle, setHomeTitle] = useState('Home Screen');
  const [homeSubtitle, setHomeSubtitle] = useState('This is your dashboard home screen. Customize your widgets and use the dashboard link for quick registration access.');
  const [homeDescription, setHomeDescription] = useState('Change this content to reflect your own home dashboard content and highlight the tools users can access.');
  const [homeBgColor, setHomeBgColor] = useState('#ffffff');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('dashboardHomeConfig');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setHomeTitle(parsed.homeTitle ?? homeTitle);
        setHomeSubtitle(parsed.homeSubtitle ?? homeSubtitle);
        setHomeDescription(parsed.homeDescription ?? homeDescription);
        setHomeBgColor(parsed.homeBgColor ?? homeBgColor);
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  const saveHomeConfig = () => {
    const config = { homeTitle, homeSubtitle, homeDescription, homeBgColor };
    localStorage.setItem('dashboardHomeConfig', JSON.stringify(config));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/api/register');
        const data = await response.json();
        setRegistrations(data?.data ?? []);
      } catch {
        setError('Failed to fetch registrations.');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  const eligibleCount = registrations.filter((r) => r.isEligible).length;
  const ineligibleCount = registrations.length - eligibleCount;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-blue-50">
      <nav className="bg-gradient-to-r from-orange-600 to-orange-500 shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-white">
            <h2 className="text-3xl font-bold">🇮🇳 BJP</h2>
            <p className="text-orange-100 text-sm">All Voter Registrations</p>
          </div>
          <div className="flex gap-3">
            <Link href="/" className="px-5 py-2 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition shadow">
              Home
            </Link>
          </div>
        </div>
      </nav>
      <section className="border-b border-orange-200" style={{ backgroundColor: homeBgColor }}>
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-orange-700">{homeTitle}</h1>
              <p className="text-gray-700 mt-1 mb-3">{homeSubtitle}</p>
              <p className="text-sm text-gray-600">{homeDescription}</p>
            </div>
            <div className="flex gap-2">
              <Link href="/" className="px-4 py-2 bg-orange-600 text-white rounded-md font-semibold hover:bg-orange-700">Main Home</Link>
              <Link href="/dashboard" className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700">Dashboard</Link>
            </div>
          </div>

          <div className="mt-6 p-5 bg-white rounded-xl shadow-sm border border-gray-200">
            <h2 className="font-bold text-lg mb-3">Customize Home Screen</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700">Title</label>
                <input value={homeTitle} onChange={(e) => setHomeTitle(e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Subtitle</label>
                <input value={homeSubtitle} onChange={(e) => setHomeSubtitle(e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700">Description</label>
                <textarea value={homeDescription} onChange={(e) => setHomeDescription(e.target.value)} rows={3} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Background Color</label>
                <input type="color" value={homeBgColor} onChange={(e) => setHomeBgColor(e.target.value)} className="mt-1 h-9 w-full rounded-md border border-gray-300" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <button onClick={saveHomeConfig} className="px-4 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700">Save Home Settings</button>
              {saved && <span className="text-sm text-green-700">Saved!</span>}
            </div>
          </div>
        </div>
      </section>
      <div className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur rounded-full p-1 shadow-lg border border-orange-200 flex items-center gap-1">
        {bjpLeaders.slice(0, 3).map((leader) => (
          <img
            key={leader.name}
            src={leader.image}
            alt={leader.name}
            title={`${leader.name} - ${leader.title}`}
            className="w-12 h-12 rounded-full object-cover border-2 border-white"
          />
        ))}
      </div>

      <section className="relative w-full h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-700"></div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-white px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">BJP Leadership</h1>
          <p className="text-sm md:text-base">Welcome to the voter portal - leaders at the top.</p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto py-8 px-4">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card title="Total Registrations" value={registrations.length} from="orange-500" to="orange-600" />
          <Card title="Eligible Voters" value={eligibleCount} from="green-500" to="green-600" />
          <Card title="Ineligible (Under 18)" value={ineligibleCount} from="red-500" to="red-600" />
        </section>

        {error && <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded-md mb-6">{error}</div>}

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">BJP Leaders</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
            {bjpLeaders.map((leader) => (
              <LeaderCard key={leader.name} leader={leader} />
            ))}
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-orange-600">
          {registrations.length === 0 ? (
            <div className="p-12 text-center text-gray-600">
              <p className="text-xl mb-4">📋 No registrations yet.</p>
              <Link href="/register" className="text-orange-600 hover:text-orange-700 font-semibold">Create the first registration</Link>
            </div>
          ) : (
            <RegistrationTable registrations={registrations} />
          )}
        </section>
      </main>
    </div>
  );
}
