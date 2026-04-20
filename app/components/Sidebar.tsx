"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import LiveTracker from "./LiveTracker";

export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const standardLinks = [
        { name: "Students", href: "/students" },
        { name: "Teachers", href: "/teachers" },
        { name: "Classrooms", href: "/classrooms" },
    ];

    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    const isAuthenticated = !!token;

    return (
        <>
            {/* ── HAMBURGER BUTTON (Visible when sidebar is closed) ── */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed top-4 left-4 z-40 p-2.5 bg-gray-900 text-gray-300 rounded-lg border border-gray-800 shadow-lg hover:text-white hover:bg-gray-800 transition-all ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
                    }`}
            >
                <Menu className="w-5 h-5" />
            </button>

            {/* ── HOVER HITBOX ── */}
            <div
                className="fixed top-0 left-0 w-6 h-screen z-40"
                onMouseEnter={() => setIsOpen(true)}
            />

            {/* ── BACKDROP OVERLAY ── */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* ── THE SIDEBAR ── */}
            <div
                className={`fixed top-0 left-0 h-screen w-64 bg-gray-950 border-r border-gray-800 text-white flex flex-col z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                onMouseLeave={() => setIsOpen(false)}
            >
                {/* Header */}
                <div className="p-6 flex items-center justify-between border-b border-gray-800/50">
                    <h2 className="text-2xl font-bold text-blue-500 tracking-tight">Mesh Admin</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-1 text-gray-500 hover:text-white transition-colors md:hidden"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">

                    {/* Main Overview Link */}
                    <div className="space-y-1">
                        <Link
                            href="/"
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-2.5 rounded-lg transition-colors font-medium ${pathname === "/"
                                    ? "bg-blue-600 text-white shadow-md shadow-blue-900/20"
                                    : "text-gray-400 hover:bg-gray-800/80 hover:text-white"
                                }`}
                        >
                            Overview Dashboard
                        </Link>
                    </div>

                    {/* Standard Database Links */}
                    <div className="space-y-1">
                        <p className="px-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3 flex justify-between items-center">
                            Database Management
                            {!isAuthenticated && <span className="text-[8px] bg-gray-800 px-1.5 py-0.5 rounded text-gray-500 font-medium">Locked</span>}
                        </p>
                        {standardLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center justify-between px-4 py-2 rounded-lg transition-colors text-sm font-medium ${isActive
                                            ? "bg-blue-600/10 text-blue-400"
                                            : "text-gray-400 hover:bg-gray-800/80 hover:text-white"
                                        }`}
                                >
                                    {link.name}
                                    {!isAuthenticated && <span className="text-[10px] opacity-40">🔒</span>}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Security Links */}
                    <div className="space-y-3">
                        <p className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                            Live Attendance Tracker
                        </p>
                        <div className="px-2">
                            <LiveTracker onNavigate={() => setIsOpen(false)} />
                        </div>
                        
                        <Link
                            href="/security"
                            onClick={() => setIsOpen(false)}
                            className={`block mx-2 px-4 py-2.5 rounded-lg transition-colors text-sm font-bold ${pathname === "/security"
                                    ? "bg-red-500/10 text-red-500 border border-red-500/20"
                                    : "text-red-400/70 hover:bg-red-500/10 hover:text-red-400"
                                }`}
                        >
                            <span className="flex items-center justify-between">
                                Security Operations
                                {!isAuthenticated && <span className="text-[10px] opacity-40">🔒</span>}
                            </span>
                        </Link>
                    </div>
                </nav>

                {/* Footer / Logout / Login */}
                <div className="p-4 border-t border-gray-800 bg-gray-900/50">
                    {isAuthenticated ? (
                        <button
                            onClick={() => {
                                localStorage.removeItem("access_token");
                                localStorage.removeItem("refresh_token");
                                window.location.href = "/login";
                            }}
                            className="w-full bg-red-500/10 text-red-500 text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                        >
                            Terminate Session
                        </button>
                    ) : (
                        <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}
                            className="block w-full bg-blue-600 text-white text-center text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20"
                        >
                            Admin Login
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
}