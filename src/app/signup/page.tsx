'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Gavel, User, Mail, Lock, Building, ArrowLeft } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    designation: '',
    court: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulation signup
    setTimeout(() => {
        setLoading(false);
        router.push('/profile');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
         <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Home
         </Link>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Create Access ID
        </h2>
        <p className="mt-2 text-sm text-slate-500">
            Digital infrastructure for the modern bench
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-gray-200/50 sm:rounded-2xl sm:px-10 border border-gray-100 relative overflow-hidden">
          
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100">
            <div 
                className="h-full bg-indigo-600 transition-all duration-300" 
                style={{ width: step === 1 ? '50%' : '100%' }}
            />
          </div>

          <form className="space-y-6 mt-4" onSubmit={handleSubmit}>
            
            {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Full Name</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                required
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-3"
                                placeholder="Hon. Justice A. Sharma"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">Official Email</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                required
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-3"
                                placeholder="judge@district.court.gov.in"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                    </div>
                    
                    <button
                        type="button"
                        onClick={() => setStep(2)}
                        disabled={!formData.name || !formData.email}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all disabled:opacity-50"
                    >
                        Continue
                    </button>
                    
                     <div className="text-center">
                        <Link href="/login" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            Already have an account? Sign in
                        </Link>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                     <div>
                        <label className="block text-sm font-medium text-slate-700">Designation</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Gavel className="h-5 w-5 text-gray-400" />
                            </div>
                            <select
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-3 bg-white"
                                value={formData.designation}
                                onChange={(e) => setFormData({...formData, designation: e.target.value})}
                            >
                                <option value="">Select Role</option>
                                <option value="district_judge">District Judge</option>
                                <option value="magistrate">Magistrate</option>
                                <option value="registrar">Registrar</option>
                                <option value="clerk">Court Clerk</option>
                            </select>
                        </div>
                    </div>

                     <div>
                        <label className="block text-sm font-medium text-slate-700">Court Jurisdiction</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Building className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                required
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-3"
                                placeholder="High Court of Delhi"
                                value={formData.court}
                                onChange={(e) => setFormData({...formData, court: e.target.value})}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">Password</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                required
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-3"
                                placeholder="Min. 8 characters"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="flex gap-3">
                         <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="flex-1 py-3 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-gray-50 transition-all"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all disabled:opacity-50"
                        >
                            {loading ? 'Creating...' : 'Create Account'}
                        </button>
                    </div>
                </div>
            )}

          </form>
        </div>
      </div>
    </div>
  );
}
