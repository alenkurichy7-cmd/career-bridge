import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Home,
  Compass,
  BarChart2,
  Briefcase,
  User
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { role, activeTab, setActiveTab } = useApp();

  if (role !== 'student') return null;

  const isHome = activeTab === 'home' || activeTab === 'dashboard';
  const isCareer = activeTab === 'career' || activeTab === 'assessment';
  const isSkills = activeTab === 'skills';
  const isOpportunities = activeTab === 'opportunities';
  const isProfile = activeTab === 'profile';

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg md:hidden">
      <div className="flex items-center justify-around h-16 px-2 max-w-lg mx-auto">
        {/* Home */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center flex-1 py-1.5 transition-colors cursor-pointer ${
            isHome ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Home className={`w-5 h-5 mb-0.5 ${isHome ? 'stroke-[2.5px]' : 'stroke-[1.75px]'}`} />
          <span className="text-[11px] tracking-tight">Home</span>
        </button>

        {/* Career */}
        <button
          onClick={() => setActiveTab('career')}
          className={`flex flex-col items-center justify-center flex-1 py-1.5 transition-colors cursor-pointer ${
            isCareer ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Compass className={`w-5 h-5 mb-0.5 ${isCareer ? 'stroke-[2.5px]' : 'stroke-[1.75px]'}`} />
          <span className="text-[11px] tracking-tight">Career</span>
        </button>

        {/* Skills */}
        <button
          onClick={() => setActiveTab('skills')}
          className={`flex flex-col items-center justify-center flex-1 py-1.5 transition-colors cursor-pointer ${
            isSkills ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <BarChart2 className={`w-5 h-5 mb-0.5 ${isSkills ? 'stroke-[2.5px]' : 'stroke-[1.75px]'}`} />
          <span className="text-[11px] tracking-tight">Skills</span>
        </button>

        {/* Opportunities */}
        <button
          onClick={() => setActiveTab('opportunities')}
          className={`flex flex-col items-center justify-center flex-1 py-1.5 transition-colors cursor-pointer ${
            isOpportunities ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Briefcase className={`w-5 h-5 mb-0.5 ${isOpportunities ? 'stroke-[2.5px]' : 'stroke-[1.75px]'}`} />
          <span className="text-[11px] tracking-tight">Opportunities</span>
        </button>

        {/* Profile */}
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center flex-1 py-1.5 transition-colors cursor-pointer ${
            isProfile ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <User className={`w-5 h-5 mb-0.5 ${isProfile ? 'stroke-[2.5px]' : 'stroke-[1.75px]'}`} />
          <span className="text-[11px] tracking-tight">Profile</span>
        </button>
      </div>
    </nav>
  );
};
