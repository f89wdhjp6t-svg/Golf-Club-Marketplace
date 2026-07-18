"use client";

import { useState } from "react";

export function PhotoGallery({ photos, name }: { photos: string[]; name: string }) {
  const [main, setMain] = useState(0);
  return (
    <div>
      <div
        style={{
          borderRadius: 16,
          overflow: "hidden",
          background: "#f1f5f9",
          height: 320,
          position: "relative",
        }}
      >
        <img
          key={main}
          src={photos[main]}
          alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={(e) => ((e.target as HTMLImageElement).style.opacity = "0")}
        />
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        {photos.map((p, i) => (
          <div
            key={i}
            onClick={() => setMain(i)}
            style={{
              flex: 1,
              height: 72,
              borderRadius: 10,
              overflow: "hidden",
              cursor: "pointer",
              border: i === main ? "2.5px solid #16a34a" : "2px solid #e5e7eb",
              transition: "border-color 0.15s",
            }}
          >
            <img
              src={p}
              alt={`view ${i + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              onError={(e) => ((e.target as HTMLImageElement).style.opacity = "0")}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
