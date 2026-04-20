"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface Teacher {
    id: number;
    username: string;
    uid: string;
    department: string;
}

interface SessionStat {
    classroom_id: number;
    classroom_code: string;
    classroom_name: string;
    date: string;
    present: number;
    absent: number;
    total: number;
}

interface TeacherStats {
    teacher_name: string;
    recent_sessions: SessionStat[];
}

export default function TeachersPage() {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // CRUD Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [formData, setFormData] = useState({ id: 0, username: "", password: "", uid: "", department: "" });

    // Stats Modal State
    const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
    const [teacherStats, setTeacherStats] = useState<TeacherStats | null>(null);
    const [loadingStats, setLoadingStats] = useState(false);

    // Accordion State: Tracks which session is currently expanded
    const [expandedSessionIdx, setExpandedSessionIdx] = useState<number | null>(null);

    const fetchTeachers = async () => {
        try {
            const response = await api.get("/api/god-mode/teachers/");
            setTeachers(response.data);
        } catch (error) {
            console.error("Failed to fetch teachers", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchTeachers(); }, []);

    const filteredTeachers = teachers.filter((t) =>
        (t.username || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.uid || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.department || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this teacher? This might break their active classrooms!")) return;
        try {
            await api.delete(`/api/god-mode/teachers/${id}/`);
            setTeachers(teachers.filter(t => t.id !== id));
        } catch (error) {
            alert("Failed to delete. They might be tied to an active classroom.");
        }
    };

    const openCrudModal = (mode: "add" | "edit", teacher?: Teacher) => {
        setModalMode(mode);
        if (mode === "edit" && teacher) {
            setFormData({ id: teacher.id, username: teacher.username || "", password: "", uid: teacher.uid, department: teacher.department });
        } else {
            setFormData({ id: 0, username: "", password: "", uid: "", department: "" });
        }
        setIsModalOpen(true);
    };

    const openStatsModal = async (teacher: Teacher) => {
        setSelectedTeacher(teacher);
        setTeacherStats(null);
        setExpandedSessionIdx(null); // Reset accordion
        setIsStatsModalOpen(true);
        setLoadingStats(true);

        try {
            const response = await api.get(`/api/god-mode/teachers/${teacher.id}/stats/`);
            setTeacherStats(response.data);
        } catch (error) {
            console.error("Failed to fetch stats", error);
        } finally {
            setLoadingStats(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (modalMode === "add") {
                await api.post("/api/god-mode/teachers/", {
                    username: formData.username, password: formData.password, uid: formData.uid, department: formData.department
                });
            } else {
                await api.patch(`/api/god-mode/teachers/${formData.id}/`, {
                    uid: formData.uid, department: formData.department
                });
            }
            setIsModalOpen(false);
            fetchTeachers();
        } catch (error) {
            alert("Failed to save teacher.");
        }
    };

    if (loading) return <div className="p-8 text-gray-500">Loading database...</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">

            {/* HEADER */}
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50 flex-wrap gap-4">
                <h1 className="text-2xl font-bold text-gray-800">Teacher Database</h1>
                <div className="flex gap-4 flex-1 max-w-md ml-auto">
                    <input
                        type="text"
                        placeholder="Search by Name, UID, or Dept..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
                    />
                    <button onClick={() => openCrudModal("add")} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap">
                        + Add Teacher
                    </button>
                </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 text-sm border-b border-gray-200">
                            <th className="p-4 font-semibold">ID</th>
                            <th className="p-4 font-semibold">UID</th>
                            <th className="p-4 font-semibold">Name</th>
                            <th className="p-4 font-semibold">Department</th>
                            <th className="p-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-800">
                        {filteredTeachers.map((teacher) => (
                            <tr key={teacher.id} className="hover:bg-gray-50">
                                <td className="p-4 text-sm text-gray-500">{teacher.id}</td>
                                <td className="p-4 font-mono text-sm">{teacher.uid}</td>
                                <td className="p-4 font-medium">{teacher.username || <span className="text-gray-400 italic">Unknown</span>}</td>
                                <td className="p-4">{teacher.department}</td>
                                <td className="p-4 text-right space-x-3">
                                    <button onClick={() => openStatsModal(teacher)} className="text-purple-600 hover:text-purple-800 text-sm font-bold bg-purple-50 px-2 py-1 rounded">Stats</button>
                                    <button onClick={() => openCrudModal("edit", teacher)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                                    <button onClick={() => handleDelete(teacher.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* NEW STATS ANALYSIS MODAL */}
            {isStatsModalOpen && selectedTeacher && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                📅 {selectedTeacher.username}'s Past Sessions
                            </h2>
                            <button onClick={() => setIsStatsModalOpen(false)} className="text-gray-400 hover:text-gray-800 font-bold text-xl">&times;</button>
                        </div>

                        {loadingStats ? (
                            <div className="p-8 text-center text-gray-500 animate-pulse">Loading historical sessions...</div>
                        ) : teacherStats && teacherStats.recent_sessions.length > 0 ? (
                            <div className="space-y-3">
                                {teacherStats.recent_sessions.map((session, idx) => {
                                    const isExpanded = expandedSessionIdx === idx;
                                    const attendanceRate = session.total > 0 ? Math.round((session.present / session.total) * 100) : 0;

                                    return (
                                        <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                                            {/* Accordion Header (Clickable) */}
                                            <button
                                                onClick={() => setExpandedSessionIdx(isExpanded ? null : idx)}
                                                className={`w-full p-4 flex justify-between items-center transition-colors ${isExpanded ? 'bg-blue-50' : 'bg-gray-50 hover:bg-gray-100'}`}
                                            >
                                                <div className="text-left">
                                                    <p className="font-bold text-gray-800">{session.classroom_code} - {session.classroom_name}</p>
                                                    <p className="text-xs text-gray-500 mt-1">{session.date}</p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className={`text-sm font-bold ${attendanceRate < 50 ? 'text-red-600' : 'text-green-600'}`}>
                                                        {attendanceRate}% Attendance
                                                    </span>
                                                    <span className="text-gray-400 font-bold">{isExpanded ? "▼" : "▶"}</span>
                                                </div>
                                            </button>

                                            {/* Accordion Body (Expands) */}
                                            {isExpanded && (
                                                <div className="p-4 bg-white border-t border-gray-200 grid grid-cols-3 gap-4">
                                                    <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                        <p className="text-xs font-bold text-gray-500 uppercase">Total Students</p>
                                                        <p className="text-xl font-black text-gray-800">{session.total}</p>
                                                    </div>
                                                    <div className="text-center p-3 bg-green-50 rounded-lg border border-green-100">
                                                        <p className="text-xs font-bold text-green-600 uppercase">Present</p>
                                                        <p className="text-xl font-black text-green-700">{session.present}</p>
                                                    </div>
                                                    <div className="text-center p-3 bg-red-50 rounded-lg border border-red-100">
                                                        <p className="text-xs font-bold text-red-600 uppercase">Absent</p>
                                                        <p className="text-xl font-black text-red-700">{session.absent}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center text-gray-500 p-8 border-2 border-dashed border-gray-200 rounded-xl">
                                No past attendance sessions found for this teacher.
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* CRUD MODAL (ADD/EDIT) */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    {/* ... standard add/edit modal form ... */}
                </div>
            )}
        </div>
    );
}