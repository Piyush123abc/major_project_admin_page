"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

// --- INTERFACES ---
interface Student {
    id: number;
    username: string;
    uid: string;
    branch: string;
    fcm_token: string | null;
}

interface AttendanceRecord {
    id: number;
    date: string;
    status: string;
    classroom_code: string;
    classroom_name: string;
}

interface StudentHistory {
    student_name: string;
    uid: string;
    stats: {
        total: number;
        present: number;
        absent: number;
        attendance_percentage: number;
    };
    history: AttendanceRecord[];
}

export default function StudentsPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);

    // Search State
    const [searchTerm, setSearchTerm] = useState("");

    // CRUD Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [formData, setFormData] = useState({ id: 0, username: "", password: "", uid: "", branch: "" });

    // Custom Delete State
    const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

    // History Modal State
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [selectedStudentHistory, setSelectedStudentHistory] = useState<StudentHistory | null>(null);
    const [loadingHistory, setLoadingHistory] = useState(false);

    // Fetch data on load
    const fetchStudents = async () => {
        try {
            const response = await api.get("/api/god-mode/students/");
            setStudents(response.data);
        } catch (error) {
            console.error("Failed to fetch students", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchStudents(); }, []);

    // Filters
    const filteredStudents = students.filter((s) =>
        (s.username || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.uid || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.branch || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    // --- ACTIONS ---
    const executeDelete = async () => {
        if (!studentToDelete) return;
        try {
            await api.delete(`/api/god-mode/students/${studentToDelete.id}/`);
            setStudents(students.filter(s => s.id !== studentToDelete.id));
            setStudentToDelete(null);
        } catch (error) {
            alert("Failed to delete student.");
        }
    };

    const openAddModal = () => {
        setModalMode("add");
        setFormData({ id: 0, username: "", password: "", uid: "", branch: "" });
        setIsModalOpen(true);
    };

    const openEditModal = (student: Student) => {
        setModalMode("edit");
        setFormData({ id: student.id, username: student.username, password: "", uid: student.uid, branch: student.branch });
        setIsModalOpen(true);
    };

    const openHistoryModal = async (studentId: number) => {
        setIsHistoryModalOpen(true);
        setLoadingHistory(true);
        setSelectedStudentHistory(null);

        try {
            const response = await api.get(`/api/god-mode/students/${studentId}/attendance/`);
            setSelectedStudentHistory(response.data);
        } catch (error) {
            console.error("Failed to fetch history", error);
            alert("Could not load student history.");
            setIsHistoryModalOpen(false);
        } finally {
            setLoadingHistory(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (modalMode === "add") {
                await api.post("/api/god-mode/students/", {
                    username: formData.username, password: formData.password, uid: formData.uid, branch: formData.branch
                });
            } else {
                await api.patch(`/api/god-mode/students/${formData.id}/`, {
                    uid: formData.uid, branch: formData.branch
                });
            }
            setIsModalOpen(false);
            fetchStudents();
        } catch (error: any) {
            alert(`Failed to save student.`);
        }
    };

    if (loading) return <div className="text-gray-500 p-8">Loading database...</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">

            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50 flex-wrap gap-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-gray-800">Student Database</h1>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Total: {students.length}</span>
                </div>
                <div className="flex gap-4 flex-1 max-w-md ml-auto">
                    <input
                        type="text" placeholder="Search by Name, UID, or Branch..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 text-black"
                    />
                    <button onClick={openAddModal} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm whitespace-nowrap">
                        + Add Student
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 text-sm border-b border-gray-200">
                            <th className="p-4 font-semibold">ID</th>
                            <th className="p-4 font-semibold">UID</th>
                            <th className="p-4 font-semibold">Username</th>
                            <th className="p-4 font-semibold">Branch</th>
                            <th className="p-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-800">
                        {filteredStudents.map((student) => (
                            <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4">{student.id}</td>
                                <td className="p-4 font-mono text-sm">{student.uid}</td>
                                <td className="p-4 font-medium">{student.username}</td>
                                <td className="p-4">{student.branch}</td>
                                <td className="p-4 text-right space-x-2">
                                    {/* 🌟 NEW HISTORY BUTTON */}
                                    <button onClick={() => openHistoryModal(student.id)} className="bg-purple-50 text-purple-600 border border-purple-200 hover:bg-purple-100 px-3 py-1 rounded-md text-sm font-semibold transition-colors">
                                        History
                                    </button>
                                    <button onClick={() => openEditModal(student)} className="bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 px-3 py-1 rounded-md text-sm font-semibold transition-colors">
                                        Edit
                                    </button>
                                    <button onClick={() => setStudentToDelete(student)} className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 px-3 py-1 rounded-md text-sm font-semibold transition-colors">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- STUDENT HISTORY MODAL --- */}
            {isHistoryModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">

                        {/* Modal Header */}
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {selectedStudentHistory?.student_name || "Loading..."}
                                </h2>
                                <p className="text-sm font-mono text-gray-500 mt-1">UID: {selectedStudentHistory?.uid || "..."}</p>
                            </div>
                            <button onClick={() => setIsHistoryModalOpen(false)} className="text-gray-400 hover:text-gray-800 font-bold text-2xl">&times;</button>
                        </div>

                        {/* Modal Body */}
                        {loadingHistory ? (
                            <div className="flex-1 p-12 text-center text-gray-500 animate-pulse">Fetching attendance records...</div>
                        ) : selectedStudentHistory ? (
                            <div className="flex-1 flex flex-col overflow-hidden">
                                {/* Stats Row */}
                                <div className="grid grid-cols-4 gap-4 mb-6">
                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-center">
                                        <p className="text-[10px] uppercase font-bold text-gray-500">Total</p>
                                        <p className="text-xl font-black text-gray-800">{selectedStudentHistory.stats.total}</p>
                                    </div>
                                    <div className="bg-green-50 p-3 rounded-lg border border-green-200 text-center">
                                        <p className="text-[10px] uppercase font-bold text-green-600">Present</p>
                                        <p className="text-xl font-black text-green-700">{selectedStudentHistory.stats.present}</p>
                                    </div>
                                    <div className="bg-red-50 p-3 rounded-lg border border-red-200 text-center">
                                        <p className="text-[10px] uppercase font-bold text-red-600">Absent</p>
                                        <p className="text-xl font-black text-red-700">{selectedStudentHistory.stats.absent}</p>
                                    </div>
                                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-center">
                                        <p className="text-[10px] uppercase font-bold text-blue-600">Rate</p>
                                        <p className="text-xl font-black text-blue-700">{selectedStudentHistory.stats.attendance_percentage}%</p>
                                    </div>
                                </div>

                                {/* History List */}
                                <h3 className="font-bold text-gray-700 mb-2">Class History</h3>
                                <div className="flex-1 overflow-y-auto border border-gray-200 rounded-lg">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                                            <tr>
                                                <th className="p-3 font-semibold text-gray-600">Date</th>
                                                <th className="p-3 font-semibold text-gray-600">Classroom</th>
                                                <th className="p-3 font-semibold text-gray-600">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {selectedStudentHistory.history.length > 0 ? (
                                                selectedStudentHistory.history.map((record) => (
                                                    <tr key={record.id} className="hover:bg-gray-50">
                                                        <td className="p-3 text-gray-600 whitespace-nowrap">{record.date}</td>
                                                        <td className="p-3">
                                                            <div className="font-bold text-gray-800">{record.classroom_code}</div>
                                                            <div className="text-xs text-gray-500 truncate max-w-[200px]">{record.classroom_name}</div>
                                                        </td>
                                                        <td className="p-3">
                                                            <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded ${record.status === 'PRESENT' ? 'bg-green-100 text-green-700' :
                                                                    record.status === 'LATE' ? 'bg-yellow-100 text-yellow-700' :
                                                                        'bg-red-100 text-red-700'
                                                                }`}>
                                                                {record.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr><td colSpan={3} className="p-6 text-center text-gray-500 italic">No attendance records found for this student.</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            )}

            {/* --- DELETE CONFIRMATION MODAL --- */}
            {studentToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
                    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm border-t-4 border-red-500">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-red-100 p-2 rounded-full">⚠️</div>
                            <h3 className="text-lg font-bold text-gray-900">Confirm Deletion</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-6">
                            Delete <span className="font-bold">{studentToDelete.username}</span>? This erases their entire attendance history.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setStudentToDelete(null)} className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancel</button>
                            <button onClick={executeDelete} className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg">Yes, Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- CRUD MODAL --- */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[55] p-4">
                    {/* Standard add/edit modal form you already have */}
                </div>
            )}
        </div>
    );
}