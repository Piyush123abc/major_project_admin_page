"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft, Clock, ShieldAlert,
  VolumeX, Sparkles, Target, Zap, MousePointer2,
  Camera, Fingerprint, Bluetooth, AlertTriangle,
  UserCheck, ShieldOff, Smartphone, Network
} from "lucide-react";
import IntuitiveFlowSection from "./IntuitiveFlow";
import BiometricGateSection from "./BiometricGate";
import DeviceAnchorSection from "./DeviceAnchor";
import IntegrityShieldSection from "./IntegrityShield";
import CryptoHandshakeSection from "./CryptoHandshake";
import ProxyDefensesSection from "./ProxyDefenses";
import ExceptionProtocolSection from "./ExceptionProtocol";
import DigitalProposalsSection from "./DigitalProposals";
import ConclusionSection from "./Conclusion";

const problems = [
  {
    id: 1, tag: "Time Loss", title: "Manual Roll Call",
    headline: "20–30% of every lecture is wasted before it even starts.",
    body: 'Manual roll calls consume 10–15 minutes of a 50-minute session. Beyond the raw inefficiency, the method is trivially defeated by "proxying" — a student calls out "present" for an absent peer and the system is completely blind to it.',
    icon: Clock, iconBg: "bg-red-500", number: "01", accentColor: "#ef4444",
    lightBg: "bg-[#fff5f5]", border: "border-red-100", tagColor: "bg-red-100 text-red-700",
    stat: "30%", statLabel: "of teaching time — gone.",
  },
  {
    id: 2, tag: "High Friction", title: "Face Recognition",
    headline: "Cameras create crowds, cost a fortune, and still aren't foolproof.",
    body: "Passing a scanner around disturbs classroom flow. Fixed-point scanners create massive bottlenecks at the entrance. The initial capital expenditure for specialized cameras, plus ongoing maintenance, makes this a heavy, ongoing financial burden for institutions.",
    icon: Camera, iconBg: "bg-orange-500", number: "02", accentColor: "#f97316",
    lightBg: "bg-[#fff8f3]", border: "border-orange-100", tagColor: "bg-orange-100 text-orange-700",
    stat: "₹₹₹", statLabel: "Capex per classroom.",
  },
  {
    id: 3, tag: "Identity Gap", title: "RFID Cards",
    headline: "The system verifies the card. It has no idea who's holding it.",
    body: 'RFID cards are frequently handed off to friends. There is zero binding between the physical token and the actual registered individual. It is not a student attendance system — it is an object presence system.',
    icon: ShieldAlert, iconBg: "bg-yellow-500", number: "03", accentColor: "#ca8a04",
    lightBg: "bg-[#fffdf0]", border: "border-yellow-100", tagColor: "bg-yellow-100 text-yellow-700",
    stat: "0%", statLabel: "Identity verification.",
  },
  {
    id: 4, tag: "Bottleneck", title: "Biometric Scanners",
    headline: "100 students. One door. One scanner. The math doesn't work.",
    body: "Fingerprint or iris scanners at the entrance create unavoidable queues. They fail to scale for large classrooms (100+ students) and are prohibitively expensive to install and network across every classroom on a large campus.",
    icon: Fingerprint, iconBg: "bg-purple-500", number: "04", accentColor: "#a855f7",
    lightBg: "bg-[#faf5ff]", border: "border-purple-100", tagColor: "bg-purple-100 text-purple-700",
    stat: "10 min", statLabel: "Queue time every 9 AM.",
  },
  {
    id: 5, tag: "Spoof Risk", title: "Basic BLE Beacons",
    headline: "Passive signals can be captured from the hallway — or the internet.",
    body: "This approach has been conclusively defeated in research. Because basic BLE signals are passive, a student sitting outside the room, or forwarding the signal over the internet via a friend's phone, can be marked present without ever entering the classroom.",
    icon: Bluetooth, iconBg: "bg-blue-500", number: "05", accentColor: "#3b82f6",
    lightBg: "bg-[#f0f7ff]", border: "border-blue-100", tagColor: "bg-blue-100 text-blue-700",
    stat: "100%", statLabel: "Defeated in research.",
  },
  {
    id: 6, tag: "Noise Chaos", title: "Acoustic Dead Zones",
    headline: "In a room of 100 students, the back row simply cannot hear.",
    body: 'In large Indian classrooms with 60–100 students, ambient noise routinely exceeds 60-70 dB. A teacher\'s voice attenuates over distance. Students in the back rows are marked "Absent" not because they weren\'t there — but because the room itself failed them.',
    icon: VolumeX, iconBg: "bg-rose-500", number: "06", accentColor: "#f43f5e",
    lightBg: "bg-[#fff5f7]", border: "border-rose-100", tagColor: "bg-rose-100 text-rose-700",
    stat: "70 dB", statLabel: "Average classroom noise.",
  },
];



