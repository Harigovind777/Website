'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

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

function RegistrationSuccessContent() {
  const searchParams = useSearchParams();
  const registrationId = searchParams.get('id');
  const [registration, setRegistration] = useState<RegistrationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (registrationId) {
      fetchRegistration(registrationId);
    }
  }, [registrationId]);

  const fetchRegistration = async (id: string) => {
    try {
      const response = await fetch('/api/register');
      const result = await response.json();
      const found = result.data?.find((reg: RegistrationData) => reg.id === id);
      
      if (found) {
        setRegistration(found);
      } else {
        setError('Registration not found');
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch registration details');
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-gray-600">Loading...</p></div>;
  }

  if (error || !registration) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-800 px-6 py-4 rounded-lg mb-6">{error || 'Registration details not found'}</div>
          <Link href="/register" className="text-blue-600 hover:underline">← Back to Registration Form</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-orange-50">
      <nav className="bg-gradient-to-r from-orange-600 to-orange-500 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h2 className="text-white text-2xl font-bold">🇮🇳 BJP Naruvamoodu</h2>
          <p className="text-orange-100 text-sm">Voter Registration Portal</p>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-green-600 mb-2">✓ Registration Successful!</h1>
          <p className="text-gray-600">BJP Naruvamoodu Panchayath - Voter Registration Portal</p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-500 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-green-700 mb-2">Welcome, {registration.name}!</h2>
          <p className="text-green-700 mb-2">Your registration has been successfully submitted.</p>
          <p className="text-green-600 text-sm">Registration ID: <span className="font-mono font-bold text-lg bg-white px-3 py-1 rounded">{registration.id}</span></p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-t-4 border-orange-600">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b-2 border-orange-500">Your Registration Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h4 className="text-sm font-bold text-gray-500 uppercase mb-4">Personal Information</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Full Name</p>
                  <p className="text-lg font-semibold text-gray-800 mt-1">{registration.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Age</p>
                  <p className="text-lg font-semibold text-gray-800 mt-1">{registration.age} years</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Gender</p>
                  <p className="text-lg font-semibold text-gray-800 mt-1">{registration.gender}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-500 uppercase mb-4">Contact Information</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Email</p>
                  <p className="text-lg font-semibold text-gray-800 mt-1">{registration.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Phone</p>
                  <p className="text-lg font-semibold text-gray-800 mt-1">{registration.phoneNumber}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-gray-200 pt-8 mb-8">
            <h4 className="text-sm font-bold text-gray-500 uppercase mb-4">Address Details</h4>
            <div className="space-y-3">
              <div><p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Street</p><p className="text-lg font-semibold text-gray-800 mt-1">{registration.address}</p></div>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">City</p><p className="text-lg font-semibold text-gray-800 mt-1">{registration.city}</p></div>
                <div><p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">State</p><p className="text-lg font-semibold text-gray-800 mt-1">{registration.state}</p></div>
              </div>
              <div><p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Zip Code</p><p className="text-lg font-semibold text-gray-800 mt-1">{registration.zipCode}</p></div>
            </div>
          </div>

          <div className="border-t-2 border-gray-200 pt-8">
            <h4 className="text-sm font-bold text-gray-500 uppercase mb-4">Voter Eligibility Status</h4>
            <div className={`p-6 rounded-lg border-2 ${registration.isEligible ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'}`}>
              <p className={`text-2xl font-bold ${registration.isEligible ? 'text-green-800' : 'text-red-800'}`}>
                {registration.isEligible ? '✓ ELIGIBLE TO VOTE' : '✗ NOT ELIGIBLE (Under 18)'}
              </p>
              <p className={`text-sm mt-2 ${registration.isEligible ? 'text-green-700' : 'text-red-700'}`}>
                {registration.isEligible ? 'You are eligible to participate in the voter registration process.' : 'You must be 18 years or older to register as a voter.'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register" className="px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold rounded-lg hover:from-orange-700 hover:to-orange-600 transition shadow-lg text-center">Register Another Person</Link>
          <button onClick={() => window.print()} className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition shadow-lg">🖨️ Print Details</button>
        </div>
      </div>
    </div>
  );
}

export default function RegistrationSuccess() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-gray-600">Loading...</p></div>}>
      <RegistrationSuccessContent />
    </Suspense>
  );
}
