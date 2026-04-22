"use client";

import { CheckCircle, Zap, Timer, Globe2, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ConclusionSection() {
   return (
      <section className="relative bg-black w-full min-h-screen flex flex-col items-center justify-center overflow-hidden border-t border-neutral-900 py-24" style={{ zIndex: 50 }}>
         
         {/* Abstract Background Ripple */}
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-[800px] h-[800px] border border-neutral-800 rounded-full animate-[ping_4s_ease-out_infinite]" />
            <div className="absolute w-[600px] h-[600px] border border-neutral-700 rounded-full animate-[ping_4s_ease-out_infinite]" style={{ animationDelay: "1s" }} />
            <div className="absolute w-[400px] h-[400px] border border-blue-900/50 rounded-full animate-[ping_4s_ease-out_infinite]" style={{ animationDelay: "2s" }} />
            <div className="absolute w-[200px] h-[200px] bg-blue-600/10 blur-3xl rounded-full" />
         </div>

         <div className="relative z-10 max-w-5xl px-6 md:px-12 w-full flex flex-col items-center text-center">
            
            {/* The Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-950 text-blue-400 text-sm font-black uppercase tracking-[0.2em] mb-8 border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
               <Globe2 className="w-5 h-5" /> The Verdict
            </div>

            {/* Main Hook */}
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-8">
               From a 15-Minute Burden to a <br className="hidden md:block" />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">
                  30-Second Digital Ripple.
               </span>
            </h2>

            {/* Narrative Blocks */}
            <div className="max-w-4xl space-y-8 text-neutral-300 text-lg md:text-2xl leading-relaxed font-light mb-16">
               <p>
                  By replacing manual paper signing and expensive hardware with an automated proximity web, we completely eliminate proxy cheating while ensuring high reliability through a fault-tolerant peer-to-peer architecture.
               </p>
               <p>
                  This modern approach creates a <strong className="text-white font-bold">"zero-friction"</strong> experience. It captures attendance in the background, allowing the lecture to start immediately. By saving thousands of teaching hours across the academic year, the project moves Indian universities away from outdated paperwork toward a truly smart, efficient, and data-driven campus.
               </p>
            </div>

            {/* Impact Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-16">
               <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 p-6 rounded-2xl flex flex-col items-center text-center hover:bg-neutral-800/50 transition-colors">
                  <Timer className="w-10 h-10 text-cyan-400 mb-4" />
                  <div className="text-2xl font-black text-white mb-2">30 Seconds</div>
                  <div className="text-sm text-neutral-400">Total session verification time, completely eliminating 15 minutes of manual roll-call.</div>
               </div>
               
               <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 p-6 rounded-2xl flex flex-col items-center text-center hover:bg-neutral-800/50 transition-colors">
                  <Zap className="w-10 h-10 text-emerald-400 mb-4" />
                  <div className="text-2xl font-black text-white mb-2">Zero Friction</div>
                  <div className="text-sm text-neutral-400">Background background bridging requires no manual intervention from the teacher to start class.</div>
               </div>

               <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 p-6 rounded-2xl flex flex-col items-center text-center hover:bg-neutral-800/50 transition-colors">
                  <ShieldCheck className="w-10 h-10 text-blue-400 mb-4" />
                  <div className="text-2xl font-black text-white mb-2">100% Reliable</div>
                  <div className="text-sm text-neutral-400">Cryptographically secured P2P mesh defeats relays, replays, and hallway spoofing attempts.</div>
               </div>
            </div>

            {/* Final CTA Button back to Dashboard */}
            <Link href="/" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-blue-600 rounded-xl hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)]">
               Enter The Dashboard
               <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>

         </div>
      </section>
   );
}
