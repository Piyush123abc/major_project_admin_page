"use client";

import Link from "next/link";
import { 
  ArrowLeft, Clock, Users, ShieldAlert,
  VolumeX, Sparkles, Target, Zap, MousePointer2,
  Camera, Fingerprint, Bluetooth, TrendingDown, AlertTriangle
} from "lucide-react";

const problems = [
  {
    id: 1,
    tag: "Time Loss",
    title: "Manual Roll Call",
    headline: "20–30% of every lecture is wasted before it even starts.",
    body: "Manual roll calls consume 10–15 minutes of a 50-minute session. Beyond the raw inefficiency, the method is trivially defeated by \"proxying\" — a student calls out \"present\" for an absent peer and the system is completely blind to it.",
    icon: Clock,
    iconBg: "bg-red-500",
    number: "01",
    accentColor: "#ef4444",
    lightBg: "bg-red-50",
    border: "border-red-200",
    tagColor: "bg-red-100 text-red-700",
    stat: "20-30%",
    statLabel: "Teaching time lost",
  },
  {
    id: 2,
    tag: "High Friction",
    title: "Face Recognition",
    headline: "Cameras create crowds, cost a fortune, and still aren't foolproof.",
    body: "Passing a scanner around disturbs classroom flow. Fixed-point scanners create massive bottlenecks at the entrance. The initial capital expenditure for specialized cameras, plus ongoing maintenance, makes this a heavy, ongoing financial burden for institutions.",
    icon: Camera,
    iconBg: "bg-orange-500",
    number: "02",
    accentColor: "#f97316",
    lightBg: "bg-orange-50",
    border: "border-orange-200",
    tagColor: "bg-orange-100 text-orange-700",
    stat: "₹₹₹",
    statLabel: "Capex per classroom",
  },
  {
    id: 3,
    tag: "Identity Gap",
    title: "RFID Cards",
    headline: "The system verifies the card. It has no idea who's holding it.",
    body: "RFID cards are frequently handed off to friends. There is zero binding between the physical token and the actual registered individual. It is not a student attendance system — it is an object presence system.",
    icon: ShieldAlert,
    iconBg: "bg-yellow-500",
    number: "03",
    accentColor: "#eab308",
    lightBg: "bg-yellow-50",
    border: "border-yellow-200",
    tagColor: "bg-yellow-100 text-yellow-700",
    stat: "0%",
    statLabel: "Identity verification",
  },
  {
    id: 4,
    tag: "Bottleneck",
    title: "Biometric Scanners",
    headline: "100 students. One door. One scanner. The math doesn't work.",
    body: "Fingerprint or iris scanners at the entrance create unavoidable queues. They fail to scale for large classrooms of 100+ students and are prohibitively expensive to install and network across every classroom on a large campus.",
    icon: Fingerprint,
    iconBg: "bg-purple-500",
    number: "04",
    accentColor: "#a855f7",
    lightBg: "bg-purple-50",
    border: "border-purple-200",
    tagColor: "bg-purple-100 text-purple-700",
    stat: "10 min",
    statLabel: "Queue time at 9 AM",
  },
  {
    id: 5,
    tag: "Spoof Risk",
    title: "Basic BLE Beacons",
    headline: "Passive signals can be captured from the hallway — or the internet.",
    body: "This modern approach has been conclusively defeated in research. Because basic BLE signals are passive, a student sitting outside the room, or forwarding the signal over the internet via a friend's phone, can be marked present without ever entering the classroom.",
    icon: Bluetooth,
    iconBg: "bg-blue-500",
    number: "05",
    accentColor: "#3b82f6",
    lightBg: "bg-blue-50",
    border: "border-blue-200",
    tagColor: "bg-blue-100 text-blue-700",
    stat: "100%",
    statLabel: "Defeated in research",
  },
  {
    id: 6,
    tag: "Noise Chaos",
    title: "Acoustic Dead Zones",
    headline: "In a room of 100 students, the back row simply cannot hear.",
    body: "In large Indian classrooms with 60–100 students, ambient noise levels routinely exceed 60-70 dB. A teacher's voice attenuates over distance. Students in the back rows are marked \"Absent\" not because they weren't there — but because the room itself failed them.",
    icon: VolumeX,
    iconBg: "bg-rose-500",
    number: "06",
    accentColor: "#f43f5e",
    lightBg: "bg-rose-50",
    border: "border-rose-200",
    tagColor: "bg-rose-100 text-rose-700",
    stat: "60-70dB",
    statLabel: "Avg. classroom noise",
  },
];

