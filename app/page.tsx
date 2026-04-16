"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";

export default function DashboardHome() {
  const [activeSessions, setActiveSessions] = useState<number[]>([]);

  // Poll for active sessions every 5 seconds
  useEffect(() => {
    const fetchActive = async () => {
      try {
        const res = await api.get("/session/teacher/sessions/active/");
        setActiveSessions(res.data.active_sessions);
      } catch (error) {
        console.error("Failed to check active sessions", error);
      }
    };

    fetchActive();
    const interval = setInterval(fetchActive, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">System Overview</h1>

      {activeSessions.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-red-600 flex items-center gap-2">
            <span className="w-3 h-3 bg-red-600 rounded-full animate-ping"></span>
            Live Attendance Sessions Detected
          </h2>
          {activeSessions.map((id) => (
            <div key={id} className="bg-red-50 border border-red-200 rounded-xl p-6 flex justify-between items-center shadow-sm">
              <div>
                <h3 className="text-xl font-bold text-red-800">Classroom ID: {id}</h3>
                <p className="text-red-600 text-sm mt-1">BLE Mesh network is currently active.</p>
              </div>
              <Link
                href={`/monitor/${id}`}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold shadow-md transition-all"
              >
                Open Live Radar
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
          <p className="text-gray-500 font-medium text-lg">No active attendance sessions right now.</p>
          <p className="text-gray-400 text-sm mt-2">Start a session from the Teacher App to see live telemetry.</p>
        </div>
      )}
    </div>
  );
}