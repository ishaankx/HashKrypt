"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-gray-400 py-4 text-center text-sm">
      <p>© {new Date().getFullYear()} HashKrypt. All rights reserved.</p>
    </footer>
  );
}
