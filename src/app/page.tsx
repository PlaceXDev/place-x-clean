"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [pc, setPc] = useState("");
  const router = useRouter();

  return (
    <main className="max-w-xl mx-auto p-8 space-y-4">
      <h1 className="text-2xl font-semibold">Postcode lookup</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!pc.trim()) return;
          router.push(`/postcode/${encodeURIComponent(pc.trim())}`);
        }}
        className="flex gap-2"
      >
        <input
          className="flex-1 border rounded-lg px-3 py-2"
          placeholder="e.g. E11 1EP"
          value={pc}
          onChange={(e) => setPc(e.target.value)}
        />
        <button className="px-4 py-2 rounded-lg bg-black text-white">Search</button>
      </form>
    </main>
  );
}
