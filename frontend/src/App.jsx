import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar/Sidebar';
import ChatHeader from './components/ChatHeader/ChatHeader';
import MessageList from './components/MessageList/MessageList';
import ChatInput from './components/ChatInput/ChatInput';
import FeatureView from './components/FeatureView/FeatureView';
import { mockChats } from './data/mockChats';
import { features } from './data/features';
import './App.css';

const API_BASE_URL = 'http://localhost:3777/api';

function App() {
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // 'live' = your real chat saved in MySQL; 'm1'... = sample chats (mock data)
  const [activeId, setActiveId] = useState('live');
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const messagesEndRef = useRef(null);

  const activeMock = mockChats.find(c => c.id === activeId);
  const activeFeature = features[activeId]; // Images, Scheduled, Library, Plugins, Explore
  const shownMessages = activeMock ? activeMock.messages : conversations;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [shownMessages, isLoading]);

  const fetchConversations = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/chat/conversations`);
      if (response.data.success) {
        setConversations(response.data.data.conversations);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const handleSendMessage = async question => {
    // Sending from a sample chat continues in the real (saved) chat
    setActiveId('live');

    // Optimistically add user message
    const tempUserMessage = {
      id: Date.now(),
      role: 'user',
      content: question,
    };
    setConversations(prev => [...prev, tempUserMessage]);
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/chat/conversations`, {
        question,
      });
      if (response.data.success) {
        const { userConversation, assistantConversation } = response.data.data;
        // Replace temp message with real ones
        setConversations(prev => {
          const filtered = prev.filter(msg => msg.id !== tempUserMessage.id);
          return [...filtered, userConversation, assistantConversation];
        });
      }
    } catch (error) {
      console.error('Error posting conversation:', error);

      // Extract error message from backend response or use a realistic fallback
      const errorMessage =
        error.response?.data?.message ||
        'There was an error generating a response.';

      // Add error message to chat
      const errorConversation = {
        id: Date.now() + 1,
        role: 'assistant',
        content: errorMessage,
      };

      setConversations(prev => [...prev, errorConversation]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='app'>
      <Sidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(o => !o)}
        chats={mockChats}
        activeId={activeId}
        onSelect={setActiveId}
        onNewChat={() => setActiveId('live')}
      />

      <main className='chat'>
        <ChatHeader
          title={
            activeFeature
              ? activeFeature.label
              : activeMock
                ? activeMock.title
                : 'ChatGPT'
          }
        />

        {activeFeature ? (
          <FeatureView
            feature={activeId}
            label={activeFeature.label}
            onStartChat={handleSendMessage}
          />
        ) : (
          <>
            <MessageList
              conversations={shownMessages}
              isLoading={isLoading}
              messagesEndRef={messagesEndRef}
              notice={
                activeMock
                  ? 'Sample conversation. Send a message to continue in your saved chat.'
                  : null
              }
              onSuggestion={handleSendMessage}
            />

            <ChatInput
              handleSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
