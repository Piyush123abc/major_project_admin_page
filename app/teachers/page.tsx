"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface Teacher {
    id: number;
    username: string;
    uid: string;
    department: string;
}

export default function TeachersPage() {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [formData, setFormData] = useState({ id: 0, username: "", password: "", uid: "", department: "" });

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

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this teacher? This might break their active classrooms!")) return;
        try {
            await api.delete(`/api/god-mode/teachers/${id}/`);
            setTeachers(teachers.filter(t => t.id !== id));
        } catch (error) {
            alert("Failed to delete. They might be tied to an active classroom.");
        }
    };

    const openModal = (mode: "add" | "edit", teacher?: Teacher) => {
        setModalMode(mode);
        if (mode === "edit" && teacher) {
            setFormData({ id: teacher.id, username: teacher.username, password: "", uid: teacher.uid, department: teacher.department });
        } else {
            setFormData({ id: 0, username: "", password: "", uid: "", department: "" });
        }
        setIsModalOpen(true);
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
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <h1 className="text-2xl font-bold text-gray-800">Teacher Database</h1>
                <button onClick={() => openModal("add")} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    + Add Teacher
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 text-sm border-b border-gray-200">
                            <th className="p-4 font-semibold">ID</th>
                            <th className="p-4 font-semibold">UID</th>
                            <th className="p-4 font-semibold">Username</th>
                            <th className="p-4 font-semibold">Department</th>
                            <th className="p-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-800">
                        {teachers.map((teacher) => (
                            <tr key={teacher.id} className="hover:bg-gray-50">
                                <td className="p-4">{teacher.id}</td>
                                <td className="p-4 font-mono text-sm">{teacher.uid}</td>
                                <td className="p-4">{teacher.username}</td>
                                <td className="p-4">{teacher.department}</td>
                                <td className="p-4 text-right space-x-3">
                                    <button onClick={() => openModal("edit", teacher)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                                    <button onClick={() => handleDelete(teacher.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">{modalMode === "add" ? "New Teacher" : "Edit Teacher"}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4 text-black">
                            {modalMode === "add" && (
                                <>
                                    <div><label className="block text-sm text-gray-600 mb-1">Username</label><input type="text" required value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} className="w-full border p-2 rounded" /></div>
                                    <div><label className="block text-sm text-gray-600 mb-1">Password</label><input type="password" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full border p-2 rounded" /></div>
                                </>
                            )}
                            <div><label className="block text-sm text-gray-600 mb-1">College UID</label><input type="text" required value={formData.uid} onChange={(e) => setFormData({ ...formData, uid: e.target.value })} className="w-full border p-2 rounded font-mono" /></div>
                            <div><label className="block text-sm text-gray-600 mb-1">Department</label><input type="text" required value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} className="w-full border p-2 rounded" /></div>
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