"use client";

import Link from "next/link";
import {
  Shield, Users, Database, Zap,
  ArrowRight, Sparkles, Target, Microscope
} from "lucide-react";

export default function DashboardHome() {
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 md:p-16 text-white shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-sm font-medium">
              <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <span>Mesh Network Active</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              Next-Gen <br />
              <span className="text-blue-200">Attendance System</span>
            </h1>
            <p className="text-lg text-blue-50 max-w-xl leading-relaxed opacity-90">
              Welcome to the central command for the BLE Mesh-based attendance network.
              Monitor live sessions, manage database records, and ensure system integrity from one interface.
            </p>
          </div>

          {/* MAIN ILLUSTRATION PLACEHOLDER */}
          <div className="flex-1 flex justify-center items-center">
            <div className="w-64 h-64 md:w-80 md:h-80 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center relative group">
              <div className="absolute inset-0 bg-blue-400/20 blur-3xl rounded-full group-hover:bg-blue-400/40 transition-all"></div>
              <Shield className="w-32 h-32 md:w-40 md:h-40 text-white relative z-10 drop-shadow-2xl" />
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-12">
                <Database className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg transform -rotate-12">
                <Users className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 h-64 bg-black/10 rounded-full blur-2xl"></div>
      </section>

      {/* ── MISSION LINK SECTION ── */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="relative overflow-hidden bg-white rounded-3xl border border-gray-200 p-10 shadow-sm group hover:shadow-xl transition-all duration-500">
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors"></div>

            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 rotate-3 group-hover:rotate-6 transition-transform">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight">The Architectural Blueprint</h2>
                  <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mt-1">Defeating Proxies at the Hardware Level</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xl text-gray-600 leading-relaxed font-medium">
                  We have completely redesigned the core mechanics of campus attendance, shifting from a <strong className="text-gray-900">15-minute administrative burden</strong> to a <span className="text-blue-600 px-2 font-bold bg-blue-50 rounded-lg">30-second digital ripple</span>.
                </p>
                <p className="text-gray-500 leading-relaxed">
                  Dive deep into our comprehensive engineering manifesto. Discover how we utilize <strong className="text-gray-700">Hardware-Backed Biometric Vaults</strong>, the <strong className="text-gray-700">Google Play Integrity API</strong>, and a strict <strong className="text-gray-700">150ms RTT Cryptographic Handshake</strong> to mathematically defeat Relay, Replay, and Spoofing attacks while ensuring a zero-friction experience for both students and faculty.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/mission"
                  className="inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-xl hover:shadow-blue-500/20 active:scale-95 group"
                >
                  <span className="flex flex-col items-start">
                    <span className="block">Explore the Detailed Architecture</span>
                    <span className="text-blue-300 text-xs font-medium">Interactive 6-Part Technical Deep Dive</span>
                  </span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform ml-2" />
                </Link>

                <div className="flex items-center gap-2 text-gray-400 text-sm font-bold ml-2">
                  <Microscope className="w-4 h-4 text-blue-400" />
                  <span>Research Backed</span>
                </div>
              </div>
            </div>

            {/* Decorative Icon in BG */}
            <Sparkles className="absolute bottom-10 right-10 w-32 h-32 text-gray-50 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 -rotate-12 pointer-events-none" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100 flex flex-col gap-6 hover:bg-blue-100/50 transition-colors">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-gray-900">Secure Protocol</h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed font-medium">End-to-end encrypted telemetry ensures data privacy and network integrity.</p>
              </div>
            </div>
            <div className="p-8 bg-indigo-50 rounded-3xl border border-indigo-100 flex flex-col gap-6 hover:bg-indigo-100/50 transition-colors">
              <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-gray-900">Real-time Sync</h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed font-medium">Instant updates from the BLE mesh to the command dashboard.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── QUICK STATS / SYSTEM STATUS ── */}
        <div className="space-y-6">
          <div className="bg-gray-950 rounded-[32px] p-10 text-white shadow-2xl flex flex-col gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <h3 className="text-xl font-bold flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              System Status
            </h3>

            <div className="space-y-5">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-medium">API Server</span>
                <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-lg border border-green-500/20 text-[10px] font-black uppercase tracking-widest">ONLINE</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-medium">Database Cluster</span>
                <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-lg border border-green-500/20 text-[10px] font-black uppercase tracking-widest">CONNECTED</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-medium">Mesh Gateway</span>
                <span className="bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-lg border border-yellow-500/20 text-[10px] font-black uppercase tracking-widest">STANDBY</span>
              </div>
            </div>

            <hr className="border-gray-800" />

            <div className="space-y-1">
              <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">99.9<span className="text-2xl">%</span></p>
              <p className="text-xs text-gray-500 uppercase tracking-[0.2em] font-black mt-2">Uptime Reliability</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-[32px] p-8 border border-gray-300 shadow-sm">
            <p className="text-[10px] font-black text-gray-500 uppercase mb-4 tracking-[0.2em]">Build Artifact</p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-xl text-gray-900 font-black text-xl border border-gray-200">v2</div>
              <div>
                <p className="text-lg font-black text-gray-900 tracking-tight leading-none">Enterprise</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase mt-1 tracking-wider">BleMesh v4.1.0-stable</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}