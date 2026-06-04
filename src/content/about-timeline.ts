import { aboutPage } from './company-pages';

export type AboutTimelineItem = {
  title: string;
  description: string;
  category: string;
  status: 'completed' | 'current' | 'upcoming';
};

export const aboutTimelineItems: AboutTimelineItem[] = [
  {
    title: 'Our mission',
    description: aboutPage.mission.join(' '),
    category: 'Mission',
    status: 'completed',
  },
  {
    title: 'What we build',
    description: aboutPage.whatWeBuild.join(' '),
    category: 'Products',
    status: 'completed',
  },
  {
    title: aboutPage.values[0].title,
    description: aboutPage.values[0].body,
    category: 'Privacy commitment',
    status: 'completed',
  },
  {
    title: aboutPage.values[1].title,
    description: aboutPage.values[1].body,
    category: 'What we believe',
    status: 'completed',
  },
  {
    title: 'Formula verification',
    description: aboutPage.editorial[1],
    category: 'Editorial standards',
    status: 'completed',
  },
  {
    title: 'Accuracy checks',
    description: aboutPage.editorial[2],
    category: 'Editorial standards',
    status: 'completed',
  },
  {
    title: 'How we verify calculations',
    description: aboutPage.verification,
    category: 'Editorial standards',
    status: 'completed',
  },
  {
    title: 'Transparency',
    description: aboutPage.transparency,
    category: 'Legal',
    status: 'current',
  },
  {
    title: 'Explore our tools',
    description:
      'Browse the full calculator directory for SIP, CAGR, lumpsum, EMI, and GST tools — plus investing, loan, and tax hubs.',
    category: 'Get started',
    status: 'current',
  },
  {
    title: 'Educational disclaimer',
    description:
      'Outputs are educational estimates, not financial, tax, or legal advice. Verify figures with a qualified professional before making decisions.',
    category: 'Legal',
    status: 'upcoming',
  },
];
