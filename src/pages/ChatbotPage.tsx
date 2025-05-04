import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Image, File, Smile, Bot, User, Maximize2, ArrowRight, X, ExternalLink, Mail, MessageSquare, Phone, Minimize } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  // Add your Firebase config here
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
  isTyping?: boolean;
}

const suggestedQuestions = [
  "How do I create a new email campaign?",
  "What's the best time to send emails?",
  "How can I improve my open rates?",
  "How do I segment my audience?",
  "What metrics should I track for campaigns?",
];

const knowledgeBaseArticles = [
  {
    title: "Getting Started with Email Campaigns",
    excerpt: "Learn how to create your first email campaign with our step-by-step guide.",
    url: "#",
  },
  {
    title: "Advanced Segmentation Strategies",
    excerpt: "Discover powerful techniques to segment your audience for better engagement.",
    url: "#",
  },
  {
    title: "Improving Email Deliverability",
    excerpt: "Tips and best practices to ensure your emails reach the inbox.",
    url: "#",
  },
];

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your marketing assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent',
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    // Add bot typing indicator
    const typingId = Date.now().toString() + '-typing';
    setMessages(prev => [
      ...prev,
      {
        id: typingId,
        content: '',
        sender: 'bot',
        timestamp: new Date(),
        isTyping: true,
      },
    ]);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      setMessages(prev => prev.filter(m => m.id !== typingId));
      
      let botResponse = '';
      
      // Generate a response based on the user's message
      const userMessageLower = inputMessage.toLowerCase();
      
      if (userMessageLower.includes('campaign') || userMessageLower.includes('email')) {
        botResponse = "To create a new campaign, go to the Campaigns page and click 'Create Campaign'. You can choose from email, SMS, or push notification templates. Would you like to see a tutorial?";
      } else if (userMessageLower.includes('segment') || userMessageLower.includes('audience')) {
        botResponse = "Segmenting your audience is a great way to improve your marketing results. You can create segments based on demographics, behavior, or engagement metrics. Check out our 'Advanced Segmentation Strategies' in our knowledge base.";
      } else if (userMessageLower.includes('open rate') || userMessageLower.includes('metrics')) {
        botResponse = "The average open rate across industries is around 21.5%. Your current open rate is 48.3%, which is excellent! To further improve, you could A/B test your subject lines and optimize send times.";
      } else {
        botResponse = "I understand you're asking about " + inputMessage + ". Let me help you with that. Is there something specific you'd like to know?";
      }
      
      const botMessage: Message = {
        id: Date.now().toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };
  
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Support</h1>
          <p className="mt-1 text-sm text-gray-500">
            Get help with your marketing automation tasks
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`lg:col-span-${isExpanded ? '3' : '2'}`}>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-[600px]">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-primary-100 p-2 rounded-full">
                  <Bot className="h-5 w-5 text-primary-600" />
                </div>
                <div className="ml-3">
                  <h2 className="text-sm font-medium text-gray-900">Marketing Assistant</h2>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-success-500 rounded-full mr-1.5"></div>
                    <span className="text-xs text-gray-500">Online</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  className="p-1.5 hover:bg-gray-200 rounded-full"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? <Minimize className="h-4 w-4 text-gray-500" /> : <Maximize2 className="h-4 w-4 text-gray-500" />}
                </button>
                <button className="p-1.5 hover:bg-gray-200 rounded-full">
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-2 flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary-600" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[75%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-white border border-gray-200'
                    } ${message.isTyping ? 'min-w-[60px]' : ''}`}
                  >
                    {message.isTyping ? (
                      <div className="flex space-x-1 justify-center items-center h-4">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    ) : (
                      <>
                        <p className={`text-sm ${message.sender === 'user' ? 'text-white' : 'text-gray-800'}`}>
                          {message.content}
                        </p>
                        <div className={`text-xs mt-1 text-right ${message.sender === 'user' ? 'text-primary-200' : 'text-gray-400'}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          {message.sender === 'user' && message.status && (
                            <span className="ml-1">
                              {message.status === 'sent' && '✓'}
                              {message.status === 'delivered' && '✓✓'}
                              {message.status === 'read' && (
                                <span className="text-blue-400">✓✓</span>
                              )}
                            </span>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                  
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center ml-2 flex-shrink-0">
                      <User className="h-4 w-4 text-secondary-600" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Suggested Questions */}
            <div className="px-4 py-3 border-t border-gray-200 bg-white">
              <h3 className="text-xs font-semibold text-gray-500 mb-2">Suggested Questions</h3>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-full transition-colors"
                    onClick={() => handleSuggestedQuestion(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Input area */}
            <div className="border-t border-gray-200 px-4 py-3 bg-white">
              <div className="flex items-end space-x-2">
                <div className="flex-1">
                  <textarea
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm resize-none"
                    placeholder="Type your message..."
                    rows={2}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                  ></textarea>
                  <div className="flex items-center mt-2 space-x-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Paperclip className="h-4 w-4 text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Image className="h-4 w-4 text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <File className="h-4 w-4 text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Smile className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                </div>
                <button
                  className="btn btn-primary px-3 py-2"
                  onClick={handleSendMessage}
                  disabled={inputMessage.trim() === ''}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {!isExpanded && (
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-medium text-gray-900">Knowledge Base</h2>
              </div>
              <div className="p-5 space-y-4">
                {knowledgeBaseArticles.map((article, index) => (
                  <div key={index} className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 transition-colors">
                    <h3 className="text-sm font-medium text-gray-900 mb-1">{article.title}</h3>
                    <p className="text-xs text-gray-500 mb-2">{article.excerpt}</p>
                    <a
                      href={article.url}
                      className="text-xs text-primary-600 hover:text-primary-800 font-medium flex items-center"
                    >
                      Read article
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                ))}
                
                <a
                  href="#"
                  className="block text-center text-sm text-primary-600 hover:text-primary-800 font-medium pt-2"
                >
                  View all resources
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-medium text-gray-900">Contact Support</h2>
              </div>
              <div className="p-5">
                <p className="text-sm text-gray-500 mb-4">
                  Need to speak with a human? Our support team is available 24/7.
                </p>
                
                <div className="space-y-3">
                  <button className="btn btn-outline w-full justify-between">
                    <span>Email Support</span>
                    <Mail className="h-4 w-4" />
                  </button>
                  
                  <button className="btn btn-outline w-full justify-between">
                    <span>Live Chat</span>
                    <MessageSquare className="h-4 w-4" />
                  </button>
                  
                  <button className="btn btn-outline w-full justify-between">
                    <span>Schedule Call</span>
                    <Phone className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const renderSocialLogin = () => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
    <div className="px-5 py-4 border-b border-gray-200 bg-gray-50">
      <h2 className="text-lg font-medium text-gray-900">Social Login</h2>
    </div>
    <div className="p-5 space-y-3">
      <button 
        onClick={handleGoogleLogin}
        className="btn btn-outline w-full justify-center space-x-2"
      >
        <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
        <span>Sign in with Google</span>
      </button>
      
      <button 
        onClick={handleFacebookLogin}
        className="btn btn-outline w-full justify-center space-x-2 bg-[#1877F2] text-white hover:bg-[#166FE5]"
      >
        <img src="/facebook-icon.png" alt="Facebook" className="w-5 h-5" />
        <span>Sign in with Facebook</span>
      </button>
    </div>
  </div>
);

export default ChatbotPage;