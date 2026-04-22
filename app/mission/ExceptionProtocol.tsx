"use client";

import { useEffect, useRef, useState } from "react";
import { UserX, Users, CheckCircle2, AlertCircle, Smartphone, Laptop, Fingerprint } from "lucide-react";

export default function ExceptionProtocolSection() {
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
      <section ref={containerRef} className="relative bg-neutral-950 w-full border-t-2 border-neutral-800" style={{ height: "400vh", zIndex: 50 }}>
         {/* Sticky Viewport Container */}
         <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-neutral-950">

            {/* Title */}
            <div className="absolute top-8 w-full text-center z-40">
               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-950 text-orange-400 text-xs font-black uppercase tracking-[0.2em] mb-4 border border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                  <AlertCircle className="w-4 h-4" /> Fault Tolerance
               </div>
               <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight px-4">
                  The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">Human-Assisted</span> Protocol
               </h2>
            </div>

            {/* Main Content Area */}
            <div className="relative w-full h-full max-w-7xl mt-24 flex flex-col md:flex-row items-center justify-between px-4 md:px-12 z-30 gap-8">
               
               {/* Left Column: Explanations */}
               <div className="w-full md:w-1/2 h-[45vh] md:h-[60vh] relative">
                  
                  {/* Stage 0: The Problem */}
                  <div className={`absolute inset-0 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 md:p-10 flex flex-col justify-center transition-all duration-700 ${stage === 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}`}>
                     <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                           <Smartphone className="w-6 h-6 text-orange-400" />
                        </div>
                        <div>
                           <div className="text-orange-400 font-bold uppercase tracking-widest text-sm mb-1">The Edge Cases</div>
                           <h3 className="text-2xl md:text-3xl font-black text-white">When Technology Fails</h3>
                        </div>
                     </div>
                     <p className="text-neutral-300 text-lg md:text-xl leading-relaxed">
                        This layer handles the "edge cases"—students who are physically present but cannot complete the digital handshake due to technical issues like a dead battery, broken BLE, or a lost phone.
                     </p>
                     <p className="text-neutral-400 text-base md:text-lg mt-4">
                        Instead of a student just shouting "present!" and causing chaos, the process is digitized and peer-verified to save time and maintain order.
                     </p>
                  </div>

                  {/* Stage 1: The Flag */}
                  <div className={`absolute inset-0 bg-neutral-900 border border-blue-900/50 rounded-2xl shadow-2xl p-6 md:p-10 flex flex-col justify-center transition-all duration-700 ${stage === 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}`}>
                     <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                           <Users className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                           <div className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-1">Step 1</div>
                           <h3 className="text-2xl md:text-3xl font-black text-white">The "Flag for Review" Workflow</h3>
                        </div>
                     </div>
                     <ul className="space-y-6">
                        <li>
                           <h4 className="text-white font-bold text-lg mb-1 flex items-center gap-2"><UserX className="w-5 h-5 text-neutral-500" /> The Claim</h4>
                           <p className="text-neutral-400 text-base">The student with the issue informs a nearby friend.</p>
                        </li>
                        <li>
                           <h4 className="text-white font-bold text-lg mb-1 flex items-center gap-2"><Fingerprint className="w-5 h-5 text-blue-400" /> Peer Exception Log</h4>
                           <p className="text-neutral-400 text-base">The friend opens their app and enters the UID of the student with the issue into a dedicated Exception Request field.</p>
                        </li>
                     </ul>
                  </div>

                  {/* Stage 2: The Verification */}
                  <div className={`absolute inset-0 bg-neutral-900 border border-emerald-900/50 rounded-2xl shadow-2xl p-6 md:p-10 flex flex-col justify-center transition-all duration-700 ${stage === 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}`}>
                     <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                           <Laptop className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                           <div className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-1">Step 2</div>
                           <h3 className="text-2xl md:text-3xl font-black text-white">Faculty "Fast-Roll" Verification</h3>
                        </div>
                     </div>
                     <p className="text-neutral-300 text-lg mb-6">At the end of the session, the teacher's app fetches the Exception List from the Django backend.</p>
                     <ul className="space-y-4">
                        <li className="bg-black/50 p-3 rounded-lg border border-neutral-800">
                           <strong className="text-white block">Visual Audit</strong>
                           <span className="text-neutral-400 text-sm">The teacher's app displays the Photos and Names of only those few students on the exception list (e.g., 3 students out of 60).</span>
                        </li>
                        <li className="bg-black/50 p-3 rounded-lg border border-neutral-800">
                           <strong className="text-white block">Physical Identification</strong>
                           <span className="text-neutral-400 text-sm">The teacher asks those 3 students to stand up.</span>
                        </li>
                        <li className="bg-emerald-950/30 p-3 rounded-lg border border-emerald-900/50">
                           <strong className="text-emerald-400 block">One-Tap Approval</strong>
                           <span className="text-neutral-400 text-sm">With a quick visual match, the teacher taps "Mark Present". This takes seconds, rather than minutes, keeping the record 100% accurate.</span>
                        </li>
                     </ul>
                  </div>

               </div>

               {/* Right Column: Visual Mockups */}
               <div className="w-full md:w-1/2 h-[45vh] md:h-[60vh] relative flex items-center justify-center">
                  
                  {/* Stage 0: Dead Phone Visual */}
                  <div className={`absolute transition-all duration-700 ${stage === 0 ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
                     <div className="w-32 h-64 border-4 border-neutral-800 bg-neutral-900 rounded-[2rem] flex items-center justify-center relative shadow-2xl overflow-hidden">
                        <Smartphone className="w-12 h-12 text-neutral-600" />
                        <div className="absolute inset-0 bg-red-900/20" />
                     </div>
                  </div>

                  {/* Stage 1: Peer Exception UI Mockup */}
                  <div className={`absolute transition-all duration-700 ${stage === 1 ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
                     <div className="w-64 h-[400px] border-4 border-neutral-800 bg-black rounded-[2rem] flex flex-col p-4 shadow-2xl relative">
                        <div className="w-12 h-1 bg-neutral-800 rounded-full mx-auto mb-6" />
                        <h4 className="text-white font-bold mb-4">Exception Request</h4>
                        <div className="space-y-4 flex-1">
                           <div className="bg-neutral-900 p-3 rounded-lg border border-neutral-800">
                              <div className="text-xs text-neutral-500 mb-1">Student UID</div>
                              <div className="font-mono text-blue-400">UID-8829-K</div>
                           </div>
                           <div className="bg-neutral-900 p-3 rounded-lg border border-neutral-800">
                              <div className="text-xs text-neutral-500 mb-1">Reason</div>
                              <div className="text-white text-sm">Phone Battery Dead</div>
                           </div>
                        </div>
                        <div className="w-full bg-blue-600 text-white font-bold text-center py-3 rounded-xl">
                           Submit Flag
                        </div>
                     </div>
                  </div>

                  {/* Stage 2: Teacher iPad UI Mockup */}
                  <div className={`absolute transition-all duration-700 w-full max-w-md ${stage === 2 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12 pointer-events-none"}`}>
                     <div className="w-full bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl">
                        {/* Header */}
                        <div className="bg-neutral-950 p-4 border-b border-neutral-800 flex justify-between items-center">
                           <div className="text-white font-bold flex items-center gap-2"><AlertCircle className="w-4 h-4 text-orange-400" /> Exception Queue</div>
                           <div className="text-xs bg-neutral-800 px-2 py-1 rounded text-neutral-400">3 Pending</div>
                        </div>
                        {/* List */}
                        <div className="p-4 space-y-3">
                           {/* Student 1 */}
                           <div className="flex items-center justify-between bg-black p-3 rounded-lg border border-neutral-800">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center">
                                    <UserX className="w-5 h-5 text-neutral-500" />
                                 </div>
                                 <div>
                                    <div className="text-white font-bold text-sm">Alex Chen</div>
                                    <div className="text-neutral-500 text-xs">Battery Dead</div>
                                 </div>
                              </div>
                              <button className="bg-emerald-600/20 text-emerald-400 border border-emerald-900 px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1">
                                 <CheckCircle2 className="w-3 h-3" /> Approve
                              </button>
                           </div>
                           {/* Student 2 */}
                           <div className="flex items-center justify-between bg-black p-3 rounded-lg border border-neutral-800">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center">
                                    <UserX className="w-5 h-5 text-neutral-500" />
                                 </div>
                                 <div>
                                    <div className="text-white font-bold text-sm">Sarah Jenkins</div>
                                    <div className="text-neutral-500 text-xs">BLE Hardware Issue</div>
                                 </div>
                              </div>
                              <button className="bg-emerald-600/20 text-emerald-400 border border-emerald-900 px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1">
                                 <CheckCircle2 className="w-3 h-3" /> Approve
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>

               </div>
            </div>

            {/* Stage Progress Indicators */}
            <div className="absolute bottom-6 flex gap-3 z-30">
               {[0, 1, 2].map((i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${stage === i ? "w-8 bg-orange-500" : "w-2 bg-neutral-800"}`} />
               ))}
            </div>

         </div>
      </section>
   );
}
