'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  email: string;
}

export default function RegistrationForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
    email: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage({ type: 'error', text: result.error || 'Registration failed' });
      } else {
        setMessage({ type: 'success', text: result.message });
        setTimeout(() => {
          router.push(`/success?id=${result.data.id}`);
        }, 500);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-2xl border-t-4 border-orange-600">
      <div className="text-center mb-8">
        <div className="inline-block px-4 py-2 bg-gradient-to-r from-orange-100 to-blue-100 rounded-full mb-4">
          <p className="text-orange-700 font-semibold text-sm">🇮🇳 राष्ट्रीय मतदाता पंजीकरण</p>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-1">Voter Registration</h1>
        <p className="text-gray-600">BJP Naruvamoodu Panchayath</p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg border-l-4 font-semibold ${message.type === 'success' ? 'bg-green-50 border-green-500 text-green-700' : 'bg-red-50 border-red-500 text-red-700'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition" placeholder="Enter your full name" />
          </div>
          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-bold text-gray-700 mb-2">Date of Birth * (18+ Required)</label>
            <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="gender" className="block text-sm font-bold text-gray-700 mb-2">Gender *</label>
            <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
            <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition" placeholder="Enter your phone number" />
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-bold text-gray-700 mb-2">Street Address *</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition" placeholder="Enter your street address" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label htmlFor="city" className="block text-sm font-bold text-gray-700 mb-2">City *</label>
            <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition" placeholder="City" />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-bold text-gray-700 mb-2">State *</label>
            <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition" placeholder="State" />
          </div>
          <div>
            <label htmlFor="zipCode" className="block text-sm font-bold text-gray-700 mb-2">Zip Code *</label>
            <input type="text" id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition" placeholder="Zip" />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition" placeholder="Enter your email address" />
        </div>

        <button type="submit" disabled={loading} className="w-full py-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold rounded-lg hover:from-orange-700 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-400 transition shadow-lg text-lg">
          {loading ? '⏳ Processing...' : '✓ Register to Vote'}
        </button>
      </form>

      <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-blue-50 border-l-4 border-orange-600 rounded-lg">
        <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
          <span className="text-2xl">📋</span> Eligibility Requirements
        </h3>
        <ul className="text-sm text-gray-700 space-y-2">
          <li className="flex items-center gap-2"><span className="text-orange-600 font-bold">✓</span> Must be 18 years of age or older</li>
          <li className="flex items-center gap-2"><span className="text-orange-600 font-bold">✓</span> Must provide valid personal information</li>
          <li className="flex items-center gap-2"><span className="text-orange-600 font-bold">✓</span> Must provide current residential address</li>
          <li className="flex items-center gap-2"><span className="text-orange-600 font-bold">✓</span> Contact information must be accurate</li>
        </ul>
      </div>
    </div>
  );
}
