import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Bot, Send, User, X } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIAssistant = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: t.aiAssistant.welcome,
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
      return "Ilias has expertise in Python, JavaScript/TypeScript, React, Node.js, and advanced AI/ML technologies including TensorFlow, PyTorch, NLP, and Computer Vision. He's proficient with cloud platforms like AWS and modern development tools.";
    }

    if (lowerMessage.includes('education') || lowerMessage.includes('degree') || lowerMessage.includes('study')) {
      return "Ilias holds both a Master's and Bachelor's degree in Computer Science, with advanced studies in Artificial Intelligence and Software Engineering. His education provided a strong foundation in computer science principles and cutting-edge AI technologies.";
    }

    if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
      return "Ilias has over 5 years of experience as an AI Assistant and Software Engineer. He has worked on diverse projects ranging from AI-powered chatbots and computer vision systems to full-stack web applications and mobile solutions.";
    }

    if (lowerMessage.includes('project')) {
      return "Ilias has worked on various exciting projects including an AI Chatbot Platform with NLP capabilities, Computer Vision Systems for real-time object detection, E-commerce platforms, and NLP Text Analytics tools. Each project showcases his ability to bridge AI technology with practical software solutions.";
    }

    if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email')) {
      return "You can reach out to Ilias through the contact form on this website, or connect with him on LinkedIn and GitHub. He's always open to discussing new opportunities and collaborations!";
    }

    if (lowerMessage.includes('ai') || lowerMessage.includes('machine learning') || lowerMessage.includes('ml')) {
      return "Ilias specializes in AI and Machine Learning, with expertise in Deep Learning, Natural Language Processing, Computer Vision, and working with Large Language Models (LLMs). He has hands-on experience building and deploying production-ready AI systems.";
    }

    return "I'm here to help you learn more about Ilias Jebrane! You can ask me about his skills, education, work experience, projects, or how to get in touch with him. What would you like to know?";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(input);
      const botMessage: Message = {
        id: messages.length + 2,
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0, rotate: -180 }}
        animate={{
          scale: 1,
          rotate: 0,
          boxShadow: [
            "0 20px 25px -5px rgba(59, 130, 246, 0.3)",
            "0 25px 30px -5px rgba(20, 184, 166, 0.4)",
            "0 20px 25px -5px rgba(59, 130, 246, 0.3)",
          ]
        }}
        whileHover={{
          scale: 1.1,
          rotate: 5,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.95, rotate: -5 }}
        transition={{
          scale: { type: "spring", damping: 15, stiffness: 300 },
          rotate: { duration: 0.6 },
          boxShadow: { duration: 2, repeat: Infinity }
        }}
        className="fixed bottom-6 right-6 z-40 p-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-full shadow-2xl"
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Bot size={28} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 100, y: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 100, y: 100 }}
              transition={{
                type: 'spring',
                damping: 20,
                stiffness: 300,
                opacity: { duration: 0.2 }
              }}
              className="fixed inset-4 md:inset-auto md:bottom-24 md:right-6 md:w-[450px] md:h-[650px] z-50 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="bg-gradient-to-r from-blue-600 to-teal-500 p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="p-2 bg-white/20 rounded-lg"
                  >
                    <Bot className="text-white" size={24} />
                  </motion.div>
                  <div>
                    <motion.h3
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-white font-semibold"
                    >
                      AI Assistant
                    </motion.h3>
                    <motion.p
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.25 }}
                      className="text-white/80 text-sm"
                    >
                      Always here to help
                    </motion.p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="text-white" size={24} />
                </motion.button>
              </motion.div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50 dark:bg-slate-800/50">
                <AnimatePresence mode="popLayout">
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{
                        type: "spring",
                        damping: 20,
                        stiffness: 300,
                        delay: index * 0.05
                      }}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-3 max-w-[80%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            type: "spring",
                            damping: 15,
                            stiffness: 300,
                            delay: 0.1
                          }}
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            message.isUser
                              ? 'bg-blue-600'
                              : 'bg-gradient-to-br from-teal-500 to-blue-600'
                          }`}
                        >
                          {message.isUser ? (
                            <User className="text-white" size={18} />
                          ) : (
                            <Bot className="text-white" size={18} />
                          )}
                        </motion.div>

                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.15 }}
                          className={`p-4 rounded-2xl ${
                            message.isUser
                              ? 'bg-blue-600 text-white rounded-tr-none'
                              : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-tl-none shadow-md'
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.text}</p>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex gap-3 max-w-[80%]">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-teal-500 to-blue-600"
                      >
                        <Bot className="text-white" size={18} />
                      </motion.div>
                      <div className="p-4 rounded-2xl rounded-tl-none bg-white dark:bg-slate-900 shadow-md">
                        <div className="flex gap-1">
                          <motion.span
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity }}
                            className="w-2 h-2 bg-slate-400 rounded-full"
                          />
                          <motion.span
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                            className="w-2 h-2 bg-slate-400 rounded-full"
                          />
                          <motion.span
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            className="w-2 h-2 bg-slate-400 rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700"
              >
                <div className="flex gap-3">
                  <motion.input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={t.aiAssistant.placeholder}
                    whileFocus={{ scale: 1.01 }}
                    className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-900 dark:text-white transition-all"
                  />
                  <motion.button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <motion.div
                      animate={input.trim() ? { x: [0, 3, 0] } : {}}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      <Send size={20} />
                    </motion.div>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
