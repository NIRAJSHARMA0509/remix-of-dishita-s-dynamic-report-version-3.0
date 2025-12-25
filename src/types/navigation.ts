export type MainNavId = 'home' | 'universities' | 'timeline' | 'mentors' | 'resources' | 'mentor-chat';

export type UniversitiesSubNav = 'list' | 'compare' | 'scholarships' | 'add';
export type TimelineSubNav = 'phase1' | 'phase2' | 'phase3' | 'phase4';
export type MentorsSubNav = 'connect' | 'chat-mentor' | 'credits';
export type ResourcesSubNav = 'reading' | 'podcasts' | 'courses';

export type SubNavId = UniversitiesSubNav | TimelineSubNav | MentorsSubNav | ResourcesSubNav;

export interface NavigationState {
  mainNav: MainNavId;
  subNav: SubNavId | null;
}

export interface ActiveMentor {
  id: string;
  name: string;
  avatar?: string;
  university: string;
}
