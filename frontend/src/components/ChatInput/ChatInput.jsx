import { useState, useRef, useEffect } from 'react';
import { Plus, Mic, ArrowUp } from 'lucide-react';
import styles from './ChatInput.module.css';

export default function ChatInput({ handleSendMessage, isLoading }) {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  // Focus on load and again after each answer arrives
  useEffect(() => {
    if (!isLoading) inputRef.current?.focus();
  }, [isLoading]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    handleSendMessage(input.trim());
    setInput('');
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.icon}>
          <Plus size={20} />
        </div>
        <input
          ref={inputRef}
          type='text'
          className={styles.input}
          placeholder='Ask anything'
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={isLoading}
        />
        {input.trim() ? (
          <button
            type='submit'
            className={styles.submitBtn}
            disabled={isLoading}
          >
            <ArrowUp size={18} />
          </button>
        ) : (
          <>
            <div className={styles.icon}>
              <Mic size={20} />
            </div>
          </>
        )}
      </form>
    </div>
  );
}
