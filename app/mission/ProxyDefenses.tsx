"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldAlert, Wifi, Router, Clock, ShieldX, Map, RadioTower, AlertTriangle } from "lucide-react";

export default function ProxyDefensesSection() {
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
      <section ref={containerRef} className="relative bg-neutral-950 w-full" style={{ height: "400vh", zIndex: 50 }}>
         <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden border-t-2 border-red-900/30 bg-neutral-950">

            {/* Title Area */}
            <div className="absolute top-8 w-full text-center z-40">
               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950 text-red-400 text-xs font-black uppercase tracking-[0.2em] mb-4 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                  <ShieldAlert className="w-4 h-4" /> Threat Modeling
               </div>
               <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight px-4">
                  How the Math Defeats <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">Proxies</span>
               </h2>
            </div>

            {/* Main Stage Area */}
            <div className="relative w-full h-full max-w-7xl mt-24 flex flex-col md:flex-row items-center justify-center px-4 md:px-12 z-30 gap-8">
               
               {/* Left Column: Visual Animations */}
               <div className="w-full md:w-1/2 h-[40vh] md:h-[60vh] relative flex items-center justify-center border-2 border-neutral-800 bg-black rounded-[2rem] overflow-hidden shadow-2xl">
                  
                  {/* Grid Background */}
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#ff0000 1px, transparent 1px), linear-gradient(90deg, #ff0000 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

                  {/* Visual 1: ESP32 Tunneling (Relay) */}
                  <div className={`absolute inset-0 transition-all duration-700 flex flex-col items-center justify-center ${stage === 0 ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
                     <div className="flex items-center justify-between w-3/4 mb-4">
                        <div className="flex flex-col items-center gap-2">
                           <div className="w-16 h-16 bg-neutral-900 border-2 border-neutral-700 rounded-xl flex items-center justify-center z-10">
                              <Router className="w-8 h-8 text-neutral-400" />
                           </div>
                           <span className="text-xs font-bold text-neutral-500 uppercase">Classroom ESP32</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                           <div className="w-16 h-16 bg-neutral-900 border-2 border-neutral-700 rounded-xl flex items-center justify-center z-10">
                              <Wifi className="w-8 h-8 text-neutral-400" />
                           </div>
                           <span className="text-xs font-bold text-neutral-500 uppercase">Home Network</span>
                        </div>
                     </div>
                     
                     {/* The Tunnel Line & Shield */}
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[20px] w-1/2 h-1 bg-neutral-800 rounded-full" />
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[20px] w-1/2 h-1 bg-red-500 rounded-full" style={{ width: "25%" }} />
                     
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[20px] flex flex-col items-center animate-bounce">
                        <ShieldX className="w-12 h-12 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
                        <span className="bg-red-950 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded mt-1 border border-red-500 whitespace-nowrap">RTT &gt; 150ms BLOCKED</span>
                     </div>
                  </div>

                  {/* Visual 2: Replay Attack */}
                  <div className={`absolute inset-0 transition-all duration-700 flex flex-col items-center justify-center ${stage === 1 ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
                     <div className="flex flex-col items-center gap-6">
                        {/* Clock */}
                        <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-700 p-3 rounded-xl shadow-lg">
                           <Clock className="w-6 h-6 text-yellow-500 animate-pulse" />
                           <div className="font-mono text-xl font-bold text-white tracking-widest flex items-center gap-1">
                              10:00:0<span className="text-yellow-500">2</span>
                           </div>
                        </div>

                        {/* Stale Token Injection */}
                        <div className="flex items-center gap-4">
                           <div className="bg-red-950/50 border border-red-900 p-3 rounded text-center">
                              <div className="text-[10px] text-red-400 uppercase font-bold mb-1">Stale Token Injection</div>
                              <div className="font-mono text-xs text-neutral-500 line-through">HMAC(Seed, n=1)</div>
                              <div className="text-[8px] text-neutral-600 mt-1">Recorded at 10:00:01</div>
                           </div>
                           <ShieldX className="w-8 h-8 text-red-500" />
                           <div className="bg-green-950/20 border border-green-900/50 p-3 rounded text-center opacity-50">
                              <div className="text-[10px] text-green-500/50 uppercase font-bold mb-1">Expected Token</div>
                              <div className="font-mono text-xs text-neutral-500">HMAC(Seed, n=2)</div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Visual 3: Hallway Spoofing (Radar) */}
                  <div className={`absolute inset-0 transition-all duration-700 flex flex-col items-center justify-center overflow-hidden ${stage === 2 ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
                     {/* The Classroom (Green Zone) */}
                     <div className="absolute w-64 h-64 border border-green-500/30 rounded-full bg-green-500/5 flex items-center justify-center z-10">
                        <div className="absolute w-48 h-48 border border-green-500/50 rounded-full" />
                        <div className="absolute w-32 h-32 border-2 border-green-500 rounded-full bg-green-500/10 shadow-[0_0_30px_rgba(34,197,94,0.2)]" />
                        <RadioTower className="w-8 h-8 text-green-400 animate-pulse relative z-20" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40px] text-[10px] text-green-400 font-bold bg-green-950/80 px-2 py-0.5 rounded border border-green-800">
                           -55 dBm Boundary
                        </div>
                     </div>

                     {/* The Wall */}
                     <div className="absolute left-[70%] top-0 bottom-0 w-2 bg-neutral-800 shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20" />
                     <div className="absolute left-[72%] top-[10%] text-neutral-500 font-bold uppercase text-[10px] tracking-widest z-20" style={{ writingMode: "vertical-rl" }}>
                        Classroom Wall
                     </div>

                     {/* The Attacker in the Hallway */}
                     <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center z-30">
                        <AlertTriangle className="w-6 h-6 text-red-500 mb-1 animate-bounce" />
                        <div className="bg-red-950 border border-red-500 px-2 py-1 rounded">
                           <div className="text-[10px] text-red-400 font-bold font-mono">-75 dBm (Too Weak)</div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Right Column: Narrative Text Cards */}
               <div className="w-full md:w-1/2 h-[40vh] md:h-[60vh] relative">
                  
                  {/* Scenario 1 Text */}
                  <div className={`absolute inset-0 bg-neutral-900 border-l-4 border-red-500 rounded-2xl shadow-2xl p-6 md:p-10 flex flex-col justify-center transition-all duration-700 ${stage === 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}`}>
                     <div className="text-red-500 font-bold uppercase tracking-widest text-sm mb-2">Scenario 1</div>
                     <h3 className="text-2xl md:text-3xl font-black text-white mb-6">The Relay Attack Killer <br/><span className="text-red-400 text-lg md:text-xl font-medium">(ESP32 Tunneling)</span></h3>
                     <p className="text-neutral-300 text-base md:text-lg leading-relaxed">
                        "A highly determined student might hide an ESP32 microcontroller inside the classroom to tunnel Bluetooth packets to their phone at home over Wi-Fi."
                     </p>
                     <div className="mt-6 bg-red-950/30 border border-red-900/50 p-4 rounded-xl">
                        <strong className="text-white block mb-2">The Mathematical Defense:</strong>
                        <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                           By enforcing a strict <strong>150ms RTT limit</strong>, we use the speed of light against attackers. The internet routing latency physically cannot complete the round-trip fast enough, immediately killing the handshake.
                        </p>
                     </div>
                  </div>

                  {/* Scenario 2 Text */}
                  <div className={`absolute inset-0 bg-neutral-900 border-l-4 border-yellow-500 rounded-2xl shadow-2xl p-6 md:p-10 flex flex-col justify-center transition-all duration-700 ${stage === 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}`}>
                     <div className="text-yellow-500 font-bold uppercase tracking-widest text-sm mb-2">Scenario 2</div>
                     <h3 className="text-2xl md:text-3xl font-black text-white mb-6">The Replay Attack Killer <br/><span className="text-yellow-400 text-lg md:text-xl font-medium">(Signal Recording)</span></h3>
                     <p className="text-neutral-300 text-base md:text-lg leading-relaxed">
                        "An attacker might use a sniffer to record a valid BLE handshake signal at 10:00:01 AM, hoping to replay it later to mark attendance again."
                     </p>
                     <div className="mt-6 bg-yellow-950/30 border border-yellow-900/50 p-4 rounded-xl">
                        <strong className="text-white block mb-2">The Mathematical Defense:</strong>
                        <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                           Because we use an <strong>incrementing counter (n)</strong> inside our HMAC formula, a token generated at 10:00:01 AM becomes mathematical 'Garbage' by 10:00:02 AM. Injected old tokens are instantly rejected.
                        </p>
                     </div>
                  </div>

                  {/* Scenario 3 Text */}
                  <div className={`absolute inset-0 bg-neutral-900 border-l-4 border-blue-500 rounded-2xl shadow-2xl p-6 md:p-10 flex flex-col justify-center transition-all duration-700 ${stage === 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}`}>
                     <div className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-2">Scenario 3</div>
                     <h3 className="text-2xl md:text-3xl font-black text-white mb-6">The Proximity Guarantee <br/><span className="text-blue-400 text-lg md:text-xl font-medium">(Hallway Spoofing)</span></h3>
                     <p className="text-neutral-300 text-base md:text-lg leading-relaxed">
                        "A student might stand in the hallway right outside the classroom door, trying to catch the legitimate BLE beacon from a friend inside."
                     </p>
                     <div className="mt-6 bg-blue-950/30 border border-blue-900/50 p-4 rounded-xl">
                        <strong className="text-white block mb-2">The Mathematical Defense:</strong>
                        <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                           We combine the RTT time-of-flight with a strict <strong>RSSI boundary (-55 to -70 dBm)</strong>. This creates a tight 'Physical Box' around the user. You can't just be 'near' the room; you have to be mathematically inside it.
                        </p>
                     </div>
                  </div>

               </div>
            </div>

            {/* Stage Progress Indicators */}
            <div className="absolute bottom-6 flex gap-3 z-30">
               {[0, 1, 2].map((i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${stage === i ? "w-8 bg-red-500" : "w-2 bg-neutral-800"}`} />
               ))}
            </div>

         </div>
      </section>
   );
}
