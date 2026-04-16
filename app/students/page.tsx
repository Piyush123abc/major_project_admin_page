"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

// Define the shape of your data
interface Student {
    id: number;
    username: string;
    uid: string;
    branch: string;
    fcm_token: string | null;
}

export default function StudentsPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");

    // Form State
    const [formData, setFormData] = useState({
        id: 0,
        username: "",
        password: "",
        uid: "",
        branch: "",
    });

    // Fetch data on load
    const fetchStudents = async () => {
        try {
            const response = await api.get("/api/god-mode/students/");
            setStudents(response.data);
        } catch (error) {
            console.error("Failed to fetch students", error);
            alert("Failed to fetch students. Are you logged in?");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // --- ACTIONS ---

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to nuke this student?")) return;
        try {
            await api.delete(`/api/god-mode/students/${id}/`);
            setStudents(students.filter(s => s.id !== id));
        } catch (error) {
            console.error("Delete failed", error);
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
        // We don't pull the password since it's hashed in the backend
        setFormData({
            id: student.id,
            username: student.username,
            password: "",
            uid: student.uid,
            branch: student.branch
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (modalMode === "add") {
                // Create new student
                await api.post("/api/god-mode/students/", {
                    username: formData.username,
                    password: formData.password,
                    uid: formData.uid,
                    branch: formData.branch
                });
            } else {
                // Update existing student (using PATCH to only update changed fields)
                await api.patch(`/api/god-mode/students/${formData.id}/`, {
                    uid: formData.uid,
                    branch: formData.branch
                });
            }

            // Close modal and refresh table
            setIsModalOpen(false);
            fetchStudents();
        } catch (error: any) {
            console.error("Save failed", error);
            alert(`Failed to save student: ${JSON.stringify(error.response?.data || error.message)}`);
        }
    };

    if (loading) return <div className="text-gray-500 p-8">Loading database...</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-gray-800">Student Database</h1>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        Total: {students.length}
                    </span>
                </div>
                <button
                    onClick={openAddModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    + Add Student
                </button>
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
                        {students.map((student) => (
                            <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4">{student.id}</td>
                                <td className="p-4 font-mono text-sm">{student.uid}</td>
                                <td className="p-4">{student.username}</td>
                                <td className="p-4">{student.branch}</td>
                                <td className="p-4 text-right space-x-3">
                                    <button
                                        onClick={() => openEditModal(student)}
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(student.id)}
                                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- MODAL POPUP --- */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">
                            {modalMode === "add" ? "Create New Student" : "Edit Student Details"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4 text-black">
                            {/* Only allow editing username/password on creation */}
                            {modalMode === "add" && (
                                <>
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">Username</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.username}
                                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">Password</label>
                                        <input
                                            type="password"
                                            required
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </>
                            )}

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">College UID</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.uid}
                                    onChange={(e) => setFormData({ ...formData, uid: e.target.value })}
                                    className="w-full border p-2 rounded font-mono focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Branch</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.branch}
                                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                                    placeholder="e.g., CSE, ECE"
                                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Save Student
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}