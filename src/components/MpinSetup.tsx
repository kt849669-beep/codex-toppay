import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import { Lock } from 'lucide-react';

export default function MpinSetup() {
  const [mpin, setMpin] = useState('');
  const [confirmMpin, setConfirmMpin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAppContext();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mpin.length !== 4) {
      setError('MPIN must be 4 digits.');
      return;
    }
    if (mpin !== confirmMpin) {
      setError('MPINs do not match.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/mpin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, mpin })
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Setup failed');
      }

      setUser(data.user);
      sessionStorage.setItem('toppay_just_logged_in', 'true');
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-50 p-4 rounded-full">
            <Lock className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Set Secure MPIN</h2>
        <p className="text-gray-500 mb-8 text-sm">Create a 4-digit PIN for quick access to your account.</p>

        <form onSubmit={handleSetup} className="space-y-5 text-left">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Enter 4-digit MPIN</label>
            <input
              type="password"
              maxLength={4}
              value={mpin}
              onChange={(e) => setMpin(e.target.value.replace(/\D/g, ''))}
              className="w-full px-4 py-3 text-center tracking-[0.5em] text-2xl rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-gray-50 focus:bg-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm MPIN</label>
            <input
              type="password"
              maxLength={4}
              value={confirmMpin}
              onChange={(e) => setConfirmMpin(e.target.value.replace(/\D/g, ''))}
              className="w-full px-4 py-3 text-center tracking-[0.5em] text-2xl rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-gray-50 focus:bg-white"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-70 mt-6"
          >
            {loading ? 'Saving...' : 'Set MPIN'}
          </button>
        </form>
      </div>
    </div>
  );
}
