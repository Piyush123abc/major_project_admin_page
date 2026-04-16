"use client"; // Tells Next.js this runs in the browser, not the server

import { useState, useEffect } from "react";

export default function ApiSettings() {
    const [url, setUrl] = useState("http://localhost:8000");

    useEffect(() => {
        const savedUrl = localStorage.getItem("customApiUrl");
        if (savedUrl) setUrl(savedUrl);
    }, []);

    const handleSave = () => {
        localStorage.setItem("customApiUrl", url);
        alert(`Base URL updated to: ${url}`);
        window.location.reload(); // Reload to apply the new URL globally
    };

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-sm border border-gray-200 mt-4">
            <h3 className="font-semibold text-gray-700 mb-2">Debug Settings</h3>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="border p-2 rounded flex-1 text-black"
                    placeholder="http://localhost:8000"
                />
                <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Save API URL
                </button>
            </div>
        </div>
    );
}