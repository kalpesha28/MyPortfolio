import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactSection = () => {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');
  
  // Simulate sending a message (replace with real EmailJS later)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    
    // Fake encryption delay
    setTimeout(() => {
      setFormState('sent');
    }, 2000);
  };

  return (
    <section className="relative bg-[#050505] py-32 px-6 flex items-center justify-center overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 w-full max-w-3xl">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-mono mb-4 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            SECURE CHANNEL OPEN
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            Initialize <span className="text-purple-500">Contact</span>
          </h2>
        </div>

        {/* THE TERMINAL WINDOW */}
        <div className="w-full bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl">
          
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="text-xs font-mono text-zinc-500 flex items-center gap-2">
              <Terminal size={12} />
              root@kalpesh-secure-server:~
            </div>
            <div className="w-10" /> {/* Spacer */}
          </div>

          {/* Terminal Body / Form */}
          <div className="p-8 font-mono">
            
            <AnimatePresence mode="wait">
              {formState === 'sent' ? (
                // SUCCESS STATE
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl text-white font-bold mb-2">Transmission Successful</h3>
                  <p className="text-zinc-400">Message encrypted and delivered to HQ.</p>
                  <button 
                    onClick={() => setFormState('idle')}
                    className="mt-8 text-xs text-purple-400 hover:text-purple-300 hover:underline"
                  >
                    [ Send Another Packet ]
                  </button>
                </motion.div>
              ) : (
                // INPUT FORM STATE
                <motion.form 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Name Input */}
                  <div className="group">
                    <label className="block text-xs text-zinc-500 mb-1 ml-1 group-focus-within:text-purple-400 transition-colors">
                      // ENTER IDENTITY
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 text-purple-500 font-bold">{'>'}</span>
                      <input 
                        type="text" 
                        required 
                        placeholder="Your Name" 
                        className="w-full bg-black/50 border border-white/10 rounded-lg py-4 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-zinc-700"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="group">
                    <label className="block text-xs text-zinc-500 mb-1 ml-1 group-focus-within:text-purple-400 transition-colors">
                      // RETURN ADDRESS
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 text-purple-500 font-bold">{'>'}</span>
                      <input 
                        type="email" 
                        required 
                        placeholder="email@domain.com" 
                        className="w-full bg-black/50 border border-white/10 rounded-lg py-4 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-zinc-700"
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="group">
                    <label className="block text-xs text-zinc-500 mb-1 ml-1 group-focus-within:text-purple-400 transition-colors">
                      // PAYLOAD DATA
                    </label>
                    <div className="relative flex items-start">
                      <span className="absolute left-4 top-4 text-purple-500 font-bold">{'>'}</span>
                      <textarea 
                        required 
                        rows={4}
                        placeholder="Initiate communication protocol..." 
                        className="w-full bg-black/50 border border-white/10 rounded-lg py-4 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-zinc-700 resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    disabled={formState === 'sending'}
                    className="w-full bg-white text-black font-bold py-4 rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formState === 'sending' ? (
                      <>
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        ENCRYPTING DATA...
                      </>
                    ) : (
                      <>
                        TRANSMIT DATA <Send size={16} />
                      </>
                    )}
                  </button>

                </motion.form>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* FOOTER NOTE */}
        <div className="mt-12 text-center">
          <p className="text-zinc-600 text-xs tracking-widest uppercase">
            Designed & Engineered by Kalpesh <span className="text-purple-900 mx-2">///</span> 2026
          </p>
        </div>

      </div>
    </section>
  );
};