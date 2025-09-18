"use client";

import React, { useState, useEffect } from "react";

export default function TerminalHeader() {
  const [cursorBlink, setCursorBlink] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setCursorBlink((b) => !b), 500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex items-center px-6 py-3 bg-gray-800 text-[#39ff14] font-mono text-xl shadow-md">
      <span className="font-bold">User@HashKrypt:~$</span>
      <span
        className="inline-block ml-2"
        style={{
          width: "12px",
          height: "1.5em",
          background: "#39ff14",
          opacity: cursorBlink ? 1 : 0,
          borderRadius: 2,
        }}
      />
    </div>
  );
}
