import { useState } from 'react';
import {
  MessageSquare,
  SquarePen,
  Images,
  Clock,
  Library,
  AtSign,
  Ellipsis,
  Search,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from 'lucide-react';
import styles from './Sidebar.module.css';

const navItems = [
  { key: 'images', label: 'Images', Icon: Images },
  { key: 'scheduled', label: 'Scheduled', Icon: Clock },
  { key: 'library', label: 'Library', Icon: Library },
  { key: 'plugins', label: 'Plugins', Icon: AtSign },
  { key: 'explore', label: 'Explore', Icon: Ellipsis },
];

export default function Sidebar({
  open,
  onToggle,
  chats,
  activeId,
  onSelect,
  onNewChat,
}) {
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();
  const filtered = q
    ? chats.filter(c => c.title.toLowerCase().includes(q))
    : chats;
  const groups = [...new Set(filtered.map(c => c.group))];

  const closeSearch = () => {
    setSearching(false);
    setQuery('');
  };

  return (
    <aside className={`${styles.sidebar} ${open ? '' : styles.collapsed}`}>
      <div className={styles.header}>
        {open && <span className={styles.brand}>ChatGPT</span>}
        <div className={styles.headerActions}>
          {open && (
            <button
              className={styles.iconBtn}
              onClick={() => setSearching(s => !s)}
              title='Search chats'
            >
              <Search size={20} />
            </button>
          )}
          <button
            className={styles.iconBtn}
            onClick={onToggle}
            title={open ? 'Close sidebar' : 'Open sidebar'}
          >
            {open ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
          </button>
        </div>
      </div>

      {searching && open && (
        <div className={styles.searchBox}>
          <Search size={16} />
          <input
            autoFocus
            className={styles.searchInput}
            placeholder='Search chats'
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Escape' && closeSearch()}
          />
          <button className={styles.iconBtn} onClick={closeSearch}>
            <X size={16} />
          </button>
        </div>
      )}

      <nav className={styles.nav}>
        <button
          className={`${styles.item} ${activeId === 'live' ? styles.active : ''}`}
          onClick={onNewChat}
          title='New chat'
        >
          <SquarePen size={18} />
          <span className={styles.label}>New chat</span>
        </button>

        {navItems.map(item => {
          const Icon = item.Icon;
          return (
            <button
              key={item.key}
              className={`${styles.item} ${activeId === item.key ? styles.active : ''}`}
              onClick={() => onSelect(item.key)}
              title={item.label}
            >
              <Icon size={18} />
              <span className={styles.label}>{item.label}</span>
            </button>
          );
        })}

        {open && (
          <div className={styles.history}>
            {filtered.length === 0 && (
              <p className={styles.noResults}>No chats found</p>
            )}
            {groups.map(group => (
              <div key={group}>
                <p className={styles.groupTitle}>{group}</p>
                {filtered
                  .filter(c => c.group === group)
                  .map(chat => (
                    <button
                      key={chat.id}
                      className={`${styles.item} ${activeId === chat.id ? styles.active : ''}`}
                      onClick={() => onSelect(chat.id)}
                    >
                      <MessageSquare size={16} />
                      <span className={styles.chatTitle}>{chat.title}</span>
                    </button>
                  ))}
              </div>
            ))}
          </div>
        )}
      </nav>
    </aside>
  );
}
