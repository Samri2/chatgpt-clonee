import { useState } from 'react';
import { Plus, Trash2, Check, FileCode, FileText, Download } from 'lucide-react';
import {
  mockImages,
  mockTasks,
  mockFiles,
  mockPlugins,
  mockExplore,
} from '../../data/features';
import styles from './FeatureView.module.css';

function Images() {
  const [liked, setLiked] = useState({});
  return (
    <div className={styles.grid}>
      {mockImages.map(img => (
        <button
          key={img.id}
          className={styles.tile}
          style={{ background: `linear-gradient(135deg, ${img.from}, ${img.to})` }}
          onClick={() => setLiked(l => ({ ...l, [img.id]: !l[img.id] }))}
          title='Click to like'
        >
          <span className={styles.heart}>{liked[img.id] ? '♥' : '♡'}</span>
          <span className={styles.caption}>{img.prompt}</span>
        </button>
      ))}
    </div>
  );
}

function Scheduled() {
  const [tasks, setTasks] = useState(mockTasks);
  const [title, setTitle] = useState('');

  const add = e => {
    e.preventDefault();
    if (!title.trim()) return;
    setTasks(t => [...t, { id: Date.now(), title: title.trim(), when: 'Every day, 10:00 AM', on: true }]);
    setTitle('');
  };

  return (
    <>
      <form className={styles.addRow} onSubmit={add}>
        <input
          className={styles.field}
          placeholder='New scheduled task, e.g. Daily SQL tip'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button className={styles.primary} type='submit'>
          <Plus size={16} /> Add
        </button>
      </form>
      <div className={styles.list}>
        {tasks.map(task => (
          <div key={task.id} className={styles.row}>
            <div className={styles.rowText}>
              <strong>{task.title}</strong>
              <span>{task.when}</span>
            </div>
            <button
              className={`${styles.switch} ${task.on ? styles.on : ''}`}
              onClick={() => setTasks(t => t.map(x => (x.id === task.id ? { ...x, on: !x.on } : x)))}
              aria-label='Toggle task'
            >
              <span />
            </button>
            <button
              className={styles.ghost}
              onClick={() => setTasks(t => t.filter(x => x.id !== task.id))}
              aria-label='Delete task'
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {tasks.length === 0 && <p className={styles.muted}>No scheduled tasks yet.</p>}
      </div>
    </>
  );
}

function LibraryView() {
  const [filter, setFilter] = useState('All');
  const files = mockFiles.filter(f => filter === 'All' || f.type === filter);
  return (
    <>
      <div className={styles.tabs}>
        {['All', 'Code', 'Docs'].map(t => (
          <button
            key={t}
            className={`${styles.tab} ${filter === t ? styles.tabActive : ''}`}
            onClick={() => setFilter(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className={styles.list}>
        {files.map(f => (
          <div key={f.id} className={styles.row}>
            {f.type === 'Code' ? <FileCode size={20} /> : <FileText size={20} />}
            <div className={styles.rowText}>
              <strong>{f.name}</strong>
              <span>{f.type} · {f.size}</span>
            </div>
            <button className={styles.ghost} aria-label='Download'>
              <Download size={16} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

function Plugins() {
  const [items, setItems] = useState(mockPlugins);
  return (
    <div className={styles.cards}>
      {items.map(p => (
        <div key={p.id} className={styles.card}>
          <strong>{p.name}</strong>
          <span>{p.desc}</span>
          <button
            className={p.installed ? styles.secondary : styles.primary}
            onClick={() => setItems(list => list.map(x => (x.id === p.id ? { ...x, installed: !x.installed } : x)))}
          >
            {p.installed ? (<><Check size={14} /> Installed</>) : 'Install'}
          </button>
        </div>
      ))}
    </div>
  );
}

function Explore({ onStartChat }) {
  return (
    <div className={styles.cards}>
      {mockExplore.map(a => (
        <div key={a.id} className={styles.card}>
          <strong>{a.name}</strong>
          <span>{a.desc}</span>
          <button className={styles.primary} onClick={() => onStartChat(a.prompt)}>
            Try it
          </button>
        </div>
      ))}
    </div>
  );
}

const intro = {
  images: 'Your generated images (sample gallery).',
  scheduled: 'Tasks that run automatically (sample data).',
  library: 'Files and code you saved (sample data).',
  plugins: 'Connect tools to your assistant (sample data).',
  explore: 'Ready-made assistants. "Try it" sends a real question to your AI.',
};

export default function FeatureView({ feature, label, onStartChat }) {
  return (
    <div className={styles.view}>
      <div className={styles.inner}>
        <h1 className={styles.title}>{label}</h1>
        <p className={styles.muted}>{intro[feature]}</p>
        {feature === 'images' && <Images />}
        {feature === 'scheduled' && <Scheduled />}
        {feature === 'library' && <LibraryView />}
        {feature === 'plugins' && <Plugins />}
        {feature === 'explore' && <Explore onStartChat={onStartChat} />}
      </div>
    </div>
  );
}
