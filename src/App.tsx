import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { BottomNav } from './components/layout/BottomNav';
import { ToastContainer } from './components/common/ToastContainer';
import { StudentDashboard } from './components/student/StudentDashboard';
import { CareerAssessmentView } from './components/student/CareerAssessmentView';
import { SkillGapView } from './components/student/SkillGapView';
import { LearningDashboard } from './components/student/LearningDashboard';
import { OpportunitiesView } from './components/student/OpportunitiesView';
import { PlacementPrepView } from './components/student/PlacementPrepView';
import { StudentProfileView } from './components/student/StudentProfileView';
import { CollegeDashboard } from './components/college/CollegeDashboard';
import { EmployerDashboard } from './components/employer/EmployerDashboard';

const MainContent: React.FC = () => {
  const { userRole, activeTab } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 md:pb-12">
        {userRole === 'college' ? (
          <CollegeDashboard />
        ) : userRole === 'employer' ? (
          <EmployerDashboard />
        ) : (
          /* Student Role with Tab Routing */
          <>
            {(activeTab === 'home' || activeTab === 'dashboard') && <StudentDashboard />}
            {(activeTab === 'career' || activeTab === 'assessment') && <CareerAssessmentView />}
            {activeTab === 'skills' && <SkillGapView />}
            {activeTab === 'courses' && <LearningDashboard />}
            {activeTab === 'opportunities' && <OpportunitiesView />}
            {activeTab === 'prep' && <PlacementPrepView />}
            {activeTab === 'profile' && <StudentProfileView />}
          </>
        )}
      </main>

      {/* Mobile Bottom Navigation (only shown on student role for phone views) */}
      {userRole === 'student' && <BottomNav />}

      {/* Global Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
