import { useState } from 'react';
import { User, Bot, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './ChatMessage.module.css';

function CopyButton({ text, label }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  return (
    <button className={styles.copyBtn} onClick={copy} title='Copy'>
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {label && <span>{copied ? 'Copied' : label}</span>}
    </button>
  );
}

// Replaces the default <pre> so fenced code gets highlighting + a copy button
function CodeBlock({ children }) {
  const codeEl = Array.isArray(children) ? children[0] : children;
  const className = codeEl?.props?.className || '';
  const lang = /language-(\w+)/.exec(className)?.[1] || 'text';
  const text = String(codeEl?.props?.children ?? '').replace(/\n$/, '');

  return (
    <div className={styles.codeBlock}>
      <div className={styles.codeHeader}>
        <span>{lang}</span>
        <CopyButton text={text} label='Copy code' />
      </div>
      <SyntaxHighlighter
        language={lang}
        style={vscDarkPlus}
        customStyle={{ margin: 0, borderRadius: '0 0 8px 8px', fontSize: 13 }}
      >
        {text}
      </SyntaxHighlighter>
    </div>
  );
}

export default function ChatMessage({ role, content }) {
  return (
    <div className={`${styles.message} ${styles[role]}`}>
      <div className={`${styles.avatar} ${styles[role]}`}>
        {role === 'user' ? (
          <User size={18} color='white' />
        ) : (
          <Bot size={18} color='white' />
        )}
      </div>
      <div className={styles.content}>
        {role === 'user' ? (
          content
        ) : (
          <>
            <div className={styles.markdownBody}>
              <ReactMarkdown components={{ pre: CodeBlock }}>
                {content}
              </ReactMarkdown>
            </div>
            <div className={styles.actions}>
              <CopyButton text={content} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
