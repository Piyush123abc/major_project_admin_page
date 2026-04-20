"use client";

import { LayoutDashboard, Shield, Users, Database, Zap } from "lucide-react";

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

      {/* ── PROJECT EXPLANATION (TODO) ── */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <LayoutDashboard className="w-6 h-6 text-blue-600" />
              Project Mission & Architecture
            </h2>
            
            {/* TODO: Add detailed project explanation here */}
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p className="p-6 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-gray-500 text-center font-medium">
                [ TODO: Implementation of project explanation goes here ]
              </p>
              <p>
                Our system leverages Bluetooth Low Energy (BLE) Mesh technology to create a self-healing, 
                decentralized network for automated attendance tracking in complex indoor environments.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex flex-col gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Secure Protocol</h3>
                <p className="text-sm text-gray-600 mt-1">End-to-end encrypted telemetry ensures data privacy.</p>
              </div>
            </div>
            <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 flex flex-col gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Real-time Sync</h3>
                <p className="text-sm text-gray-600 mt-1">Instant updates from the BLE mesh to the dashboard.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── QUICK STATS / SYSTEM STATUS ── */}
        <div className="space-y-6">
          <div className="bg-gray-900 rounded-2xl p-8 text-white shadow-xl flex flex-col gap-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              System Status
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">API Server</span>
                <span className="text-green-400 font-mono">ONLINE</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Database</span>
                <span className="text-green-400 font-mono">CONNECTED</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">BLE Gateway</span>
                <span className="text-yellow-400 font-mono">STANDBY</span>
              </div>
            </div>

            <hr className="border-gray-800" />

            <div className="space-y-1">
              <p className="text-3xl font-black text-blue-400">99.9%</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Uptime Reliability</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-6 border border-gray-300">
            <p className="text-xs font-bold text-gray-500 uppercase mb-4 tracking-tighter">Current Build</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-gray-800 font-bold">v2</div>
              <div>
                <p className="text-sm font-bold text-gray-800">Enterprise Edition</p>
                <p className="text-[10px] text-gray-500">BleMesh Core v4.1.0-stable</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}