"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface Classroom {
    id: number;
    name: string;
    code: string;
    teacher_name: string;
    teacher: number; // The Teacher ID
    active: boolean;
}

interface Teacher {
    id: number;
    username: string;
}

export default function ClassroomsPage() {
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [formData, setFormData] = useState({ id: 0, name: "", code: "", teacher: "", active: true });

    const fetchData = async () => {
        try {
            // Fetch both Classrooms and Teachers at the same time
            const [classRes, teacherRes] = await Promise.all([
                api.get("/api/god-mode/classrooms/"),
                api.get("/api/god-mode/teachers/")
            ]);
            setClassrooms(classRes.data);
            setTeachers(teacherRes.data);
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this classroom?")) return;
        try {
            await api.delete(`/api/god-mode/classrooms/${id}/`);
            setClassrooms(classrooms.filter(c => c.id !== id));
        } catch (error) {
            alert("Failed to delete classroom.");
        }
    };

    const openModal = (mode: "add" | "edit", classroom?: Classroom) => {
        setModalMode(mode);
        if (mode === "edit" && classroom) {
            setFormData({ id: classroom.id, name: classroom.name, code: classroom.code, teacher: classroom.teacher?.toString() || "", active: classroom.active });
        } else {
            setFormData({ id: 0, name: "", code: "", teacher: teachers.length > 0 ? teachers[0].id.toString() : "", active: true });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (modalMode === "add") {
                await api.post("/api/god-mode/classrooms/", {
                    name: formData.name, code: formData.code, teacher: parseInt(formData.teacher), active: formData.active
                });
            } else {
                await api.patch(`/api/god-mode/classrooms/${formData.id}/`, {
                    name: formData.name, code: formData.code, teacher: parseInt(formData.teacher), active: formData.active
                });
            }
            setIsModalOpen(false);
            fetchData();
        } catch (error) {
            alert("Failed to save classroom.");
        }
    };

    if (loading) return <div className="p-8 text-gray-500">Loading database...</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <h1 className="text-2xl font-bold text-gray-800">Classroom Database</h1>
                <button onClick={() => openModal("add")} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    + Add Classroom
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 text-sm border-b border-gray-200">
                            <th className="p-4 font-semibold">ID</th>
                            <th className="p-4 font-semibold">Code</th>
                            <th className="p-4 font-semibold">Course Name</th>
                            <th className="p-4 font-semibold">Teacher</th>
                            <th className="p-4 font-semibold">Session Status</th>
                            <th className="p-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-800">
                        {classrooms.map((cls) => (
                            <tr key={cls.id} className="hover:bg-gray-50">
                                <td className="p-4">{cls.id}</td>
                                <td className="p-4 font-mono text-sm font-bold text-blue-600">{cls.code}</td>
                                <td className="p-4">{cls.name}</td>
                                <td className="p-4">{cls.teacher_name}</td>
                                <td className="p-4">
                                    {cls.active ? (
                                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">ACTIVE</span>
                                    ) : (
                                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-bold">CLOSED</span>
                                    )}
                                </td>
                                <td className="p-4 text-right space-x-3">
                                    <button onClick={() => openModal("edit", cls)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                                    <button onClick={() => handleDelete(cls.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">{modalMode === "add" ? "New Classroom" : "Edit Classroom"}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4 text-black">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Course Name</label>
                                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g., Database Systems" className="w-full border p-2 rounded" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Class Code</label>
                                <input type="text" required value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} placeholder="e.g., CS301" className="w-full border p-2 rounded font-mono uppercase" />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Assign Teacher</label>
                                <select
                                    required
                                    value={formData.teacher}
                                    onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                                    className="w-full border p-2 rounded bg-white"
                                >
                                    <option value="" disabled>Select a teacher...</option>
                                    {teachers.map(t => (
                                        <option key={t.id} value={t.id}>{t.username}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Only show active toggle on edit mode */}
                            {modalMode === "edit" && (
                                <div className="flex items-center gap-2 mt-4">
                                    <input type="checkbox" id="active-toggle" checked={formData.active} onChange={(e) => setFormData({ ...formData, active: e.target.checked })} className="w-4 h-4 text-blue-600" />
                                    <label htmlFor="active-toggle" className="text-sm font-medium text-gray-700">Attendance Session Active</label>
                                </div>
                            )}

                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}