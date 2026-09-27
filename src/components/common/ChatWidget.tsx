"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import { PUBLIC_ASSETS } from "@/lib/constants";

interface Message {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: string;
}

const SUGGESTED_PROMPTS = [
  "What services do you offer?",
  "How can I contact support?",
  "Do you build mobile apps?",
  "Tell me about website hosting",
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  // Load chat history from Session Storage on mount
  useEffect(() => {
    try {
      const savedHistory = sessionStorage.getItem("tomscope_chat_history");
      if (savedHistory) {
        setMessages(JSON.parse(savedHistory));
      } else {
        // Initial bot greeting
        const initialMessage: Message = {
          id: "welcome",
          role: "model",
          content: "Hi! Welcome to **Tomscope**. I'm your AI support assistant. How can I help you today? Feel free to ask about our software development, IT consulting, hosting, or other services!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages([initialMessage]);
      }
    } catch (err) {
      console.error("Failed to load chat history from session storage", err);
    }
  }, []);

  // Save chat history to Session Storage when messages update
  useEffect(() => {
    if (messages.length > 0) {
      try {
        sessionStorage.setItem("tomscope_chat_history", JSON.stringify(messages));
      } catch (err) {
        console.error("Failed to save chat history to session storage", err);
      }
    }
  }, [messages]);

  // Auto-scroll to the bottom of the chat list on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when the chat widget opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        chatInputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const userMsg: Message = {
      id: userMsgId,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);
    setHasError(false);

    try {
      // Map message history to send to API (excluding initial greeting to avoid redundancy, or include it)
      const historyPayload = messages
        .filter((msg) => msg.id !== "welcome")
        .map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to reach assistant server");
      }

      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        role: "model",
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat client error:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const clearChatHistory = () => {
    try {
      sessionStorage.removeItem("tomscope_chat_history");
      const initialMessage: Message = {
        id: "welcome",
        role: "model",
        content: "Hi! Welcome to **Tomscope**. I'm your AI support assistant. How can I help you today? Feel free to ask about our software development, IT consulting, hosting, or other services!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([initialMessage]);
      setHasError(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Simple Markdown-like formatter for bold (**text**), lists, and paragraph splits
  const formatMessageContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, lineIdx) => {
      // Bold handling
      let formattedLine: React.ReactNode = line;
      const boldRegex = /\*\*(.*?)\*\*/g;
      
      if (boldRegex.test(line)) {
        const parts = line.split(boldRegex);
        formattedLine = parts.map((part, partIdx) => {
          // Odd indices are the captured bold texts
          return partIdx % 2 === 1 ? <strong key={partIdx} className="font-semibold text-slate-900 dark:text-white">{part}</strong> : part;
        });
      }

      // Check if it's a bullet point
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        return (
          <li key={lineIdx} className="ml-4 list-disc mt-1 text-sm leading-relaxed text-[#334155] dark:text-[#E2E8F0]">
            {typeof formattedLine === "string" ? formattedLine.trim().substring(2) : formattedLine}
          </li>
        );
      }

      return (
        <p key={lineIdx} className="text-sm leading-relaxed text-[#334155] dark:text-[#E2E8F0] mt-1.5 first:mt-0">
          {formattedLine}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-[360px] sm:w-[400px] h-[520px] max-h-[calc(100vh-100px)] bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/80 dark:border-slate-800/80 flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-[#0F172A] dark:bg-[#1E293B] text-white p-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-sky-400/40 shadow-md relative bg-slate-800">
                    <Image
                      src={PUBLIC_ASSETS.logo}
                      alt="Tomscope Logo"
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#0F172A] rounded-full z-10"></span>
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-wide">Tomscope Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-300 font-medium">Gemini 2.5 Flash</span>
                    <span className="text-[8px] px-1 bg-green-500/20 text-green-400 rounded">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearChatHistory}
                  title="Clear chat"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <RefreshCw size={14} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-[#F8FAFC]/50 dark:bg-[#020617]/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                      msg.role === "user"
                        ? "bg-[#0284C7] text-white rounded-br-none"
                        : "bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800 rounded-bl-none"
                    }`}
                  >
                    <div className="whitespace-pre-wrap break-words text-sm">
                      {msg.role === "user" ? (
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                      ) : (
                        formatMessageContent(msg.content)
                      )}
                    </div>
                    <div
                      className={`text-[9px] mt-1.5 text-right ${
                        msg.role === "user" ? "text-sky-200" : "text-slate-400"
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-[#1E293B] border border-slate-100 dark:border-slate-800 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-1">
                    <span className="w-2 h-2 bg-sky-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-2 h-2 bg-sky-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-2 h-2 bg-sky-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              )}

              {/* Error Block */}
              {hasError && (
                <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl p-3 flex items-start gap-2">
                  <AlertCircle size={16} className="text-red-500 dark:text-red-400 mt-0.5 shrink-0" />
                  <div className="text-xs text-red-700 dark:text-red-300">
                    <p className="font-semibold">Connection failed</p>
                    <p className="mt-0.5">Could not send message. Please check your internet or retry.</p>
                    <button
                      onClick={() => {
                        const lastUserMsg = [...messages].reverse().find(m => m.role === "user");
                        if (lastUserMsg) handleSendMessage(lastUserMsg.content);
                      }}
                      className="mt-2 text-sky-600 dark:text-sky-400 font-semibold hover:underline flex items-center gap-1"
                    >
                      Retry sending
                    </button>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Suggestions */}
            {messages.length === 1 && !isLoading && (
              <div className="px-4 pb-3 pt-1 border-t border-slate-100 dark:border-slate-800 bg-[#F8FAFC]/30 dark:bg-[#020617]/30">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Suggested Questions</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleSendMessage(prompt)}
                      className="text-xs bg-white dark:bg-[#1E293B] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-[#0284C7] dark:hover:border-[#0284C7] px-3 py-1.5 rounded-full text-left transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Footer */}
            <form
              onSubmit={handleFormSubmit}
              className="p-3 bg-white dark:bg-[#0F172A] border-t border-slate-100 dark:border-slate-850 flex items-center gap-2"
            >
              <input
                ref={chatInputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about our services..."
                disabled={isLoading}
                className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#0284C7] dark:focus:border-[#0284C7] text-slate-800 dark:text-slate-200 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="w-10 h-10 rounded-xl bg-[#0284C7] text-white flex items-center justify-center hover:bg-[#0369A1] transition-all disabled:opacity-40 disabled:hover:bg-[#0284C7]"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#0284C7] to-[#0369A1] text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 select-none cursor-pointer"
        aria-label="Toggle chatbot"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageSquare size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
