'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface RegistrationData {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  email: string;
  age: number;
  isEligible: boolean;
  registeredAt: string;
}

export default function Dashboard() {
  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const response = await fetch('/api/register');
      const result = await response.json();
      setRegistrations(result.data || []);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch registrations');
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-gray-600">Loading...</p></div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-blue-50">
      <nav className="bg-gradient-to-r from-orange-600 to-orange-500 shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-white">
            <h2 className="text-3xl font-bold">🇮BJP </h2>
            <p className="text-orange-100 text-sm">All Voter Registrations</p>
          </div>
          <div className="flex gap-3">
            <Link href="/" className="px-5 py-2 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition shadow">Home</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl shadow-lg text-white">
            <h3 className="text-orange-100 text-sm font-semibold">Total Registrations</h3>
            <p className="text-4xl font-bold mt-2">{registrations.length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl shadow-lg text-white">
            <h3 className="text-green-100 text-sm font-semibold">Eligible Voters</h3>
            <p className="text-4xl font-bold mt-2">{registrations.filter((r) => r.isEligible).length}</p>
          </div>
          <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 rounded-xl shadow-lg text-white">
            <h3 className="text-red-100 text-sm font-semibold">Ineligible (Under 18)</h3>
            <p className="text-4xl font-bold mt-2">{registrations.filter((r) => !r.isEligible).length}</p>
          </div>
        </div>

        {error && <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded-md mb-6">{error}</div>}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-orange-600">
          {registrations.length === 0 ? (
            <div className="p-12 text-center text-gray-600">
              <p className="text-xl mb-4">📋 No registrations yet.</p>
              <Link href="/register" className="text-orange-600 hover:text-orange-700 font-semibold">Create the first registration</Link>
            </div>
          ) : (
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
                      <td className="px-6 py-4"><span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${reg.isEligible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{reg.isEligible ? '✓ Yes' : '✗ No'}</span></td>
                      <td className="px-6 py-4 text-gray-600 text-sm">{new Date(reg.registeredAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
