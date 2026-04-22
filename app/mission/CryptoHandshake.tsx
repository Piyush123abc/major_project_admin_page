"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal, Lock, Clock, Signal, UserCheck, ShieldCheck, Cpu, Smartphone, Scan } from "lucide-react";

export default function CryptoHandshakeSection() {
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

         // 4 Stages (25% scroll chunks)
         const newStage = currentProgress < 0.25 ? 0 :
            currentProgress < 0.50 ? 1 :
               currentProgress < 0.75 ? 2 : 3;

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
      <section ref={containerRef} className="relative bg-neutral-950 w-full" style={{ height: "500vh", zIndex: 50 }}>
         {/* Sticky Viewport Container */}
         <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden border-t-2 border-neutral-900 bg-neutral-950">

            {/* Static Background Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(#00ff00 1px, transparent 1px), linear-gradient(90deg, #00ff00 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

            {/* Title */}
            <div className="absolute top-8 w-full text-center z-40">
               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black text-green-400 text-xs font-black uppercase tracking-[0.2em] mb-4 border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                  <Terminal className="w-4 h-4" /> The 3-Step Handshake
               </div>
               <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight px-4">
                  Military-Grade <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500">P2P Verification</span>
               </h2>
            </div>

            {/* Main Stage Area */}
            <div className="relative w-full h-full max-w-7xl mt-16 flex flex-col items-center justify-center px-4 md:px-8 z-30">
               
               {/* TOP ROW: Dual Phones & Radar Trace */}
               <div className="relative w-full max-w-5xl h-[30vh] flex items-center justify-between mb-8">
                  
                  {/* Phone 1: The Client (Scanner) */}
                  <div className="w-24 h-40 md:w-32 md:h-56 border-4 border-neutral-800 bg-black rounded-[2rem] shadow-2xl relative flex flex-col items-center justify-between p-3 z-20">
                     <div className="w-8 h-1 bg-neutral-800 rounded-full mt-1" />
                     <div className={`transition-all duration-700 ${stage === 0 || stage === 2 ? "opacity-100 scale-100" : "opacity-50 scale-95"}`}>
                        <Scan className="w-8 h-8 md:w-12 md:h-12 text-blue-400 animate-pulse mx-auto" />
                        <div className="text-center mt-2 hidden md:block">
                           <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Client</div>
                        </div>
                     </div>
                     <div className="w-full border-t border-neutral-900 mt-auto pt-2 flex justify-center">
                        <div className="w-6 h-1 bg-neutral-900 rounded-full" />
                     </div>

                     {/* Stopwatch Visual for Stage 0 & 2 */}
                     <div className={`absolute -right-6 top-[20%] transition-opacity duration-500 ${stage === 0 || stage === 2 ? "opacity-100" : "opacity-0"}`}>
                        <div className="w-10 h-10 bg-neutral-900 border-2 border-yellow-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                           <Clock className={`w-5 h-5 text-yellow-400 ${stage === 0 ? "animate-spin" : ""}`} />
                        </div>
                     </div>
                  </div>

                  {/* Data Packet Animations (Flying between phones) */}
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-10">
                     {/* Stage 0: Left to Right Path */}
                     <div className={`absolute w-1/2 flex flex-col items-center justify-center transition-all duration-300 ${stage === 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                        <div className="bg-blue-900/80 border border-blue-500 text-blue-200 text-[10px] md:text-xs font-mono px-3 py-1 rounded-full mb-2 animate-pulse whitespace-nowrap shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                           Encrypted Payload Sent...
                        </div>
                        <div className="w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-400 to-blue-500/0" />
                     </div>

                     {/* Stage 1 & 2: Right to Left Path (Echo) */}
                     <div className={`absolute w-1/2 flex flex-col items-center justify-center transition-all duration-300 ${stage === 1 || stage === 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                        <div className="bg-green-900/80 border border-green-500 text-green-200 text-[10px] md:text-xs font-mono px-3 py-1 rounded-full mb-2 animate-pulse whitespace-nowrap shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                           {stage === 2 ? "42ms Latency - VERIFIED" : "Echoing Token + UUID..."}
                        </div>
                        <div className="w-full h-1 bg-gradient-to-l from-green-500/0 via-green-400 to-green-500/0" />
                     </div>
                  </div>

                  {/* Phone 2: The Server (Neighbor) */}
                  <div className="w-24 h-40 md:w-32 md:h-56 border-4 border-neutral-800 bg-black rounded-[2rem] shadow-2xl relative flex flex-col items-center justify-between p-3 z-20">
                     <div className="w-8 h-1 bg-neutral-800 rounded-full mt-1" />
                     <div className={`transition-all duration-700 ${stage === 1 ? "opacity-100 scale-100" : "opacity-50 scale-95"}`}>
                        <Smartphone className="w-8 h-8 md:w-12 md:h-12 text-emerald-400 animate-pulse mx-auto" />
                        <div className="text-center mt-2 hidden md:block">
                           <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Neighbor</div>
                        </div>
                     </div>
                     <div className="w-full border-t border-neutral-900 mt-auto pt-2 flex justify-center">
                        <div className="w-6 h-1 bg-neutral-900 rounded-full" />
                     </div>
                  </div>

               </div>

               {/* BOTTOM ROW: Massive Explanation Cards */}
               <div className="relative w-full max-w-4xl h-[45vh] z-30">
                  
                  {/* Stage 0: The Challenge */}
                  <div className={`absolute inset-0 bg-neutral-900 border border-blue-900/50 rounded-2xl shadow-2xl p-6 md:p-10 flex flex-col justify-center transition-all duration-700 ${stage === 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}`}>
                     <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                           <Cpu className="w-6 h-6 text-blue-400 animate-[spin_4s_linear_infinite]" />
                        </div>
                        <div>
                           <div className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-1">Step 1</div>
                           <h3 className="text-2xl md:text-4xl font-black text-white">The Challenge</h3>
                        </div>
                     </div>
                     <p className="text-neutral-300 text-lg md:text-xl leading-relaxed">
                        Initiating the Challenge. The client generates a unique, session-scoped <strong className="text-blue-400">HMAC-SHA256</strong> token and encrypts it with a symmetric Key (K1).
                     </p>
                     
                     {/* The Math Block */}
                     <div className="mt-4 bg-black/80 border border-blue-900/50 rounded-xl p-4 font-mono text-xs md:text-sm shadow-inner">
                        <div className="text-blue-500/50 uppercase tracking-widest text-[10px] mb-2">Cryptographic Construction</div>
                        <div className="text-blue-300 mb-1">
                           <span className="text-blue-400 font-bold">Token</span> = HMAC_SHA256(Session_Seed, Counter_n)
                        </div>
                        <div className="text-blue-300">
                           <span className="text-blue-400 font-bold">Payload</span> = AES_GCM_Encrypt(K1, Token || Client_UUID)
                        </div>
                     </div>

                     <div className="mt-4 flex items-center gap-3 bg-black/50 border border-neutral-800 p-4 rounded-xl">
                        <Clock className="w-6 h-6 text-yellow-400 animate-pulse shrink-0" />
                        <p className="text-neutral-400 text-sm md:text-base">
                           As the packet is written to the neighbor's GATT server, a high-precision <strong className="text-yellow-400">RTT (Round Trip Time)</strong> stopwatch begins ticking.
                        </p>
                     </div>
                  </div>

                  {/* Stage 1: The Blind Echo */}
                  <div className={`absolute inset-0 bg-neutral-900 border border-emerald-900/50 rounded-2xl shadow-2xl p-6 md:p-10 flex flex-col justify-center transition-all duration-700 ${stage === 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}`}>
                     <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                           <Signal className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                           <div className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-1">Step 2</div>
                           <h3 className="text-2xl md:text-4xl font-black text-white">The Blind Echo</h3>
                        </div>
                     </div>
                     <p className="text-neutral-300 text-lg md:text-xl leading-relaxed">
                        The Zero-Knowledge Echo. To maintain lightning speed and true decentralization, the neighbor's phone simply decrypts the packet and <strong className="text-emerald-400">echoes the token back</strong>.
                     </p>

                     {/* The Math Block */}
                     <div className="mt-4 bg-black/80 border border-emerald-900/50 rounded-xl p-4 font-mono text-xs md:text-sm shadow-inner">
                        <div className="text-emerald-500/50 uppercase tracking-widest text-[10px] mb-2">Cryptographic Echo</div>
                        <div className="text-emerald-300">
                           <span className="text-emerald-400 font-bold">Echo_Payload</span> = AES_GCM_Encrypt(K1, Token || Server_UUID)
                        </div>
                     </div>

                     <div className="mt-4 flex items-center gap-3 bg-black/50 border border-neutral-800 p-4 rounded-xl">
                        <Smartphone className="w-6 h-6 text-neutral-400 shrink-0" />
                        <p className="text-neutral-400 text-sm md:text-base">
                           It appends its own Hardware UUID to the payload. This proves the neighbor is 'Listening' and physically present without needing the sender's private keys.
                        </p>
                     </div>
                  </div>

                  {/* Stage 2: The Final Judgment */}
                  <div className={`absolute inset-0 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 md:p-10 flex flex-col justify-center transition-all duration-700 ${stage === 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}`}>
                     <div className="flex justify-between items-end mb-6">
                        <div>
                           <div className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-1">Step 3</div>
                           <h3 className="text-2xl md:text-4xl font-black text-white">The Anti-Cheat Engine</h3>
                        </div>
                        <div className="text-yellow-400 font-bold flex items-center gap-2 bg-yellow-500/10 px-3 py-1.5 rounded-lg border border-yellow-500/30">
                           <Clock className="w-5 h-5" /> STOPPED
                        </div>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-black p-4 rounded-xl border border-neutral-800 flex flex-col gap-1">
                           <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-neutral-500" /> <span className="text-white font-bold text-lg">RTT &lt; 150ms</span></div>
                           <div className="text-emerald-400 font-mono text-sm">✓ Relay Defense Active</div>
                        </div>
                        <div className="bg-black p-4 rounded-xl border border-neutral-800 flex flex-col gap-1">
                           <div className="flex items-center gap-2"><UserCheck className="w-5 h-5 text-neutral-500" /> <span className="text-white font-bold text-lg">UUID Match</span></div>
                           <div className="text-emerald-400 font-mono text-sm">✓ Hardware Verified</div>
                        </div>
                        <div className="bg-black p-4 rounded-xl border border-neutral-800 flex flex-col gap-1">
                           <div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-neutral-500" /> <span className="text-white font-bold text-lg">HMAC Integrity</span></div>
                           <div className="text-emerald-400 font-mono text-sm">✓ Token Valid</div>
                        </div>
                        <div className="bg-black p-4 rounded-xl border border-neutral-800 flex flex-col gap-1">
                           <div className="flex items-center gap-2"><Signal className="w-5 h-5 text-neutral-500" /> <span className="text-white font-bold text-lg">RSSI Bounding</span></div>
                           <div className="text-emerald-400 font-mono text-sm">✓ Proximity Confirmed</div>
                        </div>
                     </div>
                  </div>

               </div>
            </div>

            {/* Bottom Text Explanations */}
            <div className="absolute bottom-8 w-full px-8 text-center z-40 max-w-4xl opacity-0">
               {/* Hiding the bottom text entirely to let the massive beautiful center cards speak for themselves! */}
            </div>

            {/* Stage Progress Indicators */}
            <div className="absolute bottom-4 flex gap-3 z-30">
               {[0, 1, 2].map((i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${stage === i ? "w-8 bg-blue-500" : "w-2 bg-neutral-800"}`} />
               ))}
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
