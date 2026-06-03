import {
  AlertCircle,
  BookOpen,
  Calculator,
  FileCheck,
  Shield,
  Sparkles,
  Target,
  Unlock,
} from 'lucide-react';

import { aboutPage } from './company-pages';
import type { TimelineItem } from '../components/ui/modern-timeline';

export const aboutTimelineItems: TimelineItem[] = [
  {
    title: 'Our mission',
    description: aboutPage.mission.join(' '),
    category: 'Mission',
    status: 'completed',
    icon: Target,
  },
  {
    title: aboutPage.values[0].title,
    description: aboutPage.values[0].body,
    category: 'What we believe',
    status: 'completed',
    icon: Shield,
  },
  {
    title: aboutPage.values[1].title,
    description: aboutPage.values[1].body,
    category: 'What we believe',
    status: 'completed',
    icon: BookOpen,
  },
  {
    title: aboutPage.values[2].title,
    description: aboutPage.values[2].body,
    category: 'What we believe',
    status: 'current',
    icon: Unlock,
  },
  {
    title: 'Standard formulas',
    description: aboutPage.editorial[0],
    category: 'Editorial standards',
    status: 'completed',
    icon: FileCheck,
  },
  {
    title: 'Timely updates',
    description: aboutPage.editorial[1],
    category: 'Editorial standards',
    status: 'completed',
    icon: Sparkles,
  },
  {
    title: 'Corrections welcome',
    description: aboutPage.editorial[2],
    category: 'Editorial standards',
    status: 'completed',
    icon: FileCheck,
  },
  {
    title: 'Explore our tools',
    description:
      'Browse the full calculator directory for SIP, CAGR, lumpsum, EMI, and GST tools — plus investing, loan, and tax hubs. Use the links below to jump straight to each section.',
    category: 'Get started',
    status: 'current',
    icon: Calculator,
  },
  {
    title: 'Disclaimer',
    description:
      'Outputs are educational estimates, not financial, tax, or legal advice. Verify figures with a qualified professional before making decisions.',
    category: 'Legal',
    status: 'upcoming',
    icon: AlertCircle,
  },
];
