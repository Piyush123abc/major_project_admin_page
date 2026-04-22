"use client";

import { useEffect, useRef, useState } from "react";
import { Target, Network, UserCheck, Smartphone, Camera, ShieldOff, QrCode, ArrowRightLeft, GitMerge, RouteOff } from "lucide-react";

export default function IntuitiveFlowSection() {
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

         const newStage = currentProgress < 0.20 ? 0 :
            currentProgress < 0.40 ? 1 :
               currentProgress < 0.60 ? 2 :
                  currentProgress < 0.80 ? 3 : 4;

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

   // 8x8 Grid Math
   const gridLines = [6, 18, 31, 43, 56, 68, 81, 93];

   return (
      <section ref={containerRef} className="relative bg-gray-950 w-full" style={{ height: "600vh", zIndex: 10 }}>
         <div className="sticky top-0 h-screen w-full flex flex-col lg:flex-row overflow-hidden border-t border-gray-800">

            {/* Left Side: Text Content */}
            <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex flex-col justify-center p-8 md:p-16 lg:p-24 relative z-20 bg-gray-950">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8 w-fit border border-blue-500/20">
                  The Architecture
               </div>

               {/* Dynamic Main Title */}
               <div className="relative h-20 md:h-24 mb-4">
                  <h2 className={`absolute inset-0 text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight transition-all duration-700 ${stage === 0 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}>
                     Target <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Lock-On</span>
                  </h2>
                  <h2 className={`absolute inset-0 text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight transition-all duration-700 ${stage === 1 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}>
                     Seeding the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Rows</span>
                  </h2>
                  <h2 className={`absolute inset-0 text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight transition-all duration-700 ${stage === 2 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}>
                     Bridging the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Grid</span>
                  </h2>
                  <h2 className={`absolute inset-0 text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight transition-all duration-700 ${stage === 3 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}>
                     Dynamic <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Bypass</span>
                  </h2>
                  <h2 className={`absolute inset-0 text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight transition-all duration-700 ${stage === 4 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}>
                     Path to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400">Root</span>
                  </h2>
               </div>

               <div className="relative h-72 md:h-80 w-full">
                  {/* Stage 0 */}
                  <div className={`absolute inset-0 transition-all duration-700 ${stage === 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}`}>
                     <h3 className="text-2xl md:text-3xl font-black text-gray-200 mb-4 flex items-center gap-3">
                        <Target className="text-blue-400 w-8 h-8" /> The Targeted Signal
                     </h3>
                     <p className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-4">The QR as a "Beacon"</p>
                     <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-4">
                        <strong className="text-gray-200">The Concept:</strong> The QR code acts as a precision <strong className="text-blue-300">Targeting Laser</strong>.
                     </p>
                     <p className="text-gray-500 text-base md:text-lg leading-relaxed">
                        <strong className="text-gray-300">The Logic:</strong> In a room with 60 Bluetooth signals, the QR provides the "Digital Fingerprint" of your neighbor's specific Bluetooth chip, allowing an instant, silent lock-on.
                     </p>
                  </div>

                  {/* Stage 1 */}
                  <div className={`absolute inset-0 transition-all duration-700 ${stage === 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}`}>
                     <h3 className="text-2xl md:text-3xl font-black text-gray-200 mb-4 flex items-center gap-3">
                        <ArrowRightLeft className="text-indigo-400 w-8 h-8" /> The Horizontal Chain
                     </h3>
                     <p className="text-indigo-400 font-bold uppercase tracking-widest text-xs mb-4">Primary Left/Right Link</p>
                     <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-4">
                        <strong className="text-gray-200">The Concept:</strong> The mesh mirrors the physical seating arrangement.
                     </p>
                     <p className="text-gray-500 text-base md:text-lg leading-relaxed">
                        <strong className="text-gray-300">The Logic:</strong> The algorithm first prioritizes horizontal proximity. You establish secure handshakes directly with the peers seated immediately to your left and right, forming the foundational rows of the network.
                     </p>
                  </div>

                  {/* Stage 2 */}
                  <div className={`absolute inset-0 transition-all duration-700 ${stage === 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}`}>
                     <h3 className="text-2xl md:text-3xl font-black text-gray-200 mb-4 flex items-center gap-3">
                        <GitMerge className="text-purple-400 w-8 h-8" /> The Vertical Bridge
                     </h3>
                     <p className="text-purple-400 font-bold uppercase tracking-widest text-xs mb-4">Row Completion & Edge Routing</p>
                     <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-4">
                        <strong className="text-gray-200">The Concept:</strong> Connecting the parallel rows.
                     </p>
                     <p className="text-gray-500 text-base md:text-lg leading-relaxed">
                        <strong className="text-gray-300">The Logic:</strong> What happens at the end of a bench? If there is a wall to your right, the system adaptively connects you to the student directly in front or behind you. This interlocks the horizontal chains into a unified grid.
                     </p>
                  </div>

                  {/* Stage 3 */}
                  <div className={`absolute inset-0 transition-all duration-700 ${stage === 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}`}>
                     <h3 className="text-2xl md:text-3xl font-black text-gray-200 mb-4 flex items-center gap-3">
                        <RouteOff className="text-red-400 w-8 h-8" /> The Fault-Tolerant Skip
                     </h3>
                     <p className="text-red-400 font-bold uppercase tracking-widest text-xs mb-4">Dynamic Path Rerouting</p>
                     <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-4">
                        <strong className="text-gray-200">The Concept:</strong> Hardware failure does not equal system failure.
                     </p>
                     <p className="text-gray-500 text-base md:text-lg leading-relaxed">
                        <strong className="text-gray-300">The Logic:</strong> If the student beside you has a dead battery, or an empty seat breaks the chain, you simply connect to the next available peer. The mesh routes *around* dead zones, ensuring nobody is left isolated.
                     </p>
                  </div>

                  {/* Stage 4 */}
                  <div className={`absolute inset-0 transition-all duration-700 ${stage === 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}`}>
                     <h3 className="text-2xl md:text-3xl font-black text-gray-200 mb-4 flex items-center gap-3">
                        <UserCheck className="text-amber-400 w-8 h-8" /> The Master Node
                     </h3>
                     <p className="text-amber-400 font-bold uppercase tracking-widest text-xs mb-4">Cryptographic Validation</p>
                     <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-4">
                        <strong className="text-gray-200">The Concept:</strong> The backend validates the graph geometry.
                     </p>
                     <p className="text-gray-500 text-base md:text-lg leading-relaxed">
                        <strong className="text-gray-300">The Logic:</strong> Once the grid is formed, if the server can trace a continuous mathematical path from your phone, jumping through verified peers, back to the <strong className="text-amber-300">Professor's Master Node</strong>, your presence is cryptographically proven.
                     </p>
                  </div>
               </div>
            </div>

            {/* Right Side: Visual Animations */}
            <div className="w-full lg:w-1/2 h-1/2 lg:h-full bg-gray-900 relative border-l border-gray-800 flex items-center justify-center overflow-hidden">

               {/* Dynamic Background Glow */}
               <div
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full blur-[100px] md:blur-[140px] transition-colors duration-1000 pointer-events-none 
                  ${stage === 0 ? "bg-blue-600/20" : stage === 1 ? "bg-indigo-600/20" : stage === 2 ? "bg-purple-600/20" : stage === 3 ? "bg-red-600/20" : "bg-amber-600/20"}`}
               />

               {/* Stage 0 Overlay: Targeted Scanner */}
               <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 z-30 pointer-events-none ${stage === 0 ? "opacity-100" : "opacity-0"}`}>
                  <div className="absolute top-[30%] right-[30%] w-20 h-20 rounded-full bg-blue-500/20 border border-blue-400 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.8)] animate-pulse">
                     <QrCode className="w-10 h-10 text-blue-400" />
                  </div>
                  <div className="absolute bottom-[25%] left-[25%] w-24 h-40 rounded-2xl border-2 border-gray-500 bg-gray-900 flex flex-col items-center justify-center shadow-2xl">
                     <Camera className="w-8 h-8 text-gray-400 mb-2" />
                     <div className="w-12 h-12 border border-blue-500/50 rounded flex items-center justify-center">
                        <div className="w-8 h-8 border border-blue-400 rounded animate-ping" />
                     </div>
                  </div>
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                     <line x1="30%" y1="70%" x2="68%" y2="35%" stroke="#3b82f6" strokeWidth="3" strokeDasharray="10 10" className="animate-[dash_1s_linear_infinite]" />
                  </svg>
               </div>

               {/* MAIN ENGINE: 8x8 GRID (64 Nodes) */}
               <div className="relative w-[340px] h-[340px] md:w-[480px] md:h-[480px] z-10">

                  {/* Connection Lines Layer */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">

                     {/* Horizontal Chains (Stage 1+) */}
                     <g className={`transition-opacity duration-700 ${stage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                        {gridLines.map((y, rowIdx) => (
                           <line key={`h-${rowIdx}`} x1="6%" y1={`${y}%`} x2="94%" y2={`${y}%`} stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[dash_1s_linear_infinite]" />
                        ))}
                     </g>

                     {/* Vertical Bridges (Stage 2+) */}
                     <g className={`transition-opacity duration-700 ${stage >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                        {/* Edge columns bridging */}
                        <line x1="6%" y1="6%" x2="6%" y2="94%" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[dash_1s_linear_infinite]" />
                        <line x1="94%" y1="6%" x2="94%" y2="94%" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[dash_1s_linear_infinite]" />
                        {/* Middle columns bridging */}
                        <line x1="43%" y1="6%" x2="43%" y2="94%" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[dash_1s_linear_infinite]" />
                        <line x1="68%" y1="6%" x2="68%" y2="94%" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[dash_1s_linear_infinite]" />
                     </g>

                     {/* Fault Tolerant Skip (Stage 3+) */}
                     {/* Draws a curved red line jumping OVER the dead nodes (Nodes at index 27, 28) */}
                     <g className={`transition-opacity duration-700 ${stage >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                        {/* Wipe out the base horizontal line for the skip */}
                        <line x1="31%" y1="43%" x2="68%" y2="43%" stroke="#111827" strokeWidth="4" />
                        {/* Curved skip connecting node 26 to node 29 */}
                        <path d="M 31% 43% Q 50% 25% 68% 43%" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="6 6" className="animate-[dash_1s_linear_infinite]" />

                        {/* Vertical skip connecting node 19 to 35, over dead node 27 */}
                        <line x1="43%" y1="31%" x2="43%" y2="56%" stroke="#111827" strokeWidth="4" />
                        <path d="M 43% 31% Q 30% 43% 43% 56%" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="6 6" className="animate-[dash_1s_linear_infinite]" />
                     </g>

                     {/* Root Validation Paths (Stage 4) */}
                     <g className={`transition-opacity duration-700 ${stage === 4 ? 'opacity-100' : 'opacity-0'}`}>
                        {/* Validation lines flowing down to the center bottom node (index 60) */}
                        <path d="M 18% 6% L 18% 94% M 81% 6% L 81% 94% M 43% 6% L 43% 31% L 56% 43% L 56% 94%" fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="8 8" className="animate-[dash_1s_linear_infinite]" />
                        <line x1="6%" y1="94%" x2="56%" y2="94%" stroke="#fbbf24" strokeWidth="3" className="animate-[dash_1s_linear_infinite]" />
                        <line x1="94%" y1="94%" x2="56%" y2="94%" stroke="#fbbf24" strokeWidth="3" className="animate-[dash_1s_linear_infinite]" />
                     </g>
                  </svg>

                  {/* 8x8 Phone Nodes Layer (64 Nodes) */}
                  <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-0">
                     {[...Array(64)].map((_, i) => {
                        // Dead nodes in the middle (Row 3, Col 3 and Row 3, Col 4)
                        const isDead = stage >= 3 && (i === 27 || i === 28);

                        // Bottom center node (Row 7, Col 4)
                        const isRoot = stage === 4 && i === 60;

                        // Faded out during Stage 0
                        const baseOpacity = stage === 0 ? "opacity-10" : "opacity-100";

                        return (
                           <div key={i} className={`flex items-center justify-center transition-all duration-500 ${baseOpacity}`}>
                              <div className={`w-5 h-5 md:w-7 md:h-7 rounded-full flex items-center justify-center transition-all duration-500
                                 ${isRoot ? "bg-amber-500 border-2 border-amber-300 text-amber-950 scale-[1.8] shadow-[0_0_25px_rgba(251,191,36,0.8)] z-20" :
                                    isDead ? "bg-red-500/20 border border-red-500/50 text-red-400 grayscale scale-75 z-0" :
                                       "bg-gray-800 border border-gray-700 text-gray-500 hover:border-gray-400 hover:text-gray-300 z-10"}`}
                              >
                                 {isRoot ? <UserCheck className="w-3 h-3 md:w-4 md:h-4" /> :
                                    isDead ? <ShieldOff className="w-3 h-3 md:w-4 md:h-4" /> :
                                       <Smartphone className="w-3 h-3 md:w-4 md:h-4" />}
                              </div>
                           </div>
                        );
                     })}
                  </div>
               </div>

               {/* Stage Progress Indicators */}
               <div className="absolute bottom-8 right-8 flex gap-3 z-30">
                  {[0, 1, 2, 3, 4].map((i) => (
                     <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${stage === i ? "w-12 bg-blue-500" : "w-4 bg-gray-800"}`} />
                  ))}
               </div>
            </div>
         </div>

         <style dangerouslySetInnerHTML={{
            __html: `
        @keyframes dash {
          to { stroke-dashoffset: -20; }
        }
      `}} />
      </section>
   );
}