export default function MissionPage() {
  return (
    <div className="relative bg-white overflow-x-hidden">
      {/* ── HERO HEADER ── */}
      <div className="min-h-screen flex flex-col justify-center px-8 md:px-20 py-24 max-w-7xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-600 font-bold transition-colors group mb-16 w-fit"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>

        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-black uppercase tracking-[0.2em]">
            <Target className="w-3.5 h-3.5" />
            Project Mission
          </div>

          <h1 className="text-6xl md:text-[7rem] lg:text-[9rem] font-black text-gray-950 tracking-tighter leading-[0.85]">
            THE<br />
            <span className="text-blue-600">PROBLEM.</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl font-medium leading-relaxed">
            Every existing attendance method has a fundamental, documented failure. 
            We found 6 of them.
          </p>

          <div className="flex items-center gap-3 pt-8">
            <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center animate-bounce">
              <MousePointer2 className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <span className="text-gray-400 text-sm font-bold uppercase tracking-[0.2em]">Scroll to explore each failure</span>
          </div>
        </div>
      </div>

      {/* ── STICKY PROBLEM CARDS ── */}
      <div className="relative">
        {problems.map((problem, index) => {
          const Icon = problem.icon;
          return (
            <section
              key={problem.id}
              className="sticky top-0 h-screen w-full flex items-center justify-center"
              style={{ zIndex: index + 1 }}
            >
              {/* Full-bleed card */}
              <div className={`w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-7xl h-[calc(100vh-2rem)] md:h-[calc(100vh-3rem)] rounded-3xl ${problem.lightBg} border ${problem.border} shadow-2xl flex flex-col relative overflow-hidden`}>
                
                {/* ── TOP BAR ── */}
                <div className="flex items-center justify-between px-8 md:px-12 pt-8 shrink-0">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${problem.tagColor}`}>
                    <AlertTriangle className="w-3 h-3" />
                    {problem.tag}
                  </div>
                  <span className="text-gray-200 font-black text-sm tracking-[0.3em] uppercase">
                    {problem.number} / 06
                  </span>
                </div>

                {/* ── MAIN CONTENT: 2-col layout ── */}
                <div className="flex-1 flex flex-col lg:flex-row min-h-0">
                  
                  {/* LEFT: Text Content */}
                  <div className="flex-1 flex flex-col justify-center px-8 md:px-12 py-6 md:py-10 space-y-6 lg:max-w-[55%]">
                    
                    {/* Icon + Title row */}
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 md:w-16 md:h-16 ${problem.iconBg} rounded-2xl flex items-center justify-center shadow-lg shrink-0`}>
                        <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Failure Mode</p>
                        <h2 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight leading-none mt-0.5">
                          {problem.title}
                        </h2>
                      </div>
                    </div>

                    {/* Headline */}
                    <p className="text-2xl md:text-4xl lg:text-5xl font-black text-gray-800 leading-[1.1] tracking-tight">
                      {problem.headline}
                    </p>

                    {/* Divider */}
                    <div className="flex items-center gap-4">
                      <div className="h-px flex-1 bg-gray-200/80"></div>
                    </div>

                    {/* Body */}
                    <p className="text-base md:text-lg text-gray-500 leading-relaxed font-medium max-w-xl">
                      {problem.body}
                    </p>
                  </div>

                  {/* RIGHT: Stat + Visual */}
                  <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 gap-8">
                    
                    {/* Big Stat */}
                    <div className="text-center space-y-2">
                      <p 
                        className="font-black text-7xl md:text-9xl tracking-tighter leading-none"
                        style={{ color: problem.accentColor }}
                      >
                        {problem.stat}
                      </p>
                      <p className="text-sm font-black text-gray-400 uppercase tracking-[0.2em]">
                        {problem.statLabel}
                      </p>
                    </div>

                    {/* Decorative icon glow */}
                    <div className="relative flex items-center justify-center">
                      <div 
                        className="absolute w-48 h-48 rounded-full blur-3xl opacity-20"
                        style={{ backgroundColor: problem.accentColor }}
                      ></div>
                      <Icon 
                        className="relative z-10 w-24 h-24 md:w-32 md:h-32 opacity-10"
                        style={{ color: problem.accentColor }}
                      />
                    </div>
                  </div>
                </div>

                {/* ── BIG BACKGROUND NUMBER ── */}
                <div className="absolute -bottom-6 -right-4 font-black select-none pointer-events-none opacity-[0.04] text-[12rem] md:text-[18rem] leading-none tracking-tighter text-gray-900">
                  {problem.id}
                </div>
              </div>
            </section>
          );
        })}

        {/* ── SOLUTION TEASER ── */}
        <section className="sticky top-0 h-screen w-full flex items-center justify-center bg-gray-950 z-[100]">
          <div className="max-w-4xl w-full text-center px-8 space-y-10 text-white">
            <div className="flex flex-col items-center gap-6">
              <div className="w-20 h-20 bg-blue-600/20 rounded-[28px] flex items-center justify-center border border-blue-500/30 animate-bounce shadow-2xl shadow-blue-500/20">
                <Sparkles className="w-10 h-10 text-blue-400" />
              </div>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">
                ENOUGH<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">IS ENOUGH.</span>
              </h2>
              <p className="text-lg md:text-2xl text-gray-400 font-medium max-w-2xl leading-relaxed">
                We've mapped every failure. Now we're building the 
                <span className="text-white mx-2 border-b-2 border-blue-500">Peer-to-Peer Mesh</span>
                that eliminates them all.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl relative overflow-hidden hover:border-blue-500/30 transition-colors">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                Coming Next
              </div>
              <h4 className="text-2xl md:text-4xl font-black tracking-tight text-gray-200">
                [ TODO: MESH ARCHITECTURE & PROJECT FLOW ]
              </h4>
              <p className="text-gray-600 font-bold uppercase tracking-widest text-xs mt-3">
                Protocol v1.0.0-dev • Visuals & Design Coming Soon
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ── FOOTER ── */}
      <footer className="relative bg-gray-950 py-16 text-center z-[101]">
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
