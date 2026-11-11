// Sidebar sections shown in the main area (mock data, not stored in the database)
export const features = {
  images: { label: 'Images' },
  scheduled: { label: 'Scheduled' },
  library: { label: 'Library' },
  plugins: { label: 'Plugins' },
  explore: { label: 'Explore' },
};

export const mockImages = [
  { id: 1, prompt: 'Logo for a coding bootcamp', from: '#10a37f', to: '#3b82f6' },
  { id: 2, prompt: 'Futuristic server room', from: '#6366f1', to: '#ec4899' },
  { id: 3, prompt: 'Cat typing JavaScript', from: '#f59e0b', to: '#ef4444' },
  { id: 4, prompt: 'Database diagram, neon style', from: '#14b8a6', to: '#8b5cf6' },
  { id: 5, prompt: 'Rocket launching from a laptop', from: '#3b82f6', to: '#06b6d4' },
  { id: 6, prompt: 'Developer desk at night', from: '#475569', to: '#0ea5e9' },
];

export const mockTasks = [
  { id: 1, title: 'Daily JavaScript tip', when: 'Every day, 9:00 AM', on: true },
  { id: 2, title: 'Weekly Git commands recap', when: 'Mondays, 8:00 AM', on: true },
  { id: 3, title: 'Remind me to review pull requests', when: 'Weekdays, 3:00 PM', on: false },
];

export const mockFiles = [
  { id: 1, name: 'server.js', type: 'Code', size: '1 KB' },
  { id: 2, name: 'schema.sql', type: 'Code', size: '1 KB' },
  { id: 3, name: 'chatController.js', type: 'Code', size: '3 KB' },
  { id: 4, name: 'Project plan.md', type: 'Docs', size: '2 KB' },
  { id: 5, name: 'Presentation notes.md', type: 'Docs', size: '5 KB' },
  { id: 6, name: 'API contract.md', type: 'Docs', size: '1 KB' },
];

export const mockPlugins = [
  { id: 1, name: 'GitHub', desc: 'Browse repos and pull requests', installed: true },
  { id: 2, name: 'Docker', desc: 'Manage containers and images', installed: false },
  { id: 3, name: 'Postman', desc: 'Run and save API requests', installed: false },
  { id: 4, name: 'MySQL', desc: 'Query your databases', installed: true },
  { id: 5, name: 'Figma', desc: 'Inspect designs and assets', installed: false },
  { id: 6, name: 'Slack', desc: 'Share answers with your team', installed: false },
];

export const mockExplore = [
  { id: 1, name: 'Code Reviewer', desc: 'Finds bugs and suggests cleaner code', prompt: 'Review this JavaScript for bugs: function add(a, b) { return a - b }' },
  { id: 2, name: 'SQL Helper', desc: 'Turns plain English into SQL', prompt: 'Write a SQL query to get the 5 most recent orders per customer' },
  { id: 3, name: 'Regex Builder', desc: 'Builds and explains regex patterns', prompt: 'Write a regex that validates an email address and explain it' },
  { id: 4, name: 'Interview Coach', desc: 'Practice technical interview questions', prompt: 'Ask me a junior JavaScript interview question and wait for my answer' },
];
