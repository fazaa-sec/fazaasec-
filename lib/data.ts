import { GITHUB_URL } from './site';

export const SERVICE_OPTIONS = ['Audit', 'Build', 'Secure'] as const;
export type ServiceId = (typeof SERVICE_OPTIONS)[number];

export type ServiceItem = {
  id: ServiceId;
  title: string;
  tag?: string;
  price: string;
  description: string;
  icon: 'search' | 'tool' | 'lock';
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'Audit',
    title: 'Audit',
    tag: '48h',
    price: 'From $149',
    description: 'Full security audit in 48 hours: RLS, IDOR, Exposed Keys + PDF Report',
    icon: 'search',
  },
  {
    id: 'Build',
    title: 'Build',
    price: 'From $500',
    description:
      'Build website / app from zero to launch, built right and secured from day one',
    icon: 'tool',
  },
  {
    id: 'Secure',
    title: 'Secure',
    tag: 'Monthly',
    price: 'From $199/mo',
    description: 'Monthly protection: Monitoring + Updates + Monthly Report',
    icon: 'lock',
  },
];

export type ProjectStatus = 'Secured' | 'Built' | 'Private';

export type Project = {
  name: string;
  stack: string[];
  description: string;
  status: ProjectStatus;
  /** Public repo link. Private projects never have one. */
  repo?: string;
};

const PRIVATE_NOTE = 'Private Project - Details on request';

// TODO: replace `repo` with each project's exact repository URL once you want deep links.
// Until then the public projects link to your GitHub profile.
  {
    name: 'Threat Intel Portfolio',
    stack: ['Threat Intel', 'Analysis'],
    description: 'Threat Intelligence portfolio - analysis and reports',
    status: 'Built',
    repo: 'https://github.com/fazaa-sec/Threat-Intel-Portfolio',
  },
  {
    name: 'LockBit 3.0 TTP Analysis',
    stack: ['Malware', 'TTPs'],
    description: 'Analysis of LockBit 3.0 Tactics, Techniques and Procedures',
    status: 'Built',
    repo: 'https://github.com/fazaa-sec/LockBit-3.0-TTP-Analysis-',
  },
  {
    name: 'AI SOC Copilot',
    stack: ['AI', 'SOC'],
    description: 'AI assistant for Security Operations Center',
    status: 'Built',
    repo: 'https://github.com/fazaa-sec/AI-SOC-Copilot',
  },
  {
    name: 'SCO Detections Lab',
    stack: ['Sigma', 'KQL'],
    description: 'Detection engineering lab - Sigma / KQL detections',
    status: 'Built',
    repo: 'https://github.com/fazaa-sec/SCO-Detections-Lab',
  },
  {
    name: 'SIM Guardian Telegram',
    stack: ['Python', 'Telegram Bot'],
    description: 'Telegram bot for SIM protection and security alerts',
    status: 'Built',
    repo: 'https://github.com/fazaa123-spec/sim-guardian-telegram',
  },
  {
    name: 'Jobs Platform',
    stack: ['Next.js', 'Web'],
    description: 'Jobs platform - live web app',
    status: 'Built',
    repo: 'https://jobs3-sable.vercel.app',
  },
  {
    name: 'E3maar App',
    stack: ['Dart', 'Flutter'],
    description: 'Real estate app',
    status: 'Built',
    repo: GITHUB_URL,
  },
  {
    name: 'Sudan Jobs Bot',
    stack: ['Python', 'Telegram Bot'],
    description: 'Bot that posts Sudan jobs automatically',
    status: 'Built',
    repo: GITHUB_URL,
  },
  {
    name: 'Eagle',
    stack: ['CSS', 'Web'],
    description: PRIVATE_NOTE,
    status: 'Private',
  },
  {
    name: 'AhlalNeil',
    stack: ['Web'],
    description: PRIVATE_NOTE,
    status: 'Private',
  },
  {
    name: 'Jobs3',
    stack: ['HTML', 'Web'],
    description: PRIVATE_NOTE,
    status: 'Private',
  },
];
