/** @format */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";

export default function Carousel({ folder }) {
  const [items, setItems] = useState([]);
  const [idx, setIdx] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    let active = true;
    fetch(`/api/media?folder=${encodeURIComponent(folder)}`)
      .then((r) => r.json())
      .then((d) => {
        if (!active) return;
        setItems(d.items || []);
      });
    return () => {
      active = false;
    };
  }, [folder]);

  useEffect(() => {
    if (!items.length) return;
    timer.current && clearInterval(timer.current);
    timer.current = setInterval(
      () => setIdx((i) => (i + 1) % items.length),
      4500
    );
    return () => timer.current && clearInterval(timer.current);
  }, [items]);

  if (!items.length) return <div className="skeleton h-64 rounded-xl" />;

  const current = items[idx];

  return (
    <div className="relative group rounded-xl overflow-hidden border-[20px] border-border">
      <img
        src={current.url}
        alt={current.name}
        className="w-full h-72 md:h-[500px] object-cover"
      />
      {current.description ? (
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-3 text-sm hidden md:block">
          {current.description}
        </div>
      ) : null}
      <div className="absolute inset-0 pointer-events-none">
        {/* gradient edges for style */}
        <div
          className="absolute inset-x-0 bottom-0 h-24"
          style={{
            background:
              "linear-gradient(to top, color-mix(in srgb, var(--bg) 60%, transparent), transparent)",
          }}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          className="btn btn-ghost pointer-events-auto"
          onClick={() => setIdx((i) => (i - 1 + items.length) % items.length)}
        >
          ‹
        </button>
        <button
          className="btn btn-ghost pointer-events-auto"
          onClick={() => setIdx((i) => (i + 1) % items.length)}
        >
          ›
        </button>
      </div>
    </div>
  );
}
