import RegistrationForm from '@/components/RegistrationForm';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-blue-50">
      <nav className="bg-gradient-to-r from-orange-600 to-orange-500 shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-white hover:text-orange-100 transition">
            <div>
              <h2 className="text-3xl font-bold">🇮BJP </h2>
              <p className="text-orange-100 text-sm">Voter Registration Portal</p>
            </div>
          </Link>
          <div className="flex gap-3">
            <Link href="/" className="px-5 py-2 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition shadow">Home</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto py-8 px-4">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 via-white to-blue-600 bg-clip-text text-transparent mb-2">
            शक्ति में विश्वास करें
          </h1>
          <p className="text-xl text-gray-700 mb-2">Strength in Belief - Voter Registration</p>
          <div className="flex justify-center gap-2 mb-6">
            <span className="w-20 h-1 bg-orange-500"></span>
            <span className="w-20 h-1 bg-white border border-gray-300"></span>
            <span className="w-20 h-1 bg-blue-600"></span>
          </div>
        </div>

        <RegistrationForm />
      </div>
    </div>
  );
}
