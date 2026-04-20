"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";


export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // NOTE: Update this URL if your standard JWT login path is different!
            const response = await api.post("/user/login/", {
                username,
                password,
            });

            // Save the token to localStorage
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh); // 🌟 ADD THIS LINE

            // Redirect to the students page
            router.push("/students");
        } catch (err: any) {
            setError("Login failed. Check your superuser credentials or server status.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 w-full p-4">
            <div className="p-8 bg-white rounded-2xl shadow-xl max-w-md w-full border border-gray-100">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Admin Access</h1>
                    <p className="text-gray-500 text-sm mt-2 font-medium">Please enter your credentials to manage the mesh network.</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 text-sm font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700 ml-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="block w-full border border-gray-200 rounded-xl p-3 text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                            placeholder="e.g. admin_piyush"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700 ml-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full border border-gray-200 rounded-xl p-3 text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white p-3.5 rounded-xl font-bold hover:bg-blue-700 disabled:bg-blue-400 shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98]"
                    >
                        {loading ? "Authenticating..." : "Login to Command Center"}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100">
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 text-gray-500 hover:text-blue-600 font-bold text-sm transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Public Dashboard
                    </Link>
                </div>
            </div>
            
            <p className="mt-8 text-gray-400 text-xs font-medium">
                Mesh Admin Portal v2.4.0 • Restricted Access
            </p>
        </div>
    );
}