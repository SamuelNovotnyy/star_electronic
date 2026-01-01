/** @format */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';

export default function GalleryGrid({ folder }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/media?folder=${encodeURIComponent(folder)}`)
      .then(r => r.json())
      .then(d => setItems(d.items || []))
      .finally(() => setLoading(false));
  }, [folder]);

  if (loading) {
    return (
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="skeleton h-64 w-full rounded-xl break-inside-avoid"
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {items.map(it => (
          <div
            key={it.id}
            className="group relative break-inside-avoid rounded-xl overflow-hidden shadow-lg lg:hover:shadow-2xl transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedImage(it)}
          >
            <img
              src={it.url}
              alt={it.name}
              loading="lazy"
              className="w-full h-auto object-cover transform lg:group-hover:scale-105 transition-transform duration-500"
            />
            {/* Hover Overlay with Search Icon - Desktop Only */}
            <div className="absolute inset-0 bg-black/40 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center hidden lg:flex">
              <div className="bg-black/50 text-white rounded-full p-3 backdrop-blur-sm transform scale-90 group-hover:scale-100 transition-transform">
                <i className="fas fa-search-plus text-xl"></i>
              </div>
            </div>

            {/* Description at bottom on hover (desktop) or always visible if preferred, 
                but user asked for lightbox description. Let's keep a subtle overlay description too 
                or just keep it clean like before. User said: "be able to spotlight or lightbox any individual picture and it's description" 
                The previous grid design had description overlay. Let's keep it but simplified.
            */}
            {it.description && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 hidden lg:block">
                <p className="text-white text-sm font-medium line-clamp-2">
                  {it.description}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors text-4xl focus:outline-none z-[101]"
            onClick={() => setSelectedImage(null)}
          >
            &times;
          </button>
          <div
            className="relative max-w-7xl w-full h-full max-h-[90vh] flex flex-col items-center justify-center pointer-events-none"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative w-full flex-1 min-h-0 flex items-center justify-center">
              <img
                src={selectedImage.url}
                alt={selectedImage.description || 'Expanded view'}
                className="max-w-full max-h-full object-contain rounded-md shadow-2xl pointer-events-auto"
              />
            </div>
            {selectedImage.description && (
              <div className="mt-6 bg-black/50 backdrop-blur-md rounded-xl px-8 py-4 text-white text-center max-w-3xl shadow-lg border border-white/10 shrink-0">
                <p className="text-lg font-medium tracking-wide">
                  {selectedImage.description}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