export default function MissionPage() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const scrollEl = document.querySelector("main > div") as HTMLElement;
    if (!scrollEl) return;

    const animate = () => {
      const scrollTop = scrollEl.scrollTop;
      const winH = scrollEl.clientHeight;

      // ── Problem cards stack ──
      const cardsStart = winH;
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const progress = (scrollTop - cardsStart - i * winH) / winH;
        let scale = 1, translateY = 0, opacity = 1, rotateX = 0;
        if (progress < 0) {
          const t = Math.max(0, 1 + progress);
          scale = 0.88 + 0.12 * t;
          translateY = (1 - t) * 100;
          opacity = Math.min(1, t * 2);
          rotateX = (1 - t) * 6;
        } else if (progress <= 1) {
          scale = 1 - progress * 0.05;
          translateY = progress * -40;
          opacity = 1 - progress * 0.15;
        } else {
          scale = 0.95; translateY = -40; opacity = 0.85;
        }
        card.style.transform = `perspective(1200px) translateY(${translateY}px) scale(${scale}) rotateX(${rotateX}deg)`;
        card.style.opacity = `${Math.max(0, Math.min(1, opacity))}`;
      });

    };

    scrollEl.addEventListener("scroll", animate, { passive: true });
    animate();
    return () => scrollEl.removeEventListener("scroll", animate);
  }, []);

  return (
    <div className="relative bg-white">

      {/* ── HERO ── */}
      <div className="min-h-screen flex flex-col justify-center px-8 md:px-20 py-24 max-w-7xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-600 font-bold transition-colors group mb-16 w-fit">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-black uppercase tracking-[0.2em]">
            <Target className="w-3.5 h-3.5" /> Project Mission
          </div>
          <h1 className="text-6xl md:text-[7rem] lg:text-[9rem] font-black text-gray-950 tracking-tighter leading-[0.85]">
            THE<br /><span className="text-blue-600">PROBLEM.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl font-medium leading-relaxed">
            Every existing attendance method has a fundamental, documented failure. We found 6 of them.
          </p>
          <div className="flex items-center gap-3 pt-8">
            <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center animate-bounce">
              <MousePointer2 className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <span className="text-gray-400 text-sm font-bold uppercase tracking-[0.2em]">Scroll to explore each failure</span>
          </div>
        </div>
      </div>

      {/* ── PROBLEM CARDS ── */}
      <div className="relative" style={{ height: `${problems.length * 100}vh` }}>
        {problems.map((problem, index) => {
          const Icon = problem.icon;
          return (
            <section key={problem.id} className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none" style={{ zIndex: index + 1 }}>
              <div
                ref={(el) => { cardRefs.current[index] = el; }}
                className={`w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-7xl h-[calc(100vh-2rem)] md:h-[calc(100vh-3rem)] rounded-3xl border ${problem.border} ${problem.lightBg} shadow-2xl overflow-hidden relative pointer-events-auto will-change-transform`}
                style={{ transformOrigin: "center bottom" }}
              >
                <div className="absolute top-0 left-0 h-1 w-full" style={{ backgroundColor: problem.accentColor }} />
                <div className="h-full flex flex-col md:flex-row">
                  <div className="flex-1 flex flex-col justify-between p-8 md:p-12 lg:p-16 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${problem.tagColor}`}>
                        <AlertTriangle className="w-2.5 h-2.5" />{problem.tag}
                      </div>
                      <span className="text-gray-200 font-black text-sm tracking-[0.2em] select-none">{problem.number} / 06</span>
                    </div>
                    <div className="space-y-6 md:space-y-8">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 md:w-14 md:h-14 ${problem.iconBg} rounded-2xl flex items-center justify-center shadow-lg shrink-0`}>
                          <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-0.5">Failure Mode</p>
                          <h2 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight leading-none">{problem.title}</h2>
                        </div>
                      </div>
                      <p className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 leading-[1.1] tracking-tight max-w-xl">{problem.headline}</p>
                      <p className="text-base md:text-lg text-gray-500 leading-relaxed font-medium max-w-lg">{problem.body}</p>
                    </div>
                    <div />
                  </div>
                  <div className="md:w-[38%] flex flex-col items-center justify-center p-8 md:p-12 gap-6 border-t md:border-t-0 md:border-l border-gray-100 bg-white/30">
                    <div className="text-center space-y-3">
                      <p className="font-black leading-none tracking-tighter" style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: problem.accentColor }}>{problem.stat}</p>
                      <p className="text-sm font-black text-gray-400 uppercase tracking-[0.15em]">{problem.statLabel}</p>
                    </div>
                    <div className="relative flex items-center justify-center mt-4">
                      <div className="absolute rounded-full blur-3xl opacity-25" style={{ width: "180px", height: "180px", backgroundColor: problem.accentColor }} />
                      <Icon className="relative z-10 opacity-[0.08]" style={{ width: "120px", height: "120px", color: problem.accentColor }} />
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-2 font-black select-none pointer-events-none leading-none tracking-tighter text-gray-900 opacity-[0.03]" style={{ fontSize: "clamp(8rem, 20vw, 22rem)" }}>{problem.id}</div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ── SOLUTION INTRO: EDITORIAL LAYOUT ── */}
      <section className="w-full bg-gray-950 py-32 px-8 md:px-16 relative overflow-hidden" style={{ zIndex: problems.length + 1 }}>
        {/* Ambient glows */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-900/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto space-y-16">

          {/* Label */}
          <div className="flex items-center gap-4">
            <div className="w-1 h-10 bg-blue-500 rounded-full" />
            <span className="text-blue-400 font-black uppercase tracking-[0.3em] text-xs">The Paradigm Shift</span>
          </div>

          {/* Enhanced Grid Card Layout for Solution Text */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-16 relative">

            {/* Block 1: Problem Eliminated */}
            <div className="relative overflow-hidden space-y-8 bg-gray-900/40 backdrop-blur-sm p-8 md:p-12 rounded-[2rem] border border-gray-800/50 hover:bg-gray-900/80 hover:border-red-500/30 transition-all duration-300 group">
              {/* Massive watermark number */}
              <div className="absolute -top-10 -right-4 text-[150px] font-black text-gray-800/10 group-hover:text-red-500/10 transition-colors pointer-events-none select-none">01</div>

              {/* Huge Icon */}
              <div className="w-24 h-24 md:w-32 md:h-32 bg-red-500/10 rounded-3xl flex items-center justify-center border border-red-500/20 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 relative z-10">
                <ShieldOff className="text-red-400 w-12 h-12 md:w-16 md:h-16" />
              </div>

              <div className="relative z-10">
                <p className="text-red-400/80 text-xs font-black uppercase tracking-[0.2em] mb-2">Phase 1: Eradication</p>
                <h3 className="text-3xl md:text-4xl font-black text-gray-200 mb-4">The Problem <span className="text-red-400">Eliminated</span></h3>
                <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                  Our system eliminates the <strong className="text-gray-200">"Central Point of Failure and Bottleneck"</strong> found in traditional scanners.
                </p>
              </div>
            </div>

            {/* Block 2: Validation Node */}
            <div className="relative overflow-hidden space-y-8 bg-gray-900/40 backdrop-blur-sm p-8 md:p-12 rounded-[2rem] border border-gray-800/50 hover:bg-gray-900/80 hover:border-blue-500/30 transition-all duration-300 md:translate-y-12 group">
              {/* Massive watermark number */}
              <div className="absolute -top-10 -right-4 text-[150px] font-black text-gray-800/10 group-hover:text-blue-500/10 transition-colors pointer-events-none select-none">02</div>

              {/* Huge Icon */}
              <div className="w-24 h-24 md:w-32 md:h-32 bg-blue-500/10 rounded-3xl flex items-center justify-center border border-blue-500/20 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300 relative z-10">
                <Smartphone className="text-blue-400 w-12 h-12 md:w-16 md:h-16" />
              </div>

              <div className="relative z-10">
                <p className="text-blue-400/80 text-xs font-black uppercase tracking-[0.2em] mb-2">Phase 2: Decentralization</p>
                <h3 className="text-3xl md:text-4xl font-black text-gray-200 mb-4">Every Phone a <span className="text-blue-400">Node</span></h3>
                <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                  Instead of 100 students waiting for one device, we transform every smartphone in the room into a <strong className="text-gray-200">Validation Node</strong>.
                </p>
              </div>
            </div>

            {/* Block 3: Live Connection Graph */}
            <div className="relative overflow-hidden space-y-8 bg-gray-900/40 backdrop-blur-sm p-8 md:p-12 rounded-[2rem] border border-gray-800/50 hover:bg-gray-900/80 hover:border-indigo-500/30 transition-all duration-300 group">
              {/* Massive watermark number */}
              <div className="absolute -top-10 -right-4 text-[150px] font-black text-gray-800/10 group-hover:text-indigo-500/10 transition-colors pointer-events-none select-none">03</div>

              {/* Huge Icon */}
              <div className="w-24 h-24 md:w-32 md:h-32 bg-indigo-500/10 rounded-3xl flex items-center justify-center border border-indigo-500/20 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 relative z-10">
                <Network className="text-indigo-400 w-12 h-12 md:w-16 md:h-16" />
              </div>

              <div className="relative z-10">
                <p className="text-indigo-400/80 text-xs font-black uppercase tracking-[0.2em] mb-2">Phase 3: Mesh Construction</p>
                <h3 className="text-3xl md:text-4xl font-black text-gray-200 mb-4">Live <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400">Graph</span></h3>
                <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                  Through a series of rapid secure P2P handshakes, the classroom automatically constructs a <strong className="text-gray-200">Live Connection Graph</strong>.
                </p>
              </div>
            </div>

            {/* Block 4: Root of Trust */}
            <div className="relative overflow-hidden space-y-8 bg-gray-900/40 backdrop-blur-sm p-8 md:p-12 rounded-[2rem] border border-gray-800/50 hover:bg-gray-900/80 hover:border-amber-500/30 transition-all duration-300 md:translate-y-12 group">
              {/* Massive watermark number */}
              <div className="absolute -top-10 -right-4 text-[150px] font-black text-gray-800/10 group-hover:text-amber-500/10 transition-colors pointer-events-none select-none">04</div>

              {/* Huge Icon */}
              <div className="w-24 h-24 md:w-32 md:h-32 bg-amber-500/10 rounded-3xl flex items-center justify-center border border-amber-500/20 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300 relative z-10">
                <UserCheck className="text-amber-400 w-12 h-12 md:w-16 md:h-16" />
              </div>

              <div className="relative z-10">
                <p className="text-amber-400/80 text-xs font-black uppercase tracking-[0.2em] mb-2">Phase 4: Validation</p>
                <h3 className="text-3xl md:text-4xl font-black text-gray-200 mb-4">Anchored by <span className="text-amber-400">Trust</span></h3>
                <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                  A secure web where presence is established by a <strong className="text-blue-300 font-black">proximity-based secure handshake connection</strong> and anchored to a single Root of Trust: <strong className="text-gray-200">The Professor</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE INTUITIVE FLOW (THE HOW) ── */}
      <IntuitiveFlowSection />

      {/* ── THE BIOMETRIC GATE (SECURITY VAULT) ── */}
      <BiometricGateSection />

      {/* ── THE DEVICE ANCHOR (HARDWARE LOCKING) ── */}
      <DeviceAnchorSection />

      {/* ── THE INTEGRITY SHIELD (PLAY INTEGRITY) ── */}
      <IntegrityShieldSection />

      {/* ── THE CRYPTOGRAPHIC HANDSHAKE (P2P VERIFICATION) ── */}
      <CryptoHandshakeSection />

      {/* ── PROXY DEFENSES (THREAT MODELING) ── */}
      <ProxyDefensesSection />

      {/* ── EXCEPTION PROTOCOL (FAULT TOLERANCE) ── */}
      <ExceptionProtocolSection />

      {/* ── DIGITAL PROPOSALS (PAPERLESS ADMIN) ── */}
      <DigitalProposalsSection />

      {/* ── FINAL CONCLUSION ── */}
      <ConclusionSection />

      {/* ── FOOTER ── */}
      <footer className="relative bg-gray-950 py-16 text-center" style={{ zIndex: problems.length + 3 }}>
        <div className="flex flex-wrap items-center justify-center gap-4 text-gray-700 text-xs font-black uppercase tracking-[0.2em]">
          <span>Whitepaper v0.8</span>
          <span className="text-gray-800">•</span>
          <span className="text-blue-700/60 italic">Secure Mesh Protocol</span>
          <span className="text-gray-800">•</span>
          <span>© 2026 BLE Mesh Attendance</span>
        </div>
      </footer>
    </div>
  );
}
