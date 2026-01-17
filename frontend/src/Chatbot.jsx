import { useState, useRef, useEffect } from 'react';
import Layout from "./Layout";
import "./Chatbot.css";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hello! I'm your Legal AI Assistant. How can I help you with IPC/BNS legal analysis today?", 
      sender: 'bot', 
      timestamp: new Date(),
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const legalResponses = [
        `I'm analyzing your query about "${inputValue}". Based on my legal knowledge base, I can provide insights on relevant IPC/BNS sections and interpretations.`,
        `For "${inputValue}", I recommend checking the specific legal provisions and consulting with our comparative analysis feature for detailed IPC-BNS mapping.`,
        `This appears to be a legal query about "${inputValue}". I can help analyze potential charges under IPC and corresponding BNS provisions.`,
        `Analyzing "${inputValue}"... Based on pattern recognition, I can provide legal interpretations and section references.`,
        `Processing your query about "${inputValue}". I can assist with legal analysis, charge predictions, and comparative law insights.`
      ];

      const botResponse = {
        id: messages.length + 2,
        text: legalResponses[Math.floor(Math.random() * legalResponses.length)],
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1200);
  };

  const clearChat = () => {
    setMessages([
      { 
        id: 1, 
        text: "Chat cleared. How can I help you with legal analysis today?", 
        sender: 'bot', 
        timestamp: new Date(),
      }
    ]);
  };

  const uploadFile = () => {
    const fileInput = document.getElementById('case-file');
    fileInput.click();
  };

  return (
    <Layout>
      <div className="chatbot-page">
        <div className="chatbot-page-header">
          <h1>⚖️ Legal AI Assistant</h1>
          <p>AI-powered legal analysis for IPC and BNS provisions</p>
        </div>

        <div className="chatbot-page-container">
          <div className="chat-controls-panel">
            <h3>Controls</h3>
            
            <div className="control-section">
              <button className="control-btn" onClick={clearChat}>
                <span className="control-icon">🗑️</span>
                Clear Chat
              </button>
              
              <div className="upload-section">
                <h4>📁 Upload Document</h4>
                <button 
                  className="upload-btn" 
                  onClick={uploadFile}
                >
                  Choose File
                </button>
                <input
                  type="file"
                  id="case-file"
                  style={{ display: 'none' }}
                  accept=".pdf,.doc,.docx,.txt"
                />
              </div>
            </div>

            <div className="info-section">
              <h4>💡 Tips</h4>
              <p className="tip-text">
                Ask about specific IPC/BNS sections, case analysis, or legal interpretations.
              </p>
            </div>
          </div>

          <div className="chat-interface-panel">
            <div className="chat-header">
              <div className="chat-title">
                <h3>Legal Analysis Chat</h3>
                <p>Real-time AI assistance</p>
              </div>
              <div className="chat-stats">
                <span>{messages.length} messages</span>
              </div>
            </div>

            <div className="chat-messages-container">
              <div className="chat-messages">
                {messages.map((msg) => (
                  <div key={msg.id} className={`chat-message ${msg.sender}`}>
                    <div className="message-avatar">
                      {msg.sender === 'bot' ? '⚖️' : '👤'}
                    </div>
                    <div className="message-content">
                      <div className="message-text">{msg.text}</div>
                      <div className="message-meta">
                        <span className="message-time">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="chat-message bot typing">
                    <div className="message-avatar">⚖️</div>
                    <div className="message-content">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <div className="message-meta">
                        <span className="message-sender">Analyzing...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>

            <form className="chat-input-container" onSubmit={handleSend}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about IPC sections, BNS charges, or legal analysis..."
                className="chat-input"
              />
              <button 
                type="submit" 
                className="send-btn" 
                disabled={!inputValue.trim() || isTyping}
              >
                {isTyping ? '...' : 'Send'}
              </button>
            </form>

            <div className="chat-footer">
              <p className="disclaimer">
                ⚠️ AI-generated legal information. Consult professionals for legal advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}