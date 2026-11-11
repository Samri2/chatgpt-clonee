// Sample conversations shown in the sidebar (mock data, not stored in the database)
export const mockChats = [
  {
    id: 'm1',
    title: 'Debounce in React',
    group: 'Today',
    messages: [
      { id: 'm1-1', role: 'user', content: 'How do I debounce an input in React?' },
      {
        id: 'm1-2',
        role: 'assistant',
        content:
          "Debouncing delays an action until the user **stops typing** for a set time.\n\n```javascript\nimport { useEffect, useState } from 'react';\n\nexport function useDebounce(value, delay = 400) {\n  const [debounced, setDebounced] = useState(value);\n\n  useEffect(() => {\n    const id = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(id); // cancel if value changes again\n  }, [value, delay]);\n\n  return debounced;\n}\n```\n\nUse `useDebounce(search)` and run your API call when the debounced value changes.",
      },
    ],
  },
  {
    id: 'm2',
    title: 'SQL JOIN types',
    group: 'Today',
    messages: [
      { id: 'm2-1', role: 'user', content: 'What is the difference between INNER and LEFT JOIN?' },
      {
        id: 'm2-2',
        role: 'assistant',
        content:
          "- **INNER JOIN** returns only rows that match in both tables.\n- **LEFT JOIN** returns all rows from the left table, with `NULL` where there is no match.\n\n```sql\nSELECT u.name, o.total\nFROM users u\nLEFT JOIN orders o ON o.user_id = u.id;\n```\n\nThis lists every user, even those who never ordered.",
      },
    ],
  },
  {
    id: 'm3',
    title: 'Big-O of binary search',
    group: 'Yesterday',
    messages: [
      { id: 'm3-1', role: 'user', content: 'What is the time complexity of binary search?' },
      {
        id: 'm3-2',
        role: 'assistant',
        content:
          'Binary search is **O(log n)**: each step halves the remaining range, so 1,000,000 items need about 20 comparisons. It requires the data to be **sorted**.',
      },
    ],
  },
  {
    id: 'm4',
    title: 'Docker vs virtual machines',
    group: 'Yesterday',
    messages: [
      { id: 'm4-1', role: 'user', content: 'Docker container vs VM?' },
      {
        id: 'm4-2',
        role: 'assistant',
        content:
          'A **VM** runs a full guest OS on virtualized hardware. A **container** shares the host kernel and isolates only the process, so it starts in seconds and uses far less memory.\n\n```bash\ndocker run -d -p 8080:80 nginx\n```',
      },
    ],
  },
  {
    id: 'm5',
    title: 'Git rebase vs merge',
    group: 'Previous 7 days',
    messages: [
      { id: 'm5-1', role: 'user', content: 'When should I rebase instead of merge?' },
      {
        id: 'm5-2',
        role: 'assistant',
        content:
          '**Merge** keeps history exactly as it happened. **Rebase** rewrites your commits on top of another branch for a linear history.\n\nRule of thumb: rebase your *own local* branches, never branches others have pulled.',
      },
    ],
  },
];

export const suggestions = [
  'Explain closures in JavaScript',
  'Write a SQL query to find duplicate emails',
  'REST vs GraphQL: what is the difference?',
  'How do I debug a memory leak in Node.js?',
];
