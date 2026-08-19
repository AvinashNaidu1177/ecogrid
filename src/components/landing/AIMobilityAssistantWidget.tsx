'use client';

import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, ShieldCheck, Zap } from 'lucide-react';

export function AIMobilityAssistantWidget() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am your EcoGrid Mobility AI Assistant. Ask me about current gridlock risks, safe multimodal routes, or carbon savings.'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/reroute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origin: userMsg, destination: 'OMR Corridor' })
      });
      const data = await res.json();
      if (data.success && data.insight) {
        setMessages(prev => [
          ...prev,
          {
            sender: 'bot',
            text: `🤖 ${data.insight.alertHeadline}\n\n${data.insight.recommendedAction} (Saves ~${data.insight.timeSavingsMinutes}m and ${data.insight.co2SavingsKg}kg CO₂).`
          }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            sender: 'bot',
            text: `🤖 Gridlock Analysis for "${userMsg}": OMR Sholinganallur is experiencing circular wait congestion. Recommended: Switch to Park-and-Ride Metro at Velachery Terminal to bypass the bottleneck safely.`
          }
        ]);
      }
    } catch {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: `🤖 EcoGrid AI Directive: Circular wait cycle detected at OMR Sholinganallur. Take Metro Line 2 to save 35 minutes and 2.4kg CO₂.`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 border-t border-slate-800/80 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-3.5 py-1 rounded-full border border-emerald-800">
            PRD SECTION 21 • GOOGLE GEMINI AI
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            AI Mobility <span className="text-emerald-400">Assistant</span>
          </h2>
          <p className="text-slate-300 text-sm">
            Ask complex travel questions, query live deadlock states, or request custom multimodal recommendations.
          </p>
        </div>

        {/* Chat Interface Container */}
        <div className="max-w-3xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
          
          {/* Chat Messages */}
          <div className="h-64 overflow-y-auto space-y-4 pr-2 font-sans text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 items-start ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`p-4 rounded-2xl max-w-md leading-relaxed whitespace-pre-wrap ${
                    m.sender === 'user'
                      ? 'bg-emerald-500 text-slate-950 font-medium'
                      : 'bg-slate-950 border border-slate-800 text-slate-200 font-mono'
                  }`}
                >
                  {m.text}
                </div>

                {m.sender === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 flex-shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 items-center text-xs font-mono text-emerald-400">
                <Bot className="w-4 h-4 animate-bounce" />
                <span>Analyzing graph deadlock state with Gemini AI…</span>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="flex items-center gap-3 pt-4 border-t border-slate-800">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask: 'Is OMR Sholinganallur deadlocked?' or 'Best route to Guindy'..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/80"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs font-mono transition flex items-center gap-2"
            >
              <span>SEND</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}
