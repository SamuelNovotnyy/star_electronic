/** @format */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";

const FOLDERS = [
  { key: "star_electronic_carousel", label: "Carousel" },
  { key: "star_electronic_gallery", label: "Gallery" },
];

export default function DashboardPage() {
  const [authed, setAuthed] = useState(false);
  const [folder, setFolder] = useState(FOLDERS[0].key);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [descMap, setDescMap] = useState({});

  useEffect(() => {
    if (!authed) return;
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed, folder]);

  async function refresh() {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/media?folder=${encodeURIComponent(folder)}`
      );
      const data = await res.json();
      setItems(data.items || []);
      setDescMap(
        Object.fromEntries(
          (data.items || []).map((i) => [i.id, i.description || ""])
        )
      );
    } finally {
      setLoading(false);
    }
  }

  function promptKey() {
    const k = window.prompt("Enter access key");
    if (!k) return;
    fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: k }),
    })
      .then((r) => (r.ok ? setAuthed(true) : alert("Invalid key")))
      .catch(() => alert("Error"));
  }

  async function onReorder(newOrder) {
    await fetch("/api/media/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ folder, order: newOrder.map((i) => i.id) }),
    });
    refresh();
  }

  async function onUpload(e) {
    const files = e.target.files;
    if (!files?.length) return;
    const form = new FormData();
    [...files].forEach((f) => form.append("files", f));
    form.append("folder", folder);
    await fetch("/api/media/upload", { method: "POST", body: form });
    e.target.value = "";
    refresh();
  }

  async function onSaveDescriptions() {
    await fetch("/api/media/descriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ folder, descriptions: descMap }),
    });
    refresh();
  }

  if (!authed) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <p className="text-muted-foreground mb-6">
          Enter your access key to manage carousel and gallery.
        </p>
        <button className="btn btn-primary" onClick={promptKey}>
          Enter key
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <select
          className="input w-auto"
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
        >
          {FOLDERS.map((f) => (
            <option key={f.key} value={f.key}>
              {f.label}
            </option>
          ))}
        </select>
        <label className="btn btn-outline cursor-pointer">
          Upload
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={onUpload}
          />
        </label>
        <button className="btn" onClick={refresh}>
          Refresh
        </button>
        <button className="btn btn-primary" onClick={onSaveDescriptions}>
          Save descriptions
        </button>
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item, idx) => (
            <li key={item.id} className="card p-0 overflow-hidden">
              <img
                src={item.url}
                alt={item.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-3 space-y-2">
                <div className="text-sm text-muted-foreground">{item.name}</div>
                <textarea
                  className="textarea"
                  rows={2}
                  placeholder="Description"
                  value={descMap[item.id] || ""}
                  onChange={(e) =>
                    setDescMap((m) => ({ ...m, [item.id]: e.target.value }))
                  }
                />
                <div className="flex items-center justify-between text-xs">
                  <button
                    className="btn btn-xs"
                    disabled={idx === 0}
                    onClick={() =>
                      onReorder([
                        ...items.slice(0, idx - 1),
                        items[idx],
                        items[idx - 1],
                        ...items.slice(idx + 1),
                      ])
                    }
                  >
                    Move up
                  </button>
                  <button
                    className="btn btn-xs"
                    disabled={idx === items.length - 1}
                    onClick={() =>
                      onReorder([
                        ...items.slice(0, idx),
                        items[idx + 1],
                        items[idx],
                        ...items.slice(idx + 2),
                      ])
                    }
                  >
                    Move down
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
