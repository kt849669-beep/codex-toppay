import React, { useState, useEffect } from 'react';
import { useAppContext } from '../AppContext';
import { Bell, Home, Search, User as UserIcon, Wallet, X, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UserDashboard() {
  const { appState, user, setUser } = useAppContext();
  const navigate = useNavigate();
  
  // Post-login popup states
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const [showTelegramPopup, setShowTelegramPopup] = useState(false);

  // Carousel
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Post login sequence logic
    const justLoggedIn = sessionStorage.getItem('toppay_just_logged_in');
    if (justLoggedIn) {
      sessionStorage.removeItem('toppay_just_logged_in');
      setShowSuccessDialog(true);
    }
  }, []);

  useEffect(() => {
    if (!appState?.slides.length) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % appState.slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [appState?.slides]);

  const handleSuccessClose = () => {
    setShowSuccessDialog(false);
    if (appState?.settings.videoPopupEnabled) {
      setShowVideoPopup(true);
    } else if (appState?.settings.telegramPopupEnabled) {
      setShowTelegramPopup(true);
    }
  };

  const handleVideoClose = () => {
    setShowVideoPopup(false);
    if (appState?.settings.telegramPopupEnabled) {
      setShowTelegramPopup(true);
    }
  };

  const handleTelegramClose = () => {
    setShowTelegramPopup(false);
  };

  return (
    <div className="pb-24 max-w-md mx-auto bg-gray-50 min-h-screen relative shadow-2xl">
      {/* Header */}
      <div className="bg-blue-600 rounded-b-3xl p-6 text-white shadow-lg sticky top-0 z-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-blue-100 text-xs font-medium">Welcome back</p>
              <p className="font-semibold">{user?.mobile}</p>
            </div>
          </div>
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
            <Bell className="w-5 h-5" />
          </div>
        </div>
        
        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
          <p className="text-blue-100 text-sm mb-1">Total Balance</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">₹0.00</span>
          </div>
        </div>
      </div>

      <div className="px-4 mt-6">
        {/* Slider */}
        {appState?.slides && appState.slides.length > 0 && (
          <div className="relative rounded-2xl overflow-hidden h-40 shadow-sm mb-6 bg-gray-200">
            {appState.slides.map((slide, idx) => (
              <img
                key={slide.id}
                src={slide.url}
                alt="Banner"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
              {appState.slides.map((_, idx) => (
                <div key={idx} className={`h-1.5 rounded-full transition-all ${idx === currentSlide ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`} />
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-4">
          <button className="relative bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:border-blue-200 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Wallet className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-900 text-lg">Top up</p>
                <p className="text-xs text-gray-500">Add money to wallet</p>
              </div>
            </div>
            {/* Badge */}
            <div className="absolute -top-3 -right-2 bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md border-2 border-white flex items-center gap-1">
              <span>🪙</span> First
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-10 pb-safe">
        <button className="flex flex-col items-center gap-1 text-blue-600">
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-medium">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600">
          <Search className="w-6 h-6" />
          <span className="text-[10px] font-medium">History</span>
        </button>
        <div className="relative -top-6">
          <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-200 text-white cursor-pointer hover:bg-blue-700 hover:scale-105 transition-all">
            <Wallet className="w-6 h-6" />
          </div>
        </div>
        <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600">
          <Bell className="w-6 h-6" />
          <span className="text-[10px] font-medium">Alerts</span>
        </button>
        <button onClick={() => {
            setUser(null);
            navigate('/login');
          }} className="flex flex-col items-center gap-1 text-gray-400 hover:text-red-500">
          <UserIcon className="w-6 h-6" />
          <span className="text-[10px] font-medium">Logout</span>
        </button>
      </div>

      {/* Success Popup */}
      {showSuccessDialog && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Success</h3>
            <p className="text-gray-500 text-sm mb-6">Your account successfully updated, please wait some time.</p>
            <button onClick={handleSuccessClose} className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-blue-700 transition-colors">
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Video Popup */}
      {showVideoPopup && appState?.settings.videoUrl && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-black rounded-2xl overflow-hidden w-full max-w-sm relative shadow-2xl border border-gray-800">
            <button onClick={handleVideoClose} className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-black text-white rounded-full flex items-center justify-center z-10 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <video 
              src={appState.settings.videoUrl} 
              className="w-full aspect-video bg-gray-900" 
              autoPlay 
              loop 
              muted 
              playsInline
            />
            <div className="p-4 bg-gray-900 border-t border-gray-800">
              <button onClick={handleVideoClose} className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-blue-700 transition-colors">
                Complete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Telegram Popup */}
      {showTelegramPopup && appState?.settings.telegramUrl && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl relative">
            <button onClick={handleTelegramClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 bg-[#0088cc]/10 text-[#0088cc] rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 ml-1" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Join our Telegram</h3>
            <p className="text-gray-500 text-sm mb-6">Get latest updates, offers and priority support on our official channel.</p>
            <a 
              href={appState.settings.telegramUrl} 
              target="_blank" 
              rel="noreferrer"
              onClick={handleTelegramClose}
              className="block w-full bg-[#0088cc] text-white font-medium py-3 rounded-xl hover:bg-[#0077b3] transition-colors shadow-lg shadow-[#0088cc]/20"
            >
              Join Channel
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
