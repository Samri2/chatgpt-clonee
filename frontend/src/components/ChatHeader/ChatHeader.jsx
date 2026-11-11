import { ChevronDown } from 'lucide-react';
import styles from './ChatHeader.module.css';

export default function ChatHeader({ title = 'ChatGPT' }) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <span>{title}</span>
        <ChevronDown size={16} />
      </div>
      <div className={styles.right}>
        <div className={styles.avatar}>IT</div>
      </div>
    </header>
  );
}
