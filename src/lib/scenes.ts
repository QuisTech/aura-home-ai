export interface Scene {
  id: string;
  name: string;
  route: '/' | '/command';
  duration: number;
  description: string;
  cursorSelector?: string;
}

export const AURA_SCENES: Scene[] = [
  {
    id: 'hero',
    name: 'Zen Portal Entry',
    route: '/',
    duration: 18000,
    description: 'Welcome to Aura Home AI. Displays visual bedroom/exterior carousel and launch console triggers.',
    cursorSelector: 'a[href="/command"]'
  },
  {
    id: 'zen-scrolled',
    name: 'Seven Pillars Architecture',
    route: '/',
    duration: 15000,
    description: 'Scroll reveal showing the Sensor. Reason. Resolve. logic pipeline and Seven Pillars.',
    cursorSelector: 'a[href="/command"]'
  },
  {
    id: 'dashboard-initial',
    name: 'Command Console Entrance',
    route: '/command',
    duration: 15000,
    description: 'Entered the home autonomous command console showing live diagnostics.'
  },
  {
    id: 'finance-sentinel',
    name: 'Finance Sentinel',
    route: '/command',
    duration: 16000,
    description: 'Walkthrough: Finance Sentinel audits subscription leaks.',
    cursorSelector: '#agent-card-fin'
  },
  {
    id: 'guardian-protocol',
    name: 'Guardian Protocol',
    route: '/command',
    duration: 16000,
    description: 'Walkthrough: Guardian Protocol manages home security.',
    cursorSelector: '#agent-card-grd'
  },
  {
    id: 'pantry-architect',
    name: 'Pantry Architect',
    route: '/command',
    duration: 16000,
    description: 'Walkthrough: Pantry Architect tracks stock and prices.',
    cursorSelector: '#agent-card-pntry'
  },
  {
    id: 'energy-optimizer',
    name: 'Energy Optimizer',
    route: '/command',
    duration: 16000,
    description: 'Walkthrough: Energy Optimizer balances HVAC load.',
    cursorSelector: '#agent-card-nrgy'
  },
  {
    id: 'wellness-advisor',
    name: 'Wellness Advisor',
    route: '/command',
    duration: 16000,
    description: 'Walkthrough: Wellness Advisor monitors indoor comfort.',
    cursorSelector: '#agent-card-wlns'
  },
  {
    id: 'surveillance-view',
    name: 'Vision Advisor',
    route: '/command',
    duration: 18000,
    description: 'Walkthrough: Vision Advisor tracks perimeter courier activity.',
    cursorSelector: '#agent-card-vis'
  },
  {
    id: 'entering-query',
    name: 'Autonomous Agentic Audit',
    route: '/command',
    duration: 24000,
    description: 'Executing autonomous household expense audit on the Finance Sentinel.',
    cursorSelector: '#trigger-audit-btn'
  }
];
