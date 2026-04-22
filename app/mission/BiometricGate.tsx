"use client";

import { useEffect, useRef, useState } from "react";
import { Cpu, Fingerprint, ShieldAlert, Zap, Lock, Key, ShieldCheck, Flame } from "lucide-react";

export default function BiometricGateSection() {
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
      <section ref={containerRef} className="relative bg-black w-full" style={{ height: "400vh", zIndex: 20 }}>
         <div className="sticky top-0 h-screen w-full flex flex-col lg:flex-row overflow-hidden border-t-2 border-neutral-900 font-mono">

            {/* Left Side: Text Content */}
            <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex flex-col justify-center p-8 md:p-16 lg:p-24 relative z-20 bg-black/90 border-r border-neutral-900">
               {/* Digital Forensics Grid Background */}
               <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 text-neutral-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8 w-fit border border-neutral-800">
                  <Lock className="w-3 h-3" /> Hardware Security
               </div>

               {/* Dynamic Main Title */}
               <div className="relative h-20 md:h-24 mb-6">
                  <h2 className={`absolute inset-0 text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase transition-all duration-700 ${stage === 0 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}>
                     The <span className="text-cyan-500">Forge</span>
                  </h2>
                  <h2 className={`absolute inset-0 text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase transition-all duration-700 ${stage === 1 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}>
                     The <span className="text-emerald-500">Challenge</span>
                  </h2>
                  <h2 className={`absolute inset-0 text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase transition-all duration-700 ${stage === 2 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}>
                     The <span className="text-red-600">Kill Switch</span>
                  </h2>
               </div>

               <div className="relative h-80 md:h-96 w-full mt-4">
                  {/* Stage 0 */}
                  <div className={`absolute inset-0 transition-all duration-700 delay-100 ${stage === 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}`}>
                     <h3 className="text-xl md:text-2xl font-bold text-neutral-300 mb-6 flex items-center gap-3 uppercase tracking-wider">
                        <Cpu className="text-cyan-500 w-6 h-6" /> Hardware Security Module (HSM)
                     </h3>
                     <p className="text-neutral-400 text-lg md:text-xl leading-relaxed mb-6 font-sans">
                        During initial setup, the app generates a unique <strong className="text-cyan-400">ECC (Elliptic Curve Cryptography)</strong> key pair. The Private Key is forged deep inside your phone's silicon.
                     </p>
                     <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-lg">
                        <p className="text-neutral-500 text-sm md:text-base leading-relaxed font-sans">
                           <strong className="text-neutral-300 font-mono">SECURE BINDING:</strong> This key is physically "bound" to the current biometric state. It resides in the TEE, making it <strong className="text-white">inaccessible even if the device is rooted</strong>. It cannot be extracted or spoofed.
                        </p>
                     </div>
                  </div>

                  {/* Stage 1 */}
                  <div className={`absolute inset-0 transition-all duration-700 delay-100 ${stage === 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}`}>
                     <h3 className="text-xl md:text-2xl font-bold text-neutral-300 mb-6 flex items-center gap-3 uppercase tracking-wider">
                        <Fingerprint className="text-emerald-500 w-6 h-6" /> Zero-Data Validation
                     </h3>
                     <p className="text-neutral-400 text-lg md:text-xl leading-relaxed mb-6 font-sans">
                        The app never sees your fingerprint data. Instead, it sends a <strong className="text-emerald-400">"Challenge"</strong> directly to the security chip to prove your identity.
                     </p>
                     <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-lg">
                        <p className="text-neutral-500 text-sm md:text-base leading-relaxed font-sans">
                           <strong className="text-neutral-300 font-mono">CHALLENGE-RESPONSE:</strong> The chip only signs that challenge if it detects a valid biometric match. We only receive a <strong className="text-white">"Signed Token"</strong> back once the hardware is satisfied.
                        </p>
                     </div>
                  </div>

                  {/* Stage 2 */}
                  <div className={`absolute inset-0 transition-all duration-700 delay-100 ${stage === 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}`}>
                     <h3 className="text-xl md:text-2xl font-bold text-neutral-300 mb-6 flex items-center gap-3 uppercase tracking-wider">
                        <ShieldAlert className="text-red-500 w-6 h-6" /> The Kill Switch
                     </h3>
                     <p className="text-red-400 font-bold uppercase tracking-widest text-xs mb-4 animate-pulse">Tamper-Evident Invalidation</p>
                     <p className="text-neutral-400 text-lg md:text-xl leading-relaxed mb-6 font-sans">
                        If the Android system detects any new biometric data has been added to the phone, the security chip instantly considers the original key compromised.
                     </p>
                     <div className="p-4 bg-red-950/20 border border-red-900/50 rounded-lg">
                        <p className="text-red-300/80 text-sm md:text-base leading-relaxed font-sans">
                           <strong className="text-red-400 font-mono">FRAUD NEUTRALIZED:</strong> The chip permanently refuses to use the original key. The "Key" has effectively dissolved. The student must re-register, and the spoofing attempt is blocked.
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right Side: Visual Animations */}
            <div className="w-full lg:w-1/2 h-1/2 lg:h-full bg-[#0a0a0a] relative flex items-center justify-center overflow-hidden">

               {/* Industrial Scanlines Overlay */}
               <div className="absolute inset-0 pointer-events-none opacity-20 z-50" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)" }} />

               {/* Background Glow */}
               <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] transition-colors duration-1000 
                  ${stage === 0 ? "bg-cyan-900/40" : stage === 1 ? "bg-emerald-900/40" : "bg-red-900/50"}`} />

               {/* Central Vault UI */}
               <div className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px] z-10 flex items-center justify-center">

                  {/* Stage 0: The Forge */}
                  <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${stage === 0 ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}`}>
                     {/* Silicon Chip */}
                     <div className="relative w-48 h-48 bg-neutral-900 border-4 border-neutral-700 rounded-xl shadow-[0_0_50px_rgba(6,182,212,0.15)] flex items-center justify-center overflow-hidden group">
                        {/* Chip Pins */}
                        <div className="absolute top-0 left-4 right-4 h-2 flex justify-between">
                           {[...Array(6)].map((_, i) => <div key={i} className="w-3 h-full bg-neutral-600" />)}
                        </div>
                        <div className="absolute bottom-0 left-4 right-4 h-2 flex justify-between">
                           {[...Array(6)].map((_, i) => <div key={i} className="w-3 h-full bg-neutral-600" />)}
                        </div>
                        <div className="absolute left-0 top-4 bottom-4 w-2 flex flex-col justify-between">
                           {[...Array(6)].map((_, i) => <div key={i} className="w-full h-3 bg-neutral-600" />)}
                        </div>
                        <div className="absolute right-0 top-4 bottom-4 w-2 flex flex-col justify-between">
                           {[...Array(6)].map((_, i) => <div key={i} className="w-full h-3 bg-neutral-600" />)}
                        </div>

                        {/* Laser Etching Animation */}
                        <div className="absolute inset-0 bg-cyan-500/10" />
                        <div className="absolute top-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-[scan_2s_ease-in-out_infinite]" />
                        
                        <div className="z-10 flex flex-col items-center justify-center">
                           <Key className="w-12 h-12 text-cyan-400 mb-2" />
                           <div className="flex gap-1">
                              {[...Array(8)].map((_, i) => (
                                 <div key={i} className="w-1 h-3 bg-cyan-500/50 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Stage 1: The Challenge */}
                  <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${stage === 1 ? "opacity-100 scale-100" : "opacity-0 scale-110 pointer-events-none"}`}>
                     <div className="relative w-full h-full flex flex-col items-center justify-center">
                        
                        {/* Fingerprint Scanner */}
                        <div className="relative w-32 h-40 border-2 border-emerald-900/50 rounded-[2rem] bg-black flex items-center justify-center overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.2)] z-20">
                           <Fingerprint className="w-16 h-16 text-emerald-500/80" />
                           {/* Scanning Line */}
                           <div className="absolute top-0 w-full h-1 bg-emerald-400 shadow-[0_0_15px_#34d399] animate-[scan_1.5s_ease-in-out_infinite]" />
                        </div>

                        {/* Circuit Path lighting up */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                           <path d="M 225 310 L 225 380 L 100 380 L 100 250" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="10 10" className="animate-[dash_1s_linear_infinite]" />
                           <path d="M 225 310 L 225 380 L 350 380 L 350 250" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="10 10" className="animate-[dash_1s_linear_infinite]" />
                        </svg>

                        {/* Success Nodes */}
                        <div className="absolute top-[210px] left-[70px] w-14 h-14 rounded-xl bg-emerald-950 border-2 border-emerald-500 flex items-center justify-center animate-pulse">
                           <ShieldCheck className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div className="absolute top-[210px] right-[70px] w-14 h-14 rounded-xl bg-emerald-950 border-2 border-emerald-500 flex items-center justify-center animate-pulse" style={{ animationDelay: "0.5s" }}>
                           <Key className="w-6 h-6 text-emerald-400" />
                        </div>

                     </div>
                  </div>

                  {/* Stage 2: The Kill Switch */}
                  <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${stage === 2 ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
                     <div className="relative w-full h-full flex items-center justify-center">
                        
                        {/* Red Alert Pulse Rings */}
                        <div className="absolute w-64 h-64 border-2 border-red-500/30 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                        <div className="absolute w-48 h-48 border-2 border-red-500/50 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" style={{ animationDelay: "0.4s" }} />

                        {/* Severed Connection */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                           {/* Broken Paths */}
                           <path d="M 225 225 L 225 100" fill="none" stroke="#ef4444" strokeWidth="6" strokeDasharray="10 20" className="opacity-50" />
                           <path d="M 125 225 L 50 150" fill="none" stroke="#ef4444" strokeWidth="4" className="opacity-30" />
                           <path d="M 325 225 L 400 150" fill="none" stroke="#ef4444" strokeWidth="4" className="opacity-30" />
                        </svg>

                        {/* Dissolving Key UI */}
                        <div className="relative w-40 h-40 bg-red-950/40 border border-red-800 rounded-2xl flex flex-col items-center justify-center backdrop-blur-sm z-20 overflow-hidden">
                           {/* Glitch / Static Effect Overlay */}
                           <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }} />
                           
                           <Flame className="w-12 h-12 text-red-500 mb-2 animate-bounce" />
                           <span className="text-red-400 font-mono font-black text-xs uppercase tracking-widest bg-red-950 px-2 py-1 border border-red-900">Key Purged</span>
                        </div>
                     </div>
                  </div>

               </div>

               {/* Stage Progress Indicators */}
               <div className="absolute bottom-8 right-8 flex gap-3 z-30">
                  {[0, 1, 2].map((i) => (
                     <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${stage === i ? (i === 0 ? "w-12 bg-cyan-500" : i === 1 ? "w-12 bg-emerald-500" : "w-12 bg-red-600") : "w-4 bg-neutral-800"}`} />
                  ))}
               </div>
            </div>
         </div>

         <style dangerouslySetInnerHTML={{
            __html: `
        @keyframes scan {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
        @keyframes dash {
          to { stroke-dashoffset: -20; }
        }
      `}} />
      </section>
   );
}
