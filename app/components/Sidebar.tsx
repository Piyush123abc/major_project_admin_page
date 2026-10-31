"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Menu,
    X,
    ShieldAlert,
    Database,
    Radio,
    LayoutDashboard,
    LogOut,
    LogIn,
    ChevronRight,
} from "lucide-react";
import LiveTracker from "./LiveTracker";

export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const standardLinks = [
        { name: "Students", href: "/students" },
        { name: "Teachers", href: "/teachers" },
        { name: "Classrooms", href: "/classrooms" },
    ];

    const token =
        typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    const isAuthenticated = !!token;

    return (
        <>
            {/* ── PERSISTENT TOGGLE BUTTON (Changes between Menu and X) ── */}
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label="Toggle Console Navigation"
                className="fixed top-4 left-4 z-50 p-2.5 bg-gray-900/90 backdrop-blur-md text-gray-200 rounded-xl border border-gray-700 shadow-xl hover:text-white hover:bg-gray-800 hover:border-gray-600 transition-all active:scale-95"
            >
                {isOpen ? <X className="w-5 h-5 text-gray-300" /> : <Menu className="w-5 h-5 text-gray-300" />}
            </button>

            {/* ── BACKDROP OVERLAY ── */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity animate-in fade-in duration-200"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* ── THE SIDEBAR ── */}
            <aside
                className={`fixed top-0 left-0 h-screen w-72 bg-gray-950 border-r border-gray-800 text-white flex flex-col z-40 transform transition-transform duration-300 ease-in-out shadow-2xl ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Header — Dedicated System Console Title */}
                <div className="pt-20 pb-6 px-6 border-b border-gray-800/80 bg-gray-900/30">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400">
                        <Radio className="w-3.5 h-3.5 animate-pulse" />
                        <span>Identity Node</span>
                    </div>
                    <h2 className="text-2xl font-black text-white tracking-tight mt-1">
                        System Console
                    </h2>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
                    {/* Main Dashboard Link */}
                    <div>
                        <Link
                            href="/"
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-sm ${pathname === "/"
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                                    : "text-gray-400 hover:bg-gray-800/80 hover:text-white"
                                }`}
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            <span>Overview Dashboard</span>
                        </Link>
                    </div>

                    {/* Database Management Section */}
                    <div className="space-y-1">
                        <p className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                            <Database className="w-3 h-3 text-gray-400" />
                            Database Management
                            {!isAuthenticated && (
                                <span className="ml-auto text-[8px] bg-gray-800 px-1.5 py-0.5 rounded text-gray-400 font-medium">
                                    Locked
                                </span>
                            )}
                        </p>
                        {standardLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl transition-all text-sm font-medium ${isActive
                                            ? "bg-blue-600/15 text-blue-400 border border-blue-500/30"
                                            : "text-gray-400 hover:bg-gray-800/60 hover:text-white"
                                        }`}
                                >
                                    <span>{link.name}</span>
                                    {!isAuthenticated ? (
                                        <span className="text-xs opacity-50">🔒</span>
                                    ) : (
                                        <ChevronRight className="w-4 h-4 text-gray-600" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Real-Time Telemetry & Security */}
                    <div className="space-y-2">
                        <p className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                            Live Telemetry
                        </p>
                        <div className="px-2">
                            <LiveTracker onNavigate={() => setIsOpen(false)} />
                        </div>

                        {/* UPGRADED: High-Visibility Clickable Security Button */}
                        <div className="pt-2 px-2">
                            <Link
                                href="/security"
                                onClick={() => setIsOpen(false)}
                                className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all border text-sm font-bold shadow-sm ${pathname === "/security"
                                        ? "bg-red-500/20 text-red-400 border-red-500/40 shadow-red-950/50"
                                        : "bg-red-950/20 border-red-900/40 text-red-400 hover:bg-red-900/30 hover:border-red-500/50 hover:text-red-300"
                                    }`}
                            >
                                <div className="flex items-center gap-2.5">
                                    <ShieldAlert className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
                                    <span>Security Operations</span>
                                </div>
                                {!isAuthenticated ? (
                                    <span className="text-xs opacity-50">🔒</span>
                                ) : (
                                    <ChevronRight className="w-4 h-4 text-red-400/60 group-hover:translate-x-0.5 transition-transform" />
                                )}
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Footer / Auth State */}
                <div className="p-4 border-t border-gray-800/80 bg-gray-900/40">
                    {isAuthenticated ? (
                        <button
                            onClick={() => {
                                localStorage.removeItem("access_token");
                                localStorage.removeItem("refresh_token");
                                window.location.href = "/login";
                            }}
                            className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-400 text-sm font-semibold px-4 py-2.5 rounded-xl border border-red-500/20 hover:bg-red-500 hover:text-white transition-all active:scale-95"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Terminate Session</span>
                        </button>
                    ) : (
                        <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white text-center text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                        >
                            <LogIn className="w-4 h-4" />
                            <span>Console Login</span>
                        </Link>
                    )}
                </div>
            </aside>
        </>
    );
}