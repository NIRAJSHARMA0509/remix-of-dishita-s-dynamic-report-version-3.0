import { useState } from 'react';
import { MobileHeader } from '@/components/layout/MobileHeader';
import { DynamicBottomNav } from '@/components/layout/DynamicBottomNav';
import { FloatingChatButton } from '@/components/layout/FloatingChatButton';
import { StudentProfileCard } from '@/components/student/StudentProfileCard';
import { UniversityCategoryTabs } from '@/components/universities/UniversityCategoryTabs';
import { UniversityCard } from '@/components/universities/UniversityCard';
import { UniversityCompareList } from '@/components/universities/UniversityCompareList';
import { CompareView } from '@/components/compare/CompareView';
import { ChatDrawer } from '@/components/chat/ChatDrawer';
import { QuickStats, defaultStats } from '@/components/home/QuickStats';
import { YourProgress } from '@/components/home/YourProgress';
import { ExecutiveSummary } from '@/components/home/ExecutiveSummary';
import { TimelinePhaseView } from '@/components/timeline/TimelinePhaseView';
import { PhaseChecklist } from '@/components/timeline/PhaseChecklist';
import { ScholarshipsSection } from '@/components/scholarships/ScholarshipsSection';
import { ChatMentorSection } from '@/components/mentors/ChatMentorSection';
import { ConnectMentorsSection } from '@/components/mentors/ConnectMentorsSection';
import { CreditsSection } from '@/components/mentors/CreditsSection';
import { MentorChatView } from '@/components/mentors/MentorChatView';
import { EssentialReadingSection } from '@/components/resources/EssentialReadingSection';
import { PodcastsSection } from '@/components/resources/PodcastsSection';
import { OnlineCoursesSection } from '@/components/resources/OnlineCoursesSection';
import { useChecklist } from '@/hooks/useChecklist';
import { 
  mockStudent, 
  mockUniversities, 
  mockScholarships,
  executiveStats,
  executiveSummary
} from '@/data/mockData';
import { toast } from '@/components/ui/sonner';
import { MainNavId, SubNavId, NavigationState, ActiveMentor } from '@/types/navigation';

type UniversityCategory = 'aspirational' | 'reach' | 'safety';

