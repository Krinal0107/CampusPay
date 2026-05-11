import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Volume2, Send } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

const presetCommands = [
  'Pay cafeteria 5 USDC',
  'How much did I spend this month?',
  'Send 50 USDC to chioma.sol',
  'Show my balance',
  'What are my pending invoices?',
];

const responses: Record<string, string> = {
  'pay cafeteria 5 usdc': 'Processing payment of 5 USDC to Campus Cafeteria... Payment successful! Your new balance is $3,240.80.',
  'how much did i spend this month?': 'This month you\'ve spent 245.50 USDC across 18 transactions. Your top category is Food at 35%, followed by Tuition at 40%.',
  'send 50 usdc to chioma.sol': 'Sending 50 USDC to chioma.sol... Transaction confirmed! Tx ID: 7xKm...p3Qr',
  'show my balance': 'Your current balance is 3,245.80 USDC. You have 2 pending invoices totaling 3,300 USDC.',
  'what are my pending invoices?': 'You have 2 pending invoices: Fall Semester Tuition (2,500 USDC, due June 15) and Hostel Accommodation (800 USDC, due May 30).',
};

const VoiceAssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', role: 'assistant', text: 'Hello! I\'m your CampusPay+ voice assistant. How can I help you today? Try saying "Pay cafeteria 5 USDC" or ask about your spending.' },
  ]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Find response
    const lower = text.toLowerCase().trim();
    const responseKey = Object.keys(responses).find((k) => lower.includes(k) || k.includes(lower));
    const responseText = responseKey
      ? responses[responseKey]
      : `I understand you said "${text}". Let me process that for you. This feature is being enhanced for the full release.`;

    setTimeout(() => {
      setSpeaking(true);
      const assistantMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', text: responseText };
      setMessages((prev) => [...prev, assistantMsg]);
      setTimeout(() => setSpeaking(false), 2000);
    }, 800);
  };

  const toggleListening = () => {
    if (listening) {
      setListening(false);
      // Simulate voice capture
      const randomCmd = presetCommands[Math.floor(Math.random() * presetCommands.length)];
      handleSend(randomCmd);
    } else {
      setListening(true);
      setTimeout(() => {
        setListening(false);
        const randomCmd = presetCommands[Math.floor(Math.random() * presetCommands.length)];
        handleSend(randomCmd);
      }, 2500);
    }
  };

  return (
    <AppLayout mode="student" title="Voice Assistant">
      <div className="mx-auto flex max-w-lg flex-col" style={{ height: 'calc(100vh - 8rem)' }}>
        {/* Messages */}
        <div className="flex-1 space-y-3 overflow-y-auto pb-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'glass-card text-foreground'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="mb-1 flex items-center gap-1.5">
                    <Volume2 className="h-3 w-3 text-emerald" />
                    <span className="text-xs font-medium text-emerald">CampusPay+ Assistant</span>
                  </div>
                )}
                <p className="text-sm">{msg.text}</p>
              </div>
            </motion.div>
          ))}
          {speaking && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="glass-card flex items-center gap-2 rounded-2xl px-4 py-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 rounded-full bg-emerald"
                    animate={{ height: [4, Math.random() * 16 + 4, 4] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.05 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Quick commands */}
        <div className="mb-3 flex flex-wrap gap-2">
          {presetCommands.slice(0, 3).map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleSend(cmd)}
              className="rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Input area */}
        <div className="flex items-center gap-3">
          <div className="flex flex-1 items-center rounded-xl border border-border bg-secondary/50">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder="Type a command..."
              className="flex-1 bg-transparent px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none"
            />
            <button
              onClick={() => handleSend(input)}
              className="px-3 text-muted-foreground hover:text-primary"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={toggleListening}
            className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all ${
              listening
                ? 'animate-pulse-gold bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground'
            }`}
          >
            {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default VoiceAssistantPage;
