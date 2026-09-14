'use client';

import { useState } from 'react';
import { Mail, ArrowRight, Check } from 'lucide-react';

export default function NewsletterBox() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 sm:p-12 text-white shadow-xl">
        <div className="relative z-10 max-w-xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md">
            <Mail className="w-3.5 h-3.5" /> Stay ahead of the curve
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Get high-impact ideas delivered straight to your inbox
          </h2>
          <p className="text-blue-100 text-sm">
            Subscribe to weekly digests covering automated systems, AI breakthroughs, and strategic growth frameworks.
          </p>

          {submitted ? (
            <div className="p-4 rounded-xl bg-white/20 backdrop-blur-md flex items-center gap-2 text-sm font-semibold">
              <Check className="w-5 h-5 text-emerald-300" />
              Thank you for subscribing! Check your inbox soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work or personal email..."
                className="px-4 py-3 rounded-xl bg-white text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-white flex-1"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-white font-semibold text-sm transition-all hover:scale-105 flex items-center justify-center gap-1.5"
              >
                Join Free <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