const Index = () => {
  const [navState, setNavState] = useState<NavigationState>({ mainNav: 'home', subNav: null });
  const [activeCategory, setActiveCategory] = useState<UniversityCategory>('aspirational');
  const [selectedUniversityIds, setSelectedUniversityIds] = useState<string[]>([]);
  const [showCompareResults, setShowCompareResults] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [activeMentor, setActiveMentor] = useState<ActiveMentor | null>(null);
  
  const { getPhaseChecklist, updateTaskStatus, getProgress } = useChecklist();
  const progress = getProgress();

  const categoryCounts = {
    aspirational: mockUniversities.filter(u => u.category === 'aspirational').length,
    reach: mockUniversities.filter(u => u.category === 'reach').length,
    safety: mockUniversities.filter(u => u.category === 'safety').length,
  };

  const filteredUniversities = mockUniversities.filter(u => u.category === activeCategory);

  const handleUniversitySelect = (id: string) => {
    setSelectedUniversityIds(prev => 
      prev.includes(id) 
        ? prev.filter(x => x !== id) 
        : prev.length < 4 
          ? [...prev, id]
          : (toast.error('Maximum 4 universities can be compared'), prev)
    );
  };

  const handleNavigate = (mainNav: MainNavId, subNav?: SubNavId | null) => {
    // Reset compare selection and results when leaving universities
    if (mainNav !== 'universities') {
      setShowCompareResults(false);
      setSelectedUniversityIds([]);
    } else if (subNav !== 'compare') {
      setShowCompareResults(false);
    }
    
    // Handle "Add New" which opens chat
    if (mainNav === 'universities' && subNav === 'add') {
      setChatOpen(true);
      toast.info('Tell us about a university you want to add');
      return;
    }
    
    setNavState({ mainNav, subNav: subNav ?? null });
  };

  const handleChatIntent = (intent: string) => {
    setChatOpen(true);
    toast.info(`Starting conversation about: ${intent}`);
  };

  const handleAddToCalendar = () => {
    toast.success('Adding tasks to Google Calendar...');
  };

  const handleCompareNow = () => {
    if (selectedUniversityIds.length >= 2) {
      setShowCompareResults(true);
    }
  };

  const getHeaderInfo = () => {
    const { mainNav, subNav } = navState;
    
    switch (mainNav) {
      case 'home':
        return { title: mockStudent.name, subtitle: mockStudent.program };
      case 'universities':
        if (showCompareResults) return { title: 'Compare Results', subtitle: `${selectedUniversityIds.length} universities` };
        if (subNav === 'list') return { title: 'Universities', subtitle: `${mockUniversities.length} shortlisted` };
        if (subNav === 'compare') return { title: 'Compare', subtitle: 'Select universities' };
        if (subNav === 'scholarships') return { title: 'Scholarships', subtitle: 'Financial aid options' };
        return { title: 'Universities', subtitle: '' };
      case 'timeline':
        const phaseNum = subNav?.replace('phase', '') || '1';
        return { title: `Phase ${phaseNum}`, subtitle: 'Timeline' };
      case 'mentors':
        if (subNav === 'connect') return { title: 'Connect with Mentors', subtitle: 'Premium sessions' };
        if (subNav === 'chat-mentor') return { title: 'Chat with Mentors', subtitle: 'FREE first session' };
        if (subNav === 'credits') return { title: 'Buy Credits', subtitle: 'Unlock mentor sessions' };
        return { title: 'Mentors', subtitle: '' };
      case 'mentor-chat':
        return { title: activeMentor?.name || 'Mentor Chat', subtitle: activeMentor?.university || '' };
      case 'resources':
        if (subNav === 'courses') return { title: 'Online Courses', subtitle: 'Gold standard prep' };
        if (subNav === 'reading') return { title: 'Essential Reading', subtitle: 'Must-read books' };
        if (subNav === 'podcasts') return { title: 'Podcasts', subtitle: 'Listen & Learn' };
        return { title: 'Resources', subtitle: '' };
      default:
        return { title: 'Report', subtitle: '' };
    }
  };

  const headerInfo = getHeaderInfo();
  const { mainNav, subNav } = navState;

  const getPhaseIndex = () => {
    if (subNav === 'phase1') return 0;
    if (subNav === 'phase2') return 1;
    if (subNav === 'phase3') return 2;
    if (subNav === 'phase4') return 3;
    return 0;
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <MobileHeader title={headerInfo.title} subtitle={headerInfo.subtitle} />

      <main className="pt-5 pb-4">
        {/* HOME */}
        {mainNav === 'home' && (
          <div className="space-y-5 px-4">
            <StudentProfileCard student={mockStudent} />
            <YourProgress 
              total={progress.total}
              completed={progress.completed}
              inProcess={progress.inProcess}
              yetToStart={progress.yetToStart}
              givenUp={progress.givenUp}
              percentage={progress.percentage}
              onUpdateNow={() => handleNavigate('timeline', 'phase1')}
            />
            <QuickStats stats={defaultStats} />
            <ExecutiveSummary stats={executiveStats} summary={executiveSummary} />
          </div>
        )}

        {/* UNIVERSITIES */}
        {mainNav === 'universities' && (
          <>
            {subNav === 'list' && (
              <div className="space-y-5">
                <UniversityCategoryTabs
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                  counts={categoryCounts}
                />
                <div className="space-y-4 px-4">
                  {filteredUniversities.map((uni) => (
                    <UniversityCard
                      key={uni.id}
                      university={uni}
                      onSelect={handleUniversitySelect}
                      isSelected={selectedUniversityIds.includes(uni.id)}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {subNav === 'compare' && !showCompareResults && (
              <UniversityCompareList
                selectedIds={selectedUniversityIds}
                onToggleSelect={handleUniversitySelect}
                onCompareNow={handleCompareNow}
              />
            )}
            
            {subNav === 'compare' && showCompareResults && (
              <CompareView
                universities={mockUniversities}
                selectedIds={selectedUniversityIds}
                onToggleSelect={handleUniversitySelect}
              />
            )}
            
            {subNav === 'scholarships' && (
              <div className="px-4">
                <ScholarshipsSection 
                  scholarships={mockScholarships}
                  onChatIntent={handleChatIntent}
                />
              </div>
            )}
          </>
        )}

        {/* TIMELINE */}
        {mainNav === 'timeline' && (
          <div className="space-y-4">
            <TimelinePhaseView
              phaseIndex={getPhaseIndex()}
              onAddToCalendar={handleAddToCalendar}
              onChatIntent={handleChatIntent}
            />
            <div className="px-4">
              <PhaseChecklist 
                tasks={getPhaseChecklist(`phase${getPhaseIndex() + 1}`)}
                onUpdateStatus={updateTaskStatus}
              />
            </div>
          </div>
        )}

        {/* MENTORS */}
        {mainNav === 'mentors' && (
          <>
            {subNav === 'connect' && (
              <ConnectMentorsSection 
                onBookMentor={(id) => toast.success(`Booking mentor ${id}...`)}
                onBuyCredits={() => handleNavigate('mentors', 'credits')}
              />
            )}
            {subNav === 'chat-mentor' && (
              <ChatMentorSection onStartChat={(mentor) => {
                setActiveMentor(mentor);
                handleNavigate('mentor-chat');
              }} />
            )}
            {subNav === 'credits' && (
              <CreditsSection />
            )}
          </>
        )}

        {/* MENTOR CHAT VIEW */}
        {mainNav === 'mentor-chat' && activeMentor && (
          <MentorChatView mentor={activeMentor} />
        )}

        {/* RESOURCES */}
        {mainNav === 'resources' && (
          <>
            {subNav === 'courses' && <OnlineCoursesSection />}
            {subNav === 'reading' && <EssentialReadingSection />}
            {subNav === 'podcasts' && <PodcastsSection />}
          </>
        )}
      </main>

      <DynamicBottomNav navState={navState} onNavigate={handleNavigate} />
      {mainNav !== 'mentor-chat' && (
        <FloatingChatButton onClick={() => setChatOpen(true)} hasUnread />
      )}
      <ChatDrawer open={chatOpen} onOpenChange={setChatOpen} />
    </div>
  );
};

export default Index;
