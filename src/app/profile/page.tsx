'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
    User, Mail, Building, Gavel, Camera, LogOut, 
    Save, ArrowLeft, Settings, ShieldCheck, CreditCard 
} from 'lucide-react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('general');
  const [profile, setProfile] = useState({
    name: 'Hon. Justice A. Sharma',
    email: 'judge@district.court.gov.in',
    designation: 'District Judge',
    court: 'Saket District Court, New Delhi',
    bio: 'Presiding over civil and criminal matters since 2015. Specialized in constitutional law.',
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    caseUpdates: true
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
                    <ArrowLeft className="w-5 h-5 text-slate-500" />
                </Link>
                <h1 className="text-xl font-bold text-slate-900">Judicial Profile Settings</h1>
            </div>
            <div className="flex items-center gap-4">
                 <Link href="/chat" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                    Open Assistant
                 </Link>
                <button className="flex items-center gap-2 text-sm font-medium text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 flex-shrink-0">
                <nav className="space-y-1">
                    <button
                        onClick={() => setActiveTab('general')}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                            activeTab === 'general' 
                            ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                            : 'text-slate-600 hover:bg-white hover:text-slate-900'
                        }`}
                    >
                        <User className="w-4 h-4" />
                        General Information
                    </button>
                    <button
                         onClick={() => setActiveTab('security')}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                            activeTab === 'security' 
                            ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                            : 'text-slate-600 hover:bg-white hover:text-slate-900'
                        }`}
                    >
                        <ShieldCheck className="w-4 h-4" />
                        Security & Access
                    </button>
                    <button
                         onClick={() => setActiveTab('notifications')}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                             activeTab === 'notifications' 
                            ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                            : 'text-slate-600 hover:bg-white hover:text-slate-900'
                        }`}
                    >
                        <Settings className="w-4 h-4" />
                        Preferences
                    </button>
                </nav>
                
                <div className="mt-8 p-4 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-200">
                    <h3 className="font-bold text-lg mb-1">Pro Access</h3>
                    <p className="text-indigo-100 text-sm mb-3">Your bench has unlimited access to NJDG & MoSPI tools.</p>
                    <div className="flex items-center gap-2 text-xs font-mono bg-indigo-700/50 p-2 rounded">
                        <CreditCard className="w-3 h-3" />
                        <span>Lic: IND-JUD-2024-X9</span>
                    </div>
                </div>
            </aside>

            {/* Content Area */}
            <div className="flex-1">
                 {activeTab === 'general' && (
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm divide-y divide-gray-100 animate-in fade-in zoom-in-95 duration-200">
                        {/* Avatar Section */}
                        <div className="p-8 flex flex-col sm:flex-row items-center gap-6">
                            <div className="relative group">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-3xl font-bold text-white shadow-md">
                                    JS
                                </div>
                                <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors">
                                    <Camera className="w-4 h-4 text-slate-600" />
                                </button>
                            </div>
                            <div className="text-center sm:text-left">
                                <h2 className="text-xl font-bold text-slate-900">{profile.name}</h2>
                                <p className="text-slate-500">{profile.designation}</p>
                            </div>
                            <div className="sm:ml-auto">
                                <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                                    <Save className="w-4 h-4" />
                                    Save Changes
                                </button>
                            </div>
                        </div>

                        {/* Forms */}
                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={profile.name}
                                            onChange={(e) => setProfile({...profile, name: e.target.value})}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            value={profile.email}
                                            onChange={(e) => setProfile({...profile, email: e.target.value})}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Designation</label>
                                    <div className="relative">
                                        <Gavel className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={profile.designation}
                                            onChange={(e) => setProfile({...profile, designation: e.target.value})}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Court Jurisdiction</label>
                                    <div className="relative">
                                        <Building className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={profile.court}
                                            onChange={(e) => setProfile({...profile, court: e.target.value})}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Professional Bio</label>
                                <textarea
                                    value={profile.bio}
                                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                                    rows={4}
                                    className="w-full p-4 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                                />
                                <p className="text-xs text-slate-400 mt-2 text-right">Visible only to administrative staff.</p>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Placeholders for other tabs */}
                {activeTab === 'security' && (
                     <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12 text-center animate-in fade-in zoom-in-95 duration-200">
                        <ShieldCheck className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-slate-900">Security Settings</h3>
                        <p className="text-slate-500">Two-factor authentication and password management coming soon.</p>
                     </div>
                )}
                 {activeTab === 'notifications' && (
                     <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12 text-center animate-in fade-in zoom-in-95 duration-200">
                        <Settings className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-slate-900">Preference Settings</h3>
                        <p className="text-slate-500">Manage your email summaries and alert preferences here.</p>
                     </div>
                )}
            </div>
        </div>
      </main>
    </div>
  );
}
