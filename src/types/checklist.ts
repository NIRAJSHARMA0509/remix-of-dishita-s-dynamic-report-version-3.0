export type TaskStatus = 'yet-to-start' | 'in-process' | 'completed' | 'given-up';

export interface ChecklistTask {
  id: string;
  text: string;
  status: TaskStatus;
}

export interface PhaseChecklist {
  phaseId: string;
  tasks: ChecklistTask[];
}

// Distributed across 4 phases
export const initialChecklists: PhaseChecklist[] = [
  {
    phaseId: 'phase1',
    tasks: [
      { id: 'p1-1', text: 'Target >90% in Grade 11 exams', status: 'yet-to-start' },
      { id: 'p1-2', text: 'Complete one MOOC (e.g., Harvard\'s "Justice")', status: 'yet-to-start' },
      { id: 'p1-3', text: 'Initiate the "Policy and Justice Forum" at school', status: 'yet-to-start' },
      { id: 'p1-4', text: 'Start structured LNAT prep with timed practice', status: 'yet-to-start' },
      { id: 'p1-5', text: 'Begin research project on Free Speech in India vs. UK', status: 'yet-to-start' },
    ],
  },
  {
    phaseId: 'phase2',
    tasks: [
      { id: 'p2-1', text: 'Secure a summer 2026 internship (dual strategy)', status: 'yet-to-start' },
      { id: 'p2-2', text: 'Participate in a national-level debate/MUN', status: 'yet-to-start' },
      { id: 'p2-3', text: 'Complete the CS50 for Lawyers course', status: 'yet-to-start' },
      { id: 'p2-4', text: 'Finalize UCAS personal statement by Sept 2026', status: 'yet-to-start' },
      { id: 'p2-5', text: 'Draft personal statement around justice & AI narrative', status: 'yet-to-start' },
    ],
  },
  {
    phaseId: 'phase3',
    tasks: [
      { id: 'p3-1', text: 'Take IELTS and aim for 7.5+ overall', status: 'yet-to-start' },
      { id: 'p3-2', text: 'Take LNAT by the required deadlines', status: 'yet-to-start' },
      { id: 'p3-3', text: 'Submit Oxbridge application by Oct 15, 2026', status: 'yet-to-start' },
      { id: 'p3-4', text: 'Prepare for Oxbridge interviews with mock sessions', status: 'yet-to-start' },
      { id: 'p3-5', text: 'Submit remaining UCAS choices (LSE, UCL, KCL)', status: 'yet-to-start' },
    ],
  },
  {
    phaseId: 'phase4',
    tasks: [
      { id: 'p4-1', text: 'Excel in CBSE Class 12 Board Exams', status: 'yet-to-start' },
      { id: 'p4-2', text: 'Apply for scholarships (Reach Oxford, LSE USS, UCL Global)', status: 'yet-to-start' },
      { id: 'p4-3', text: 'Complete 1-2 internships (corporate law + legal aid)', status: 'yet-to-start' },
      { id: 'p4-4', text: 'Complete AI-in-law micro-project and publish article', status: 'yet-to-start' },
      { id: 'p4-5', text: 'Prepare for academic and cultural transition to UK', status: 'yet-to-start' },
    ],
  },
];
