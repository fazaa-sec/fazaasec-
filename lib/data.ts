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
export const PROJECTS: Project[] = [
  {
    name: 'SCO Detections Lab',
    stack: ['KQL', 'Azure Sentinel', 'MITRE ATT&CK'],
    description: 'Detection lab for SOC',
    status: 'Secured',
    repo: GITHUB_URL,
  },
  {
    name: 'AI SOC Copilot',
    stack: ['AI', 'SOC', 'Python'],
    description: 'AI assistant for SOC analysts',
    status: 'Secured',
    repo: GITHUB_URL,
  },
  {
    name: 'Threat Intel Portfolio',
    stack: ['Threat Intel', 'YARA', 'MITRE'],
    description: 'Reports and YARA rules',
    status: 'Secured',
    repo: GITHUB_URL,
  },
  {
    name: 'LockBit 3.0 TTP Analysis',
    stack: ['MITRE ATT&CK', 'Ransomware'],
    description: 'Full TTP breakdown',
    status: 'Secured',
    repo: GITHUB_URL,
  },
  {
    name: 'Linux PrivEsc Lab - RHEL',
    stack: ['Linux', 'RHEL', 'PrivEsc'],
    description: 'Hands-on privilege escalation lab',
    status: 'Secured',
    repo: GITHUB_URL,
  },
  {
    name: 'Detect Encoded PowerShell',
    stack: ['KQL', 'Sentinel'],
    description: 'KQL detection for encoded PowerShell',
    status: 'Secured',
    repo: GITHUB_URL,
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
    name: 'SIM Guardian',
    stack: ['Kotlin', 'Android', 'Security'],
    description: PRIVATE_NOTE,
    status: 'Private',
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
