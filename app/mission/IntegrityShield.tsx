"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck, FileCode, Server, Terminal, Smartphone, Ban, Play, DownloadCloud, AlertTriangle } from "lucide-react";

export default function IntegrityShieldSection() {
   const containerRef = useRef<HTMLDivElement>(null);
   const [progress, setProgress] = useState(0);

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
         
         // Smooth continuous progress from 0 to 1
         setProgress(Math.max(0, Math.min(1, p)));
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
      <section ref={containerRef} className="relative bg-zinc-950 w-full" style={{ height: "400vh", zIndex: 40 }}>
         {/* Sticky Viewport Container */}
         <div className="sticky top-0 h-screen w-full overflow-hidden bg-zinc-950 flex flex-col justify-center">

            {/* Static Header */}
            <div className="absolute top-8 md:top-16 left-8 md:left-24 z-50">
               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 text-zinc-400 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-4 border border-zinc-800">
                  <ShieldCheck className="w-3 h-3 md:w-4 md:h-4 text-emerald-400" /> Google Play Integrity API
               </div>
               <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
                  The <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Integrity Shield</span>
               </h2>
               <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs md:text-sm mt-2">The Triple-Check Protocol</p>
            </div>

            {/* Horizontal Scrolling Track */}
            {/* The track is 300vw wide. We translate it left by up to 200vw. */}
            <div 
               className="flex h-[60vh] md:h-[70vh] items-center mt-24 md:mt-32 will-change-transform"
               style={{ 
                  width: "300vw",
                  transform: `translate3d(-${progress * 200}vw, 0, 0)`,
               }}
            >
               {/* ---------------- PANEL 1: APP INTEGRITY ---------------- */}
               <div className="w-screen h-full flex flex-col lg:flex-row items-center justify-center px-8 md:px-24 gap-12 lg:gap-24">
                  {/* Visual */}
                  <div className="w-full max-w-sm aspect-square relative flex items-center justify-center">
                     <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl" />
                     
                     <div className="relative w-48 h-48 md:w-64 md:h-64 border border-blue-500/30 bg-blue-950/20 rounded-full flex items-center justify-center overflow-hidden">
                        {/* Scanning Line */}
                        <div className="absolute top-0 w-full h-[2px] bg-blue-400 shadow-[0_0_15px_#60a5fa] animate-[scan_2s_ease-in-out_infinite]" />
                        
                        <div className="flex flex-col items-center gap-4 z-10">
                           <FileCode className="w-12 h-12 text-blue-400" />
                           <div className="bg-blue-950 border border-blue-500 px-3 py-1 rounded text-xs font-mono text-blue-300">
                              SHA256: e3b0c442...
                           </div>
                        </div>
                     </div>

                     <Server className="absolute top-0 right-0 w-16 h-16 text-slate-500 animate-pulse" />
                     
                     <svg className="absolute w-full h-full pointer-events-none z-10">
                        <path d="M 50% 50% L 90% 10%" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="6 6" className="animate-[dash_1s_linear_infinite_reverse]" />
                     </svg>
                  </div>

                  {/* Text */}
                  <div className="w-full max-w-lg">
                     <h3 className="text-2xl md:text-4xl font-black text-white mb-4">
                        1. App Integrity
                     </h3>
                     <h4 className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-6">The Binary Check</h4>
                     <p className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-6">
                        Google generates a cryptographic hash of the app's code. If even one line of your security logic is removed by an attacker, the hash changes.
                     </p>
                     <div className="p-5 bg-zinc-900 border-l-4 border-blue-500 rounded-r-xl">
                        <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                           <strong>Binary Fingerprinting.</strong> Google verifies that the app is 100% identical to the version published on the Play Store. If an attacker reverse-engineers the APK to bypass the BLE proximity checks, the Integrity API detects the modification and the server instantly blacklists the session.
                        </p>
                     </div>
                  </div>
               </div>

               {/* ---------------- PANEL 2: DEVICE INTEGRITY ---------------- */}
               <div className="w-screen h-full flex flex-col lg:flex-row items-center justify-center px-8 md:px-24 gap-12 lg:gap-24">
                  {/* Visual */}
                  <div className="w-full max-w-sm aspect-square relative flex items-center justify-center">
                     <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-3xl" />
                     
                     <div className="relative w-48 h-64 md:w-56 md:h-80 border-4 border-zinc-800 bg-zinc-900 rounded-[2rem] flex flex-col items-center justify-center overflow-hidden shadow-2xl">
                        
                        <div className="absolute top-4 w-12 h-1.5 bg-zinc-800 rounded-full" />
                        
                        <div className="w-24 h-24 bg-red-950/50 border border-red-500/50 rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden group">
                           <Terminal className="w-10 h-10 text-red-500 z-10" />
                           <div className="absolute inset-0 bg-red-500/20 mix-blend-overlay animate-pulse" />
                           <Ban className="absolute inset-0 w-full h-full text-red-500/80 z-20" />
                        </div>
                        
                        <div className="text-center font-mono">
                           <div className="text-red-400 text-xs font-bold mb-1">ROOT DETECTED</div>
                           <div className="text-zinc-600 text-[10px]">MEETS_DEVICE_INTEGRITY: FALSE</div>
                        </div>

                     </div>
                  </div>

                  {/* Text */}
                  <div className="w-full max-w-lg">
                     <h3 className="text-2xl md:text-4xl font-black text-white mb-4">
                        2. Device Integrity
                     </h3>
                     <h4 className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-6">The Environment Check</h4>
                     <p className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-6">
                        Checks the hardware itself to ensure it is not compromised by Root access, Unlocked Bootloaders, or running inside Emulators.
                     </p>
                     <div className="p-5 bg-zinc-900 border-l-4 border-emerald-500 rounded-r-xl">
                        <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                           <strong>Anti-Emulator & Root Detection.</strong> We ensure the app is running on a 'Genuine Android' environment. By verifying the <code>MEETS_DEVICE_INTEGRITY</code> verdict, we block rooted devices or virtual environments that could be used to spoof GPS, RSSI, or Bluetooth signals.
                        </p>
                     </div>
                  </div>
               </div>

               {/* ---------------- PANEL 3: ACCOUNT INTEGRITY ---------------- */}
               <div className="w-screen h-full flex flex-col lg:flex-row items-center justify-center px-8 md:px-24 gap-12 lg:gap-24">
                  {/* Visual */}
                  <div className="w-full max-w-sm aspect-square relative flex items-center justify-center">
                     <div className="absolute inset-0 bg-yellow-500/10 rounded-full blur-3xl" />
                     
                     <div className="relative w-full h-full flex flex-col items-center justify-center gap-6">
                        
                        {/* Official Source */}
                        <div className="flex flex-col items-center gap-2">
                           <div className="w-20 h-20 bg-zinc-900 border-2 border-yellow-500 rounded-[1.5rem] flex items-center justify-center shadow-[0_0_30px_rgba(234,179,8,0.2)]">
                              <Play className="w-10 h-10 text-yellow-400 fill-current" />
                           </div>
                           <span className="text-zinc-500 text-xs font-black uppercase tracking-widest">Verified License</span>
                        </div>

                        {/* Connection Flow */}
                        <svg className="w-2 h-16 overflow-visible">
                           <path d="M 4 0 L 4 64" stroke="#eab308" strokeWidth="4" strokeDasharray="6 6" className="animate-[dash_1s_linear_infinite_reverse]" />
                        </svg>

                        {/* Sideload Block */}
                        <div className="absolute left-[-20%] bottom-[10%] flex flex-col items-center gap-2 opacity-50 grayscale">
                           <div className="w-16 h-16 bg-zinc-900 border-2 border-red-500 rounded-[1rem] flex items-center justify-center relative">
                              <DownloadCloud className="w-8 h-8 text-red-500" />
                              <Ban className="absolute inset-0 w-full h-full text-red-500/80" />
                           </div>
                           <span className="text-red-500 text-[10px] font-black uppercase tracking-widest">Sideload Blocked</span>
                        </div>

                        {/* The App */}
                        <div className="flex flex-col items-center gap-2 z-10">
                           <div className="w-20 h-20 bg-emerald-950 border-2 border-emerald-500 rounded-[1.5rem] flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                              <ShieldCheck className="w-10 h-10 text-emerald-400" />
                           </div>
                           <span className="text-emerald-500 text-xs font-black uppercase tracking-widest">Authorized App</span>
                        </div>
                     </div>

                  </div>

                  {/* Text */}
                  <div className="w-full max-w-lg">
                     <h3 className="text-2xl md:text-4xl font-black text-white mb-4">
                        3. Account Integrity
                     </h3>
                     <h4 className="text-yellow-400 font-bold uppercase tracking-widest text-sm mb-6">The Licensing Check</h4>
                     <p className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-6">
                        Verifies that the app was actually installed by a legitimate user via the official Google Play Store.
                     </p>
                     <div className="p-5 bg-zinc-900 border-l-4 border-yellow-500 rounded-r-xl">
                        <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                           <strong>Official Distribution Check.</strong> This ensures the app wasn't sideloaded from a malicious third-party site. We only distribute session keys to apps that have a verified license, ensuring the 'Chain of Trust' starts at the Google Play Store.
                        </p>
                     </div>
                  </div>
               </div>

            </div>
            
            {/* Horizontal Scroll Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-900">
               <div 
                  className="h-full bg-gradient-to-r from-emerald-500 via-blue-500 to-yellow-500"
                  style={{ width: `${progress * 100}%` }}
               />
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
