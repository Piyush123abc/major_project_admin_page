"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";
import { Radio } from "lucide-react";

export default function LiveTracker({ onNavigate }: { onNavigate?: () => void }) {
    const [activeSessions, setActiveSessions] = useState<number[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) return; // Don't fetch for visitors

        const fetchActive = async () => {
            try {
                const res = await api.get("/session/teacher/sessions/active/");
                setActiveSessions(res.data.active_sessions || []);
            } catch (error) {
                console.error("Failed to check active sessions", error);
            }
        };

        fetchActive();
        const interval = setInterval(fetchActive, 5000);
        return () => clearInterval(interval);
    }, []);

    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    if (!token) {
        return (
            <div className="px-4 py-3 bg-gray-900/30 rounded-lg border border-gray-800/50">
                <p className="text-[10px] text-gray-500 italic text-center">Login to view live sessions</p>
            </div>
        );
    }

    if (activeSessions.length === 0) {
        return (
            <div className="px-4 py-3 bg-gray-900/30 rounded-lg border border-gray-800/50">
                <p className="text-xs text-gray-500 italic text-center">No active sessions</p>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {activeSessions.map((id) => (
                <Link
                    key={id}
                    href={`/monitor/${id}`}
                    onClick={onNavigate}
                    className="flex items-center justify-between px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-all group"
                >
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Radio className="w-4 h-4 text-red-500" />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-red-400">Classroom {id}</p>
                            <p className="text-[10px] text-red-500/70 font-medium">Live Mesh Active</p>
                        </div>
                    </div>
                    <div className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full border border-red-500/30 group-hover:bg-red-500/40 transition-colors">
                        Track
                    </div>
                </Link>
            ))}
        </div>
    );
}
