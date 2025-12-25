export interface Student {
  id: string;
  name: string;
  avatar?: string;
  program: string;
  targetIntake: string;
  cbseGoal: string;
  lnatTarget: string;
  currentStage: string;
  completionPercentage: number;
}

export interface University {
  id: string;
  name: string;
  logo?: string;
  location: string;
  country: string;
  category: 'aspirational' | 'reach' | 'safety';
  program: string;
  cbseRequirement?: string;
  lnatRequired?: boolean;
  lnatNote?: string;
  description: string;
  fitNote: string;
  officialLink?: string;
  mentorLink?: string;
  mentorLinkText?: string;
  applicationFee?: string;
  programmeFee?: string;
  annualCostOfLiving?: string;
  scholarships?: string;
}

export interface Mentor {
  id: string;
  name: string;
  initials: string;
  avatar?: string;
  university: string;
  program: string;
  year: string;
  specializations: string[];
  description: string;
  ctaText: string;
  ctaLink: string;
}

export interface Scholarship {
  id: string;
  name: string;
  university: string;
  description: string;
  keyFit: string;
  officialLink: string;
  mentorLink?: string;
  mentorLinkText?: string;
}

export interface TimelinePhase {
  id: string;
  phase: string;
  title: string;
  dateRange: string;
  description?: string;
  tasks: TimelineTask[];
  chips?: string[];
}

export interface TimelineTask {
  text: string;
  mentorLink?: string;
  mentorLinkText?: string;
  chatIntent?: string;
  chatIntentText?: string;
  isBold?: boolean;
}

export interface PortfolioItem {
  text: string;
  marker: 'mandatory' | 'recommended' | 'optional' | 'bonus';
}

export interface HowToGuide {
  title: string;
  description?: string;
}

export interface ExecutiveStat {
  label: string;
  value: string;
  description: string;
  mentorLink?: string;
  mentorLinkText?: string;
}

export interface ReportSection {
  id: string;
  title: string;
  icon: string;
  description?: string;
  status: 'complete' | 'in-progress' | 'pending';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  pendingChanges?: PendingChange[];
}

export interface PendingChange {
  id: string;
  section: string;
  field: string;
  oldValue: string;
  newValue: string;
  status: 'pending' | 'accepted' | 'rejected';
}
