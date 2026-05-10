"use client";

import Link from "next/link";
import { ArrowRight, Activity, Cpu, Network, Lock, FileText, ChevronRight } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// HARDCODED LINKS — Edit these if you need to update any external URLs or docs
// ─────────────────────────────────────────────────────────────────────────────
const LINKS = {
  googleGroup: "https://groups.google.com/g/ripple-class-testers",
  playStoreBeta: "https://play.google.com/apps/testing/com.piyush123abc.attendance_app",
  projectPdf: "/project-explanation.pdf",
  architecture: "/mission",
};
// ─────────────────────────────────────────────────────────────────────────────

export default function DashboardHome() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden rounded-[2rem] bg-white border border-gray-200 p-8 md:p-14 shadow-sm">
        {/* Subtle technical grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="relative z-10 flex flex-col gap-8 items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold tracking-widest uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            BLE Mesh Active
          </div>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 leading-[1.1]">
              Rapid, Proximity-Bound <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Identity Aggregation
              </span>
            </h1>
            <h2 className="text-xl md:text-2xl font-bold text-gray-600 mt-4 tracking-tight">
              Over Unreliable Short-Range Wireless Channels
            </h2>
            <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-3xl font-medium">
              A high-assurance application designed for classroom attendance and secure telemetry.
              Monitor live sessions, manage records, and enforce hardware-level system integrity in zero-trust environments.
            </p>
          </div>

          {/* Huge Architecture CTA right in the hero so it cannot be missed */}
          <div className="mt-2 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href={LINKS.architecture}
              className="group relative inline-flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-5 rounded-xl font-black text-lg md:text-xl overflow-hidden transition-all hover:bg-blue-700 hover:scale-[1.02] shadow-[0_0_40px_rgba(37,99,235,0.3)] active:scale-95"
            >
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                <div className="relative h-full w-8 bg-white/20" />
              </div>
              <span>Explore The Architecture</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href={LINKS.projectPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 px-8 py-5 rounded-xl font-bold text-lg md:text-xl transition-all active:scale-95"
            >
              <FileText className="w-5 h-5 text-gray-500" />
              <span>Read Original Paper (PDF)</span>
            </a>
          </div>

        </div>
      </section>

      {/* ── MAIN CONTENT GRID ── */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* ── LEFT / WIDE COL ── */}
        <div className="md:col-span-2 flex flex-col gap-6">

          {/* ── TESTER ONBOARDING CARD ── */}
          <div className="bg-gray-900 rounded-[2rem] p-8 md:p-10 text-white shadow-xl border border-gray-800">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                  <Activity className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight">Beta Tester Access</h3>
                  <p className="text-gray-400 text-sm font-medium">Join the field trial deployment</p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed mb-8">
                Want hands-on access to the application? Follow these two steps in order.
                <strong className="text-white bg-blue-500/20 px-2 py-0.5 rounded ml-1">Both steps must use the exact same Google account.</strong>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Step 1 */}
                <a
                  href={LINKS.googleGroup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-4 p-6 rounded-2xl bg-gray-800/50 border border-gray-700 hover:bg-gray-800 hover:border-gray-600 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-widest text-gray-500">Step 1</span>
                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-white mb-1">Join Google Group</p>
                    <p className="text-sm text-gray-400">Request access to the tester community</p>
                  </div>
                </a>

                {/* Step 2 */}
                <a
                  href={LINKS.playStoreBeta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-4 p-6 rounded-2xl bg-gray-800/50 border border-gray-700 hover:bg-gray-800 hover:border-gray-600 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-widest text-gray-500">Step 2</span>
                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-white mb-1">Play Store Download</p>
                    <p className="text-sm text-gray-400">Install the beta using the same account</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* ── TECHNICAL HIGHLIGHTS ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-8 bg-white rounded-[2rem] border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <Lock className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-black text-xl text-gray-900 mb-2">Cryptographic Handshake</h3>
              <p className="text-gray-500 leading-relaxed font-medium">150ms RTT protocol mathematically defeats relay and replay attacks at the hardware level.</p>
            </div>
            <div className="p-8 bg-white rounded-[2rem] border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <Network className="w-8 h-8 text-indigo-600 mb-4" />
              <h3 className="font-black text-xl text-gray-900 mb-2">Unreliable Channels</h3>
              <p className="text-gray-500 leading-relaxed font-medium">Engineered to aggregate identities seamlessly even across highly congested BLE environments.</p>
            </div>
          </div>
        </div>

        {/* ── RIGHT / STATUS COL ── */}
        <div className="space-y-6">
          {/* System status */}
          <div className="bg-white rounded-[2rem] p-8 border border-gray-200 shadow-sm">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-500" />
              System Status
            </h3>

            <div className="space-y-5">
              {[
                { label: "API Server", status: "Online", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
                { label: "Database Cluster", status: "Connected", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
                { label: "Mesh Gateway", status: "Standby", color: "text-amber-600 bg-amber-50 border-amber-200" },
              ].map(({ label, status, color }) => (
                <div key={label} className="flex justify-between items-center text-sm font-bold">
                  <span className="text-gray-600">{label}</span>
                  <span className={`px-3 py-1 rounded-md text-[10px] uppercase tracking-widest border ${color}`}>
                    {status}
                  </span>
                </div>
              ))}
            </div>

            <hr className="border-gray-100 my-6" />

            <div>
              <p className="text-4xl font-black text-gray-900">
                99.9<span className="text-xl text-gray-400">%</span>
              </p>
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold mt-1">
                Uptime Reliability
              </p>
            </div>
          </div>

          {/* Build info */}
          <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-200">
            <p className="text-[10px] font-black text-gray-400 uppercase mb-4 tracking-[0.2em]">Deployment</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-gray-900 font-black text-lg border border-gray-200">
                <Cpu className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <p className="text-base font-black text-gray-900 tracking-tight leading-none">v4.1.0-stable</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase mt-1 tracking-wider">Production Build</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}