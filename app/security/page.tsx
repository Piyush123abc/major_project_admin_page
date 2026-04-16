"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { ShieldAlert, ShieldCheck, Activity, Terminal, AlertTriangle, AlertOctagon } from "lucide-react";

interface Anomaly {
    id: number;
    student_uid: string;
    student_name: string;
    anomaly_type: number;
    anomaly_type_display: string;
    device_id: string;
    timestamp: string;
    metadata: any;
}

type Severity = "critical" | "high" | "moderate";

function getSeverity(type: number): Severity {
    if (type === 5 || type === 6) return "critical";
    if (type === 3 || type === 4) return "high";
    return "moderate";
}

// Updated for tactical dark theme
const SEVERITY_BADGE: Record<Severity, string> = {
    critical: "bg-red-500/10 text-red-500 border-red-500/30",
    high: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    moderate: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
};

const SEVERITY_LABEL: Record<Severity, string> = {
    critical: "CRITICAL",
    high: "HIGH",
    moderate: "MODERATE",
};

export default function SecurityPage() {
    const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
    const [loading, setLoading] = useState(true);
    const [typeFilter, setTypeFilter] = useState("all");
    const [sevFilter, setSevFilter] = useState("all");

    const fetchAnomalies = async () => {
        try {
            const res = await api.get("/api/god-mode/anomalies/");
            setAnomalies(res.data);
        } catch (e) {
            console.error("Failed to fetch security logs", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnomalies();
        const interval = setInterval(fetchAnomalies, 5_000); // Increased frequency for security
        return () => clearInterval(interval);
    }, []);

    const filtered = anomalies.filter((a) => {
        if (typeFilter !== "all" && a.anomaly_type !== Number(typeFilter)) return false;
        const sev = getSeverity(a.anomaly_type);
        if (sevFilter === "critical" && sev !== "critical") return false;
        if (sevFilter === "high" && sev === "moderate") return false;
        return true;
    });

    const critCount = anomalies.filter((a) => getSeverity(a.anomaly_type) === "critical").length;
    const highCount = anomalies.filter((a) => getSeverity(a.anomaly_type) === "high").length;
    const modCount = anomalies.filter((a) => getSeverity(a.anomaly_type) === "moderate").length;
    const studentCount = new Set(anomalies.map((a) => a.student_uid)).size;

    // Determine overall threat level
    let threatLevel = "SECURE";
    let threatColor = "text-emerald-500 border-emerald-500/30 bg-emerald-500/10";
    let ThreatIcon = ShieldCheck;

    if (critCount > 5) {
        threatLevel = "SEVERE OUTBREAK";
        threatColor = "text-red-500 border-red-500/50 bg-red-500/10 animate-pulse";
        ThreatIcon = AlertOctagon;
    } else if (critCount > 0 || highCount > 5) {
        threatLevel = "ELEVATED RISK";
        threatColor = "text-orange-500 border-orange-500/30 bg-orange-500/10";
        ThreatIcon = AlertTriangle;
    }

    if (loading) return (
        <div className="flex h-64 items-center justify-center bg-zinc-950 rounded-xl border border-zinc-800">
            <div className="flex flex-col items-center gap-3">
                <Activity className="w-8 h-8 text-blue-500 animate-pulse" />
                <p className="text-sm text-blue-400 font-mono uppercase tracking-widest">Initializing Threat Telemetry...</p>
            </div>
        </div>
    );

    return (
        <div className="bg-zinc-950 rounded-xl border border-zinc-800 overflow-hidden shadow-2xl">

            {/* ── HEADER (THREAT INTELLIGENCE STYLE) ── */}
            <div className="p-6 border-b border-zinc-800 flex items-start justify-between gap-4 bg-zinc-900/50">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <ShieldAlert className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500 mb-1">
                            Security Operations Center
                        </p>
                        <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">Protocol Breach Monitor</h1>
                        <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
                            Real-time anomaly detection across BLE mesh sessions. Monitoring biometric integrity, proxy bridging attempts, and hardware MAC spoofing.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-3 shrink-0">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${threatColor}`}>
                        <ThreatIcon className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">
                            STATUS: {threatLevel}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        <span className="text-[10px] uppercase font-mono text-zinc-500 tracking-wider">Live Link • 5s Sync</span>
                    </div>
                </div>
            </div>

            {/* ── METRICS GRID ── */}
            <div className="grid grid-cols-5 divide-x divide-zinc-800 border-b border-zinc-800 bg-zinc-900/30">
                {[
                    { label: "TOTAL INFRACTIONS", value: anomalies.length, color: "text-zinc-100" },
                    { label: "CRITICAL BREACHES", value: critCount, color: "text-red-500" },
                    { label: "HIGH RISK EVENTS", value: highCount, color: "text-orange-400" },
                    { label: "MODERATE WARNINGS", value: modCount, color: "text-yellow-400" },
                    { label: "COMPROMISED NODES", value: studentCount, color: "text-blue-400" },
                ].map(({ label, value, color }) => (
                    <div key={label} className="px-6 py-5">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">{label}</p>
                        <p className={`text-3xl font-light font-mono ${color}`}>{value}</p>
                    </div>
                ))}
            </div>

            {/* ── FILTER BAR ── */}
            <div className="flex items-center gap-4 px-6 py-4 border-b border-zinc-800 bg-zinc-900/80 flex-wrap">
                <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-zinc-500" />
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Query Filters:</span>
                </div>
                <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="text-xs border border-zinc-700 rounded-md px-3 py-2 bg-zinc-950 text-zinc-300 focus:outline-none focus:border-blue-500 transition-colors"
                >
                    <option value="all">ALL THREAT VECTORS</option>
                    <option value="1">LATENCY SPIKE (RELAY RISK)</option>
                    <option value="2">PROXIMITY VIOLATION</option>
                    <option value="3">RAPID-FIRE SCANS</option>
                    <option value="4">HARDWARE MISMATCH (MAC SPOOF)</option>
                    <option value="5">BIOMETRIC INTEGRITY COMPROMISED</option>
                    <option value="6">OS/PLAY INTEGRITY FAILURE</option>
                </select>
                <select
                    value={sevFilter}
                    onChange={(e) => setSevFilter(e.target.value)}
                    className="text-xs border border-zinc-700 rounded-md px-3 py-2 bg-zinc-950 text-zinc-300 focus:outline-none focus:border-blue-500 transition-colors"
                >
                    <option value="all">ALL SEVERITY LEVELS</option>
                    <option value="critical">CRITICAL INCIDENTS ONLY</option>
                    <option value="high">HIGH & CRITICAL ONLY</option>
                </select>
            </div>

            {/* ── LOGS TABLE ── */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                    <thead>
                        <tr className="bg-zinc-900 border-b border-zinc-800 text-[10px] text-zinc-500 uppercase tracking-widest">
                            <th className="px-6 py-4 font-bold">Timestamp (IST)</th>
                            <th className="px-6 py-4 font-bold">Node Identity</th>
                            <th className="px-6 py-4 font-bold">Threat Vector</th>
                            <th className="px-6 py-4 font-bold">Severity</th>
                            <th className="px-6 py-4 font-bold">Hardware Signature</th>
                            <th className="px-6 py-4 font-bold">Raw Context Data</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50">
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center">
                                    <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto mb-3 opacity-50" />
                                    <p className="text-sm text-emerald-500 font-mono">NO THREATS DETECTED IN CURRENT VIEW</p>
                                </td>
                            </tr>
                        ) : (
                            filtered.map((log) => {
                                const sev = getSeverity(log.anomaly_type);
                                return (
                                    <tr key={log.id} className="hover:bg-zinc-900/50 transition-colors group">
                                        {/* Timestamp */}
                                        <td className="px-6 py-4 font-mono text-xs text-zinc-500 whitespace-nowrap">
                                            {new Date(log.timestamp).toLocaleString("en-IN")}
                                        </td>

                                        {/* Student Info */}
                                        <td className="px-6 py-4">
                                            <p className="font-semibold text-zinc-200 text-sm">{log.student_name}</p>
                                            <p className="font-mono text-[10px] text-zinc-500 mt-0.5 tracking-wider">UID: {log.student_uid}</p>
                                        </td>

                                        {/* Threat Vector */}
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-semibold text-zinc-300">
                                                {log.anomaly_type_display}
                                            </span>
                                        </td>

                                        {/* Severity Badge */}
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center text-[10px] font-bold px-2.5 py-1 rounded border ${SEVERITY_BADGE[sev]}`}>
                                                {SEVERITY_LABEL[sev]}
                                            </span>
                                        </td>

                                        {/* Hardware */}
                                        <td className="px-6 py-4 font-mono text-xs text-zinc-500 max-w-[140px] truncate" title={log.device_id}>
                                            {log.device_id || "UNKNOWN_DEVICE"}
                                        </td>

                                        {/* JSON Metadata (Hacker Terminal Style) */}
                                        <td className="px-6 py-4">
                                            {log.metadata && Object.keys(log.metadata).length > 0 ? (
                                                <div className="relative group/code">
                                                    <pre className="text-[10px] bg-[#0A0A0A] border border-zinc-800 rounded p-2 text-emerald-400/80 font-mono max-w-[250px] overflow-x-auto whitespace-pre group-hover/code:border-zinc-700 transition-colors scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                                                        {JSON.stringify(log.metadata, null, 2)}
                                                    </pre>
                                                </div>
                                            ) : (
                                                <span className="text-[10px] text-zinc-600 font-mono italic">// null payload</span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}