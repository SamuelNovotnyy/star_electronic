/** @format */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";

export default function GalleryGrid({ folder }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/media?folder=${encodeURIComponent(folder)}`)
      .then((r) => r.json())
      .then((d) => setItems(d.items || []))
      .finally(() => setLoading(false));
  }, [folder]);

  if (loading) return <div className="skeleton h-40 rounded-xl" />;

  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((it) => (
        <li key={it.id} className="card p-0 overflow-hidden">
          <img
            src={it.url}
            alt={it.name}
            className="w-full h-40 object-cover"
          />
          {it.description ? (
            <div className="p-2 text-sm text-muted-foreground">
              {it.description}
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
