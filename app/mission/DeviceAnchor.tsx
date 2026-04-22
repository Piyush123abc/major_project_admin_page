"use client";

import { useEffect, useRef, useState } from "react";
import { Smartphone, Cloud, Key, Shield, ShieldOff, Zap, Lock, Cpu } from "lucide-react";

export default function DeviceAnchorSection() {
   const containerRef = useRef<HTMLDivElement>(null);
   const [stage, setStage] = useState(0);

   useEffect(() => {
      const handleScroll = () => {
         if (!containerRef.current) return;

         const scrollEl = document.querySelector("main > div") || window;
         const isWindow = scrollEl === window;
         const scrollTop = isWindow ? window.scrollY : (scrollEl as HTMLElement).scrollTop;

         let offsetTop = 0;
         let el: HTMLElement | null = containerRef.current;
         while (el && el !== scrollEl && el !== document.body) {
            offsetTop += el.offsetTop;
            el = el.offsetParent as HTMLElement;
         }

         const winH = window.innerHeight;
         const scrollable = containerRef.current.offsetHeight - winH;

         const scrolled = scrollTop - offsetTop;
         const p = scrollable > 0 ? scrolled / scrollable : 0;
         const currentProgress = Math.max(0, Math.min(1, p));

         // 3 Stages (33% scroll chunks)
         const newStage = currentProgress < 0.33 ? 0 :
            currentProgress < 0.66 ? 1 : 2;

         setStage((prev) => (prev !== newStage ? newStage : prev));
      };

      const scrollEl = document.querySelector("main > div") || window;
      scrollEl.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleScroll, { passive: true });

      handleScroll();

      return () => {
         scrollEl.removeEventListener("scroll", handleScroll);
         window.removeEventListener("resize", handleScroll);
      };
   }, []);

   return (
      <section ref={containerRef} className="relative bg-slate-950 w-full" style={{ height: "400vh", zIndex: 30 }}>
         {/* Sticky Container for the Centered Layout */}
         <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden border-t-2 border-slate-900">

            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />

            {/* Dynamic Titles (Centered Top) */}
            <div className="absolute top-12 md:top-24 w-full px-8 text-center z-40">
               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-slate-300 text-xs font-black uppercase tracking-[0.2em] mb-6 border border-slate-700 shadow-xl">
                  <Smartphone className="w-4 h-4" /> The Device Anchor
               </div>

               <div className="relative h-24">
                  <h2 className={`absolute inset-0 text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight transition-all duration-700 ${stage === 0 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}>
                     Identity <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Anchoring</span>
                  </h2>
                  <h2 className={`absolute inset-0 text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight transition-all duration-700 ${stage === 1 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}>
                     Pre-Login <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Verification</span>
                  </h2>
                  <h2 className={`absolute inset-0 text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight transition-all duration-700 ${stage === 2 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}>
                     Strict <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-500">1:1 Enforcement</span>
                  </h2>
               </div>
            </div>

            {/* Central Visual Engine */}
            <div className="relative w-full max-w-4xl aspect-square md:aspect-video flex items-center justify-center mt-16 md:mt-0 z-30 pointer-events-none">
               
               {/* Ambient Glow behind the whole visual */}
               <div className={`absolute w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full blur-[100px] md:blur-[150px] transition-colors duration-1000 
                  ${stage === 0 ? "bg-blue-600/20" : stage === 1 ? "bg-indigo-600/20" : "bg-red-600/20"}`} />

               {/* Stage 0: Anchoring */}
               <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ${stage === 0 ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
                  
                  {/* Backend Cloud */}
                  <div className="absolute top-[10%] md:top-[15%] w-24 h-24 md:w-32 md:h-32 bg-slate-900 border-2 border-slate-700 rounded-[2rem] flex flex-col items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.3)] z-20">
                     <Cloud className="w-10 h-10 md:w-12 md:h-12 text-slate-400 mb-1" />
                     <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Backend</span>
                  </div>

                  {/* Upload Beam */}
                  <svg className="absolute top-[25%] md:top-[30%] h-[30%] w-24 md:w-32 z-10 overflow-visible">
                     <path d="M 50% 100% L 50% 0%" fill="none" stroke="#60a5fa" strokeWidth="4" strokeDasharray="8 8" className="animate-[dash_1s_linear_infinite]" />
                     <circle cx="50%" cy="0%" r="4" fill="#60a5fa" className="animate-ping" />
                     {/* Public Key Icon moving up */}
                     <g className="animate-[slideUp_2s_ease-in-out_infinite]">
                        <rect x="calc(50% - 16px)" y="50%" width="32" height="32" rx="8" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" />
                        <text x="50%" y="calc(50% + 16px)" fill="#93c5fd" fontSize="10" fontWeight="bold" textAnchor="middle" alignmentBaseline="middle">PUB</text>
                     </g>
                  </svg>

                  {/* Student Phone */}
                  <div className="absolute bottom-[10%] md:bottom-[15%] w-32 h-56 md:w-40 md:h-72 border-4 border-slate-700 bg-slate-900 rounded-[2rem] shadow-2xl flex flex-col items-center justify-end pb-8 relative overflow-hidden z-20">
                     <div className="absolute top-4 w-12 h-1.5 bg-slate-800 rounded-full" />
                     
                     {/* The Security Chip inside the phone */}
                     <div className="relative w-16 h-16 md:w-20 md:h-20 bg-slate-950 border-2 border-blue-500/50 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)] group">
                        <Cpu className="absolute inset-0 w-full h-full text-blue-500/10 pointer-events-none" />
                        <Lock className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
                        
                        {/* Private Key sealed inside */}
                        <div className="absolute -bottom-3 bg-blue-950 border border-blue-800 px-2 py-0.5 rounded text-[8px] font-bold text-blue-300 tracking-widest whitespace-nowrap">
                           PRV KEY SEALED
                        </div>
                     </div>
                  </div>

               </div>

               {/* Stage 1: Verification */}
               <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ${stage === 1 ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}>
                  
                  {/* Backend Cloud */}
                  <div className="absolute top-[10%] md:top-[15%] w-24 h-24 md:w-32 md:h-32 bg-slate-900 border-2 border-indigo-500 rounded-[2rem] flex flex-col items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.4)] z-20">
                     <Cloud className="w-10 h-10 md:w-12 md:h-12 text-indigo-400 mb-1" />
                     <Shield className="w-4 h-4 text-indigo-300 absolute top-4 right-4" />
                  </div>

                  {/* Challenge & Response Beams */}
                  <svg className="absolute top-[25%] md:top-[30%] h-[30%] w-48 md:w-64 z-10 overflow-visible">
                     {/* Downward Challenge */}
                     <path d="M 30% 0% L 30% 100%" fill="none" stroke="#6366f1" strokeWidth="3" strokeDasharray="6 6" className="animate-[dash_1s_linear_infinite_reverse]" />
                     <g className="animate-[slideDown_2s_ease-in-out_infinite]">
                        <rect x="calc(30% - 12px)" y="30%" width="24" height="24" rx="6" fill="#312e81" stroke="#6366f1" />
                        <text x="30%" y="calc(30% + 12px)" fill="#a5b4fc" fontSize="14" fontWeight="bold" textAnchor="middle" alignmentBaseline="middle">?</text>
                     </g>

                     {/* Upward Signature */}
                     <path d="M 70% 100% L 70% 0%" fill="none" stroke="#10b981" strokeWidth="4" className="animate-[dash_1s_linear_infinite]" strokeDasharray="10 10" />
                     <g className="animate-[slideUp_2s_ease-in-out_infinite]" style={{ animationDelay: "1s" }}>
                        <rect x="calc(70% - 14px)" y="50%" width="28" height="28" rx="6" fill="#064e3b" stroke="#10b981" />
                        <Shield className="w-4 h-4 text-emerald-400 absolute" style={{ transform: "translate(calc(70% - 8px), calc(50% + 6px))" }} />
                     </g>
                  </svg>

                  {/* Student Phone */}
                  <div className="absolute bottom-[10%] md:bottom-[15%] w-32 h-56 md:w-40 md:h-72 border-4 border-indigo-500/50 bg-slate-900 rounded-[2rem] shadow-[0_0_40px_rgba(99,102,241,0.2)] flex flex-col items-center justify-end pb-8 relative overflow-hidden z-20">
                     <div className="absolute inset-0 bg-indigo-500/5" />
                     <div className="absolute top-4 w-12 h-1.5 bg-slate-800 rounded-full" />
                     
                     {/* The Security Chip Computing */}
                     <div className="relative w-16 h-16 md:w-20 md:h-20 bg-slate-950 border-2 border-indigo-400 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.6)] group">
                        <Zap className="w-8 h-8 text-indigo-400 animate-pulse" />
                        <div className="absolute -inset-2 border border-indigo-500/30 rounded-2xl animate-ping" />
                     </div>
                  </div>

               </div>

               {/* Stage 2: 1:1 Enforcement (Block) */}
               <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ${stage === 2 ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
                  
                  {/* Backend Cloud (Red) */}
                  <div className="absolute top-[10%] md:top-[15%] w-24 h-24 md:w-32 md:h-32 bg-slate-900 border-2 border-red-500 rounded-[2rem] flex flex-col items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.4)] z-20">
                     <Cloud className="w-10 h-10 md:w-12 md:h-12 text-red-500 mb-1" />
                     <ShieldOff className="w-5 h-5 text-red-400 absolute top-3 right-3" />
                  </div>

                  {/* Rejected Request Beam */}
                  <svg className="absolute top-[25%] md:top-[30%] h-[30%] w-24 md:w-32 z-10 overflow-visible">
                     <path d="M 50% 100% L 50% 60%" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="10 20" className="opacity-50" />
                     
                     {/* Huge Block Shield in the middle */}
                     <g transform="translate(calc(50% - 24px), 30%)">
                        <rect width="48" height="48" rx="24" fill="#7f1d1d" stroke="#ef4444" strokeWidth="3" />
                        <path d="M 16 16 L 32 32 M 32 16 L 16 32" stroke="#fca5a5" strokeWidth="4" strokeLinecap="round" />
                     </g>
                  </svg>

                  {/* Unknown/Bad Actor Phone */}
                  <div className="absolute bottom-[10%] md:bottom-[15%] w-32 h-56 md:w-40 md:h-72 border-4 border-slate-700 bg-slate-900 rounded-[2rem] flex flex-col items-center justify-end pb-8 relative overflow-hidden z-20 grayscale">
                     <div className="absolute top-4 w-12 h-1.5 bg-slate-800 rounded-full" />
                     
                     {/* Invalid Chip */}
                     <div className="relative w-16 h-16 md:w-20 md:h-20 bg-slate-950 border-2 border-slate-700 rounded-xl flex items-center justify-center group">
                        <Key className="w-6 h-6 md:w-8 md:h-8 text-slate-600" />
                        <div className="absolute -bottom-3 bg-red-950 border border-red-800 px-2 py-0.5 rounded text-[8px] font-bold text-red-400 tracking-widest whitespace-nowrap">
                           KEY MISMATCH
                        </div>
                     </div>
                  </div>

               </div>
            </div>

            {/* Dynamic Text Descriptions (Centered Bottom) */}
            <div className="absolute bottom-12 md:bottom-24 w-full px-8 max-w-3xl text-center z-40">
               <div className="relative h-40 md:h-32">
                  
                  {/* Text 0 */}
                  <div className={`absolute inset-0 transition-all duration-700 delay-200 ${stage === 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
                     <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
                        Upon first use, a student's account is cryptographically <strong className="text-blue-400">"anchored"</strong> to their phone's unique hardware signature. 
                     </p>
                     <p className="text-slate-500 mt-4 text-sm md:text-base">
                        The device generates a key pair. The <strong className="text-slate-300">Public Key</strong> is sent to the backend, while the <strong className="text-slate-300">Private Key</strong> is permanently sealed inside the mobile's hardware security chip.
                     </p>
                  </div>

                  {/* Text 1 */}
                  <div className={`absolute inset-0 transition-all duration-700 delay-200 ${stage === 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
                     <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
                        Before allowing any session to start, the backend sends a <strong className="text-indigo-400">Cryptographic Challenge</strong> down to the app.
                     </p>
                     <p className="text-slate-500 mt-4 text-sm md:text-base">
                        The app must use the hardware chip to <strong className="text-slate-300">Sign the Token</strong>. This proves mathematically that the login attempt is originating from the exact physical device registered on day one.
                     </p>
                  </div>

                  {/* Text 2 */}
                  <div className={`absolute inset-0 transition-all duration-700 delay-200 ${stage === 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
                     <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
                        If a student tries to log in on a friend's phone to fake attendance, the hardware signatures <strong className="text-red-400">will not match</strong>.
                     </p>
                     <p className="text-slate-500 mt-4 text-sm md:text-base">
                        Without the original Private Key securely housed in the original phone's chip, the challenge fails. The login is <strong className="text-red-400 font-bold">instantly blocked</strong>.
                     </p>
                  </div>

               </div>
            </div>

            {/* Stage Progress Indicators */}
            <div className="absolute bottom-4 flex gap-3 z-30">
               {[0, 1, 2].map((i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${stage === i ? (i === 0 ? "w-8 bg-blue-500" : i === 1 ? "w-8 bg-indigo-500" : "w-8 bg-red-500") : "w-2 bg-slate-800"}`} />
               ))}
            </div>

         </div>

         <style dangerouslySetInnerHTML={{
            __html: `
        @keyframes slideUp {
          0% { transform: translateY(100%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(-100%); opacity: 0; }
        }
        @keyframes slideDown {
          0% { transform: translateY(-100%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        @keyframes dash {
          to { stroke-dashoffset: -20; }
        }
      `}} />
      </section>
   );
}
