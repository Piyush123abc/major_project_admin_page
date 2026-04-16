"use client"; // We need this to check the current route

import "./globals.css";
import Sidebar from "./components/Sidebar";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // We don't want the sidebar showing up on the login screen
  const isLoginPage = pathname === "/login";

  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 flex min-h-screen">
        {!isLoginPage && <Sidebar />}
        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          <div className="flex-1 overflow-y-auto p-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}