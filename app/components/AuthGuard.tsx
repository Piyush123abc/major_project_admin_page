"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("access_token");
            const isLoginPage = pathname === "/login";
            const isHomePage = pathname === "/";

            if (!token) {
                if (!isLoginPage && !isHomePage) {
                    router.push("/login");
                    setIsAuthenticated(false);
                } else {
                    setIsAuthenticated(true); // Allow login and home page
                }
            } else {
                if (isLoginPage) {
                    router.push("/"); // Redirect to home if already logged in and on login page
                }
                setIsAuthenticated(true);
            }
        };

        checkAuth();
    }, [pathname, router]);

    // Show nothing while checking auth or if not authenticated (redirecting)
    if (isAuthenticated === null || isAuthenticated === false) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-950 w-full">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    <p className="text-gray-400 text-sm animate-pulse">Verifying credentials...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
