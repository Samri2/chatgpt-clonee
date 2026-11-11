import { Bot } from 'lucide-react';
import ChatMessage from '../ChatMessage/ChatMessage';
import { suggestions } from '../../data/mockChats';
import styles from './MessageList.module.css';

export default function MessageList({
  conversations,
  isLoading,
  messagesEndRef,
  notice,
  onSuggestion,
}) {
  return (
    <div className={styles.messages}>
      {notice && <div className={styles.notice}>{notice}</div>}

      {conversations.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyTitle}>What are you working on?</div>
          <div className={styles.suggestions}>
            {suggestions.map(text => (
              <button
                key={text}
                className={styles.suggestion}
                onClick={() => onSuggestion(text)}
                disabled={isLoading}
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      ) : (
        conversations.map(msg => (
          <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
        ))
      )}

      {isLoading && (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingAvatar}>
            <Bot size={18} color='white' />
          </div>
          <div className={styles.loading}>
            <div className={styles.loadingDot}></div>
            <div className={styles.loadingDot}></div>
            <div className={styles.loadingDot}></div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
