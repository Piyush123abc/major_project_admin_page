"use client";

import { useEffect, useRef, useState } from "react";
import { FileText, FileX, Smartphone, CheckCircle, Users, User, Link as LinkIcon, Building2, Trash2 } from "lucide-react";

export default function DigitalProposalsSection() {
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

         // 3 Stages (33% chunks)
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
      <section ref={containerRef} className="relative bg-neutral-950 w-full border-t-2 border-neutral-900" style={{ height: "400vh", zIndex: 50 }}>
         {/* Sticky Viewport Container */}
         <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-neutral-950 to-[#0a0a1a]">

            {/* Title Area */}
            <div className="absolute top-8 w-full text-center z-40">
               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950 text-purple-400 text-xs font-black uppercase tracking-[0.2em] mb-4 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                  <FileX className="w-4 h-4" /> The Paperless Campus
               </div>
               <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight px-4">
                  Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Proposals</span>
               </h2>
            </div>

            {/* Central Stage Area: Nodes & UI */}
            <div className="relative w-full h-[60vh] max-w-6xl mt-16 md:mt-24 flex items-center justify-center z-30">
               
               {/* Stage 0: Death of Paper Visual */}
               <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${stage === 0 ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}`}>
                  <div className="relative w-[300px] md:w-[600px] h-full flex items-center justify-between">
                     
                     {/* The Old Way */}
                     <div className="flex flex-col items-center opacity-30 blur-[2px] transition-all duration-1000 -translate-x-12">
                        <div className="w-24 h-32 md:w-32 md:h-40 border-4 border-neutral-700 bg-neutral-800 rounded-xl flex items-center justify-center mb-4 relative">
                           <FileText className="w-12 h-12 text-neutral-600" />
                           <div className="absolute -bottom-4 -right-4 bg-red-950 border border-red-500 rounded-full p-2">
                              <Building2 className="w-6 h-6 text-red-500" />
                           </div>
                        </div>
                        <div className="text-neutral-500 font-bold uppercase text-xs tracking-widest line-through">Office Visits</div>
                     </div>

                     {/* The Transformation Arrow */}
                     <div className="hidden md:flex flex-col items-center absolute left-1/2 -translate-x-1/2">
                        <div className="h-0.5 w-32 bg-gradient-to-r from-neutral-800 via-purple-500 to-purple-500 rounded-full relative">
                           <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 border-t-2 border-r-2 border-purple-500 rotate-45" />
                        </div>
                        <Trash2 className="w-5 h-5 text-neutral-600 mt-2" />
                     </div>

                     {/* The New Way */}
                     <div className="flex flex-col items-center z-10 translate-x-12">
                        <div className="w-32 h-64 border-4 border-neutral-800 bg-black rounded-[2rem] flex flex-col items-center p-3 shadow-[0_0_50px_rgba(168,85,247,0.15)] relative">
                           <div className="w-8 h-1 bg-neutral-800 rounded-full mb-4" />
                           <div className="w-full h-8 bg-purple-900/30 rounded border border-purple-500/50 mb-2 flex items-center px-2">
                              <span className="text-[8px] text-purple-400 font-bold">Med_Certificate.pdf</span>
                           </div>
                           <div className="w-full h-16 bg-neutral-900 rounded border border-neutral-800 mb-auto" />
                           <div className="w-full h-8 bg-purple-600 rounded-lg flex items-center justify-center text-[10px] font-bold text-white mt-4 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                              Submit Digital Request
                           </div>
                        </div>
                        <div className="text-purple-400 font-bold uppercase text-xs tracking-widest mt-4">1-Click Proposal</div>
                     </div>

                  </div>
               </div>

               {/* Stage 1: Instant Faculty Review */}
               <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${stage === 1 ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}`}>
                  <div className="flex items-center gap-12 md:gap-32">
                     {/* Incoming Notification */}
                     <div className="w-32 h-64 border-4 border-neutral-800 bg-black rounded-[2rem] flex flex-col p-3 relative shadow-2xl">
                        <div className="w-8 h-1 bg-neutral-800 rounded-full mx-auto mb-4" />
                        <div className="text-xs font-bold text-neutral-500 mb-2">Teacher App</div>
                        
                        <div className="bg-neutral-900 border border-purple-500/30 rounded-lg p-2 mb-2 shadow-[0_0_15px_rgba(168,85,247,0.1)] animate-bounce">
                           <div className="text-[10px] text-purple-400 font-bold">New Proposal</div>
                           <div className="text-[8px] text-neutral-400">Medical Leave - Alex C.</div>
                        </div>

                        <div className="mt-auto space-y-2">
                           <div className="w-full bg-emerald-600/20 border border-emerald-500 text-emerald-400 text-center py-1.5 rounded text-[10px] font-bold flex items-center justify-center gap-1">
                              <CheckCircle className="w-3 h-3" /> Approve
                           </div>
                           <div className="w-full bg-red-600/20 border border-red-500 text-red-400 text-center py-1.5 rounded text-[10px] font-bold">
                              Reject
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Stage 2: Group Proposal (Node Animation) */}
               <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${stage === 2 ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}`}>
                  <div className="relative w-full h-full flex items-center justify-center">
                     {/* The Central Event Node */}
                     <div className="absolute w-24 h-24 bg-pink-900/50 border-2 border-pink-500 rounded-full flex flex-col items-center justify-center z-20 shadow-[0_0_50px_rgba(236,72,153,0.3)]">
                        <Users className="w-6 h-6 text-pink-400 mb-1" />
                        <span className="text-[8px] font-bold text-pink-300 uppercase text-center leading-tight">Tech Fest<br/>Group</span>
                     </div>

                     {/* The Teacher Node Approving It */}
                     <div className="absolute top-8 w-16 h-16 bg-neutral-900 border-2 border-emerald-500 rounded-full flex items-center justify-center z-30">
                        <CheckCircle className="w-6 h-6 text-emerald-400" />
                     </div>
                     {/* Approval Laser */}
                     <div className="absolute top-16 h-32 w-1 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] z-10 animate-pulse" />

                     {/* The Attached Student Nodes */}
                     {[
                        { angle: 30, delay: "0s" },
                        { angle: 90, delay: "0.2s" },
                        { angle: 150, delay: "0.4s" },
                        { angle: 210, delay: "0.6s" },
                        { angle: 270, delay: "0.8s" },
                        { angle: 330, delay: "1.0s" },
                     ].map((node, i) => (
                        <div key={i} className="absolute" style={{ transform: `rotate(${node.angle}deg) translateY(120px)` }}>
                           <div className="relative" style={{ transform: `rotate(-${node.angle}deg)` }}>
                              <div className="w-12 h-12 bg-neutral-900 border border-neutral-700 rounded-full flex items-center justify-center relative overflow-hidden">
                                 {/* Green wave effect when approved */}
                                 <div className="absolute inset-0 bg-emerald-500/20 opacity-0 animate-[ping_2s_ease-in-out_infinite]" style={{ animationDelay: node.delay }} />
                                 <User className="w-4 h-4 text-neutral-500 absolute transition-opacity duration-1000 opacity-0" />
                                 <CheckCircle className="w-5 h-5 text-emerald-400 absolute transition-opacity duration-1000 opacity-100" />
                              </div>
                           </div>
                           {/* Connecting Link */}
                           <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[80px] h-[80px] w-0.5 bg-pink-500/30" />
                           <LinkIcon className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[40px] w-3 h-3 text-pink-500 bg-black" />
                        </div>
                     ))}
                  </div>
               </div>

            </div>

            {/* Bottom Narrative Text Cards */}
            <div className="absolute bottom-12 w-full max-w-4xl px-4 md:px-0 z-40">
               <div className="relative h-48 md:h-32">
                  
                  {/* Stage 0 Text */}
                  <div className={`absolute inset-0 flex flex-col items-center text-center transition-all duration-700 ${stage === 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}`}>
                     <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Death of the Physical Letter</h3>
                     <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-3xl bg-black/50 p-4 rounded-xl border border-neutral-800">
                        If a student misses a lecture for a legitimate reason (medical, academic event), they submit a digital proposal directly through the app. They attach medical certificates or event PDFs right from their phone. <strong className="text-purple-400">No manual letters. No going to the faculty office to change attendance.</strong>
                     </p>
                  </div>

                  {/* Stage 1 Text */}
                  <div className={`absolute inset-0 flex flex-col items-center text-center transition-all duration-700 ${stage === 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}`}>
                     <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Instant Faculty Review</h3>
                     <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-3xl bg-black/50 p-4 rounded-xl border border-neutral-800">
                        The faculty receives the proposal immediately on their phone via push notification. They can review the attached evidence and <strong className="text-emerald-400">Approve or Reject it with a single tap.</strong> Once approved, the system automatically updates the student's attendance record.
                     </p>
                  </div>

                  {/* Stage 2 Text */}
                  <div className={`absolute inset-0 flex flex-col items-center text-center transition-all duration-700 ${stage === 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}`}>
                     <h3 className="text-xl md:text-2xl font-bold text-white mb-3 flex items-center justify-center gap-2">
                        <LinkIcon className="w-5 h-5 text-pink-400" /> Group Proposals for Institutional Events
                     </h3>
                     <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-3xl bg-black/50 p-4 rounded-xl border border-pink-900/30">
                        When a large group misses a lecture due to a common activity (college fest, sports trip), one student creates a <strong className="text-pink-400">Common Group Proposal</strong>. Other students attach themselves to that single proposal. The faculty reviews it once, and <strong className="text-emerald-400">attendance is updated for all attached students simultaneously.</strong>
                     </p>
                  </div>

               </div>
            </div>

            {/* Stage Progress Indicators */}
            <div className="absolute bottom-6 flex gap-3 z-30">
               {[0, 1, 2].map((i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${stage === i ? "w-8 bg-purple-500" : "w-2 bg-neutral-800"}`} />
               ))}
            </div>

         </div>
      </section>
   );
}
