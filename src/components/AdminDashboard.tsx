import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import { Users, LayoutTemplate, Settings as SettingsIcon, LogOut, Trash2, Plus, RefreshCw, Video, Send } from 'lucide-react';
import { User, Slide } from '../types';

export default function AdminDashboard() {
  const { appState, fetchAppState, setIsAdmin } = useAppContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'users' | 'sliders' | 'settings'>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  // New Slide State
  const [newSlideUrl, setNewSlideUrl] = useState('');

  // Settings State
  const [videoUrl, setVideoUrl] = useState('');
  const [telegramUrl, setTelegramUrl] = useState('');

  useEffect(() => {
    if (appState) {
      setVideoUrl(appState.settings.videoUrl);
      setTelegramUrl(appState.settings.telegramUrl);
    }
  }, [appState]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers();
    }
  }, [activeTab]);

  const handleAddSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlideUrl) return;
    try {
      await fetch('/api/admin/slides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: newSlideUrl, type: 'image' })
      });
      setNewSlideUrl('');
      fetchAppState();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteSlide = async (id: string) => {
    try {
      await fetch(`/api/admin/slides/${id}`, { method: 'DELETE' });
      fetchAppState();
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateSettings = async (updates: any) => {
    try {
      await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      fetchAppState();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white shadow-lg md:min-h-screen flex flex-col">
        <div className="p-6 bg-blue-600 text-white flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <SettingsIcon className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Admin</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'users' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Users className="w-5 h-5" /> Users
          </button>
          <button 
            onClick={() => setActiveTab('sliders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'sliders' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <LayoutTemplate className="w-5 h-5" /> Sliders
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'settings' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <SettingsIcon className="w-5 h-5" /> Global Settings
          </button>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={() => { setIsAdmin(false); navigate('/admin/login'); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 overflow-auto h-screen">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {activeTab === 'users' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">User Management</h2>
                <button onClick={fetchUsers} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-500 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 font-medium">Mobile</th>
                      <th className="px-6 py-4 font-medium">Password</th>
                      <th className="px-6 py-4 font-medium">MPIN</th>
                      <th className="px-6 py-4 font-medium">Logins</th>
                      <th className="px-6 py-4 font-medium">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {users.map(u => (
                      <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{u.mobile}</td>
                        <td className="px-6 py-4 text-gray-400">••••</td>
                        <td className="px-6 py-4">
                          {u.mpin ? <span className="bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full text-xs font-medium">Set</span> : <span className="bg-red-100 text-red-700 px-2.5 py-0.5 rounded-full text-xs font-medium">Not Set</span>}
                        </td>
                        <td className="px-6 py-4">{u.loginCount}</td>
                        <td className="px-6 py-4">{new Date(u.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No users found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'sliders' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-1">Slider Manager</h2>
                <p className="text-sm text-gray-500">Manage images shown on the user dashboard.</p>
              </div>
              
              <div className="p-6 bg-gray-50 border-b border-gray-100">
                <form onSubmit={handleAddSlide} className="flex gap-3">
                  <input
                    type="url"
                    value={newSlideUrl}
                    onChange={(e) => setNewSlideUrl(e.target.value)}
                    placeholder="Enter image URL..."
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    required
                  />
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Slide
                  </button>
                </form>
              </div>

              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {appState?.slides.map(slide => (
                  <div key={slide.id} className="group relative rounded-xl overflow-hidden border border-gray-200 shadow-sm aspect-video bg-gray-100">
                    <img src={slide.url} alt="Slide" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button onClick={() => handleDeleteSlide(slide.id)} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900">App Controls</h2>
                </div>
                <div className="p-6 space-y-6">
                  {/* Video Toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Video Popup</h3>
                      <p className="text-sm text-gray-500">Show video popup after user logs in.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={appState?.settings.videoPopupEnabled || false}
                        onChange={(e) => handleUpdateSettings({ videoPopupEnabled: e.target.checked })}
                      />
                      <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {/* Telegram Toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Telegram Popup</h3>
                      <p className="text-sm text-gray-500">Show Telegram channel invite after login.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={appState?.settings.telegramPopupEnabled || false}
                        onChange={(e) => handleUpdateSettings({ telegramPopupEnabled: e.target.checked })}
                      />
                      <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900">Content Configuration</h2>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Video className="w-4 h-4 text-gray-400" /> Video URL
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="url"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                        placeholder="https://..."
                      />
                      <button 
                        onClick={() => handleUpdateSettings({ videoUrl })}
                        className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-xl font-medium transition-colors"
                      >
                        Save
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Send className="w-4 h-4 text-[#0088cc]" /> Telegram Channel URL
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="url"
                        value={telegramUrl}
                        onChange={(e) => setTelegramUrl(e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                        placeholder="https://t.me/..."
                      />
                      <button 
                        onClick={() => handleUpdateSettings({ telegramUrl })}
                        className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-xl font-medium transition-colors"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
