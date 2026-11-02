"use client";
import React, { useState, useEffect } from "react";
import TiltSpotlightCard from "@/components/interactions/TiltSpotlightCard";
import CyberText from "@/components/interactions/CyberText";
import { placesGallery, PlacePhoto } from "@/data/gallery";
import { playClickSound, playHoverSound } from "@/lib/soundEffects";

const CATEGORIES = [
  "ALL",
  "Campus & Academia",
  "Travel & Nature",
  "City & Landmarks",
  "Expeditions",
] as const;

export default function GalleryScene() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [selectedPhoto, setSelectedPhoto] = useState<PlacePhoto | null>(null);

  const filteredPhotos =
    activeCategory === "ALL"
      ? placesGallery
      : placesGallery.filter((p) => p.category === activeCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!selectedPhoto) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedPhoto(null);
      } else if (e.key === "ArrowRight") {
        const currentIdx = filteredPhotos.findIndex((item) => item.id === selectedPhoto.id);
        const nextIdx = (currentIdx + 1) % filteredPhotos.length;
        setSelectedPhoto(filteredPhotos[nextIdx]);
        playClickSound();
      } else if (e.key === "ArrowLeft") {
        const currentIdx = filteredPhotos.findIndex((item) => item.id === selectedPhoto.id);
        const prevIdx = (currentIdx - 1 + filteredPhotos.length) % filteredPhotos.length;
        setSelectedPhoto(filteredPhotos[prevIdx]);
        playClickSound();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhoto, filteredPhotos]);

  return (
    <section
      id="gallery"
      className="relative min-h-screen py-24 border-t border-white/[0.08] bg-[#06080E] overflow-hidden w-full flex flex-col items-center perspective-3d"
    >
      {/* Visual Archive Landscape Backdrop (Preserved!) */}
      <div
        className="absolute inset-0 z-0 opacity-30 bg-cinematic pointer-events-none"
        style={{
          backgroundImage: "url('/images/landscape_bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 50%",
        }}
      />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,94,30,0.16)_0%,transparent_50%)] pointer-events-none cyber-glow-pulse" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_60%,rgba(245,158,11,0.14)_0%,transparent_50%)] pointer-events-none cyber-glow-pulse" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(6,8,14,0.35)_0%,rgba(6,8,14,0.85)_55%,#06080E_95%)] pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#06080E] via-transparent to-[#06080E] pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 relative z-10 flex flex-col items-center preserve-3d">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="font-mono text-xs tracking-[0.25em] text-[#FF5E1E] uppercase mb-3 bg-[#0B101D]/90 px-4 py-1.5 rounded-full border border-[#FF5E1E]/40 backdrop-blur-md font-bold shadow-[0_0_20px_rgba(255,94,30,0.25)]">
            <CyberText text="EXPLORATIONS // PLACES I'VE VISITED" speed={22} />
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            Journeys, Places <span className="text-[#FF5E1E] drop-shadow-[0_0_25px_rgba(255,94,30,0.5)]">&amp; Life.</span>
          </h2>
          <p className="font-body text-[#e2e8f0] max-w-2xl text-sm sm:text-base mt-4 font-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Beyond silicon circuits and code — snapshots from engineering campuses, university research labs, travels, and expeditions.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => {
            const count =
              cat === "ALL"
                ? placesGallery.length
                : placesGallery.filter((i) => i.category === cat).length;
            const isSelected = activeCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => {
                  playClickSound();
                  setActiveCategory(cat);
                }}
                onMouseEnter={playHoverSound}
                className={`font-mono text-xs tracking-wider px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-[#FF5E1E] text-white font-extrabold shadow-[0_0_20px_rgba(255,94,30,0.6)] scale-105"
                    : "bg-[#0B101D]/85 text-[#cbd5e1] hover:text-white border border-white/15 hover:border-[#FF5E1E]/50 backdrop-blur-md"
                }`}
              >
                <span>{cat === "ALL" ? "All Places" : cat}</span>
                <span
                  className={`text-[0.62rem] px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-white/25 text-white font-black" : "bg-white/15 text-white"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 3D Tilt Places Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {filteredPhotos.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                playClickSound();
                setSelectedPhoto(item);
              }}
              className="cursor-pointer group"
            >
              <TiltSpotlightCard
                className="h-full rounded-2xl bg-[#0B101D]/90 border border-white/15 hover:border-[#FF5E1E]/60 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col justify-between"
                glowColor="rgba(255, 94, 30, 0.25)"
                maxTilt={6}
              >
                {/* Photo with Parallax Zoom */}
                <div className="relative w-full h-56 overflow-hidden bg-black/60">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/landscape_bg.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B101D] via-transparent to-transparent" />

                  {/* Location Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="font-mono text-[0.65rem] tracking-wider uppercase px-2.5 py-1 rounded-md bg-black/75 border border-white/20 text-white font-bold backdrop-blur-md shadow-md flex items-center gap-1">
                      <span>📍</span>
                      <span>{item.place}</span>
                    </span>
                  </div>

                  {item.date && (
                    <div className="absolute top-3 right-3">
                      <span className="font-mono text-[0.62rem] text-white/80 bg-black/60 px-2 py-0.5 rounded border border-white/10 backdrop-blur-md">
                        {item.date}
                      </span>
                    </div>
                  )}

                  {/* Hover Inspect Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                    <span className="px-3.5 py-1.5 rounded-full bg-[#FF5E1E] text-white font-mono text-xs font-bold shadow-[0_0_20px_rgba(255,94,30,0.8)] flex items-center gap-1.5">
                      <span>EXPAND PHOTO</span>
                      <span>🔍</span>
                    </span>
                  </div>
                </div>

                {/* Place Information */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <span className="font-mono text-[0.62rem] text-[#F59E0B] uppercase tracking-wider font-semibold block mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-[#FF5E1E] transition-colors line-clamp-1 mb-2">
                      {item.title}
                    </h3>
                    <p className="font-body text-xs text-[#cbd5e1] leading-relaxed line-clamp-2 font-light">
                      {item.caption}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 mt-4 flex items-center justify-between text-xs font-mono text-[#94a3b8]">
                    <span className="text-[#FF5E1E] group-hover:underline">View in Full Screen</span>
                    <span className="group-hover:translate-x-1 transition-transform">↗</span>
                  </div>
                </div>
              </TiltSpotlightCard>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in">
          <div
            className="absolute inset-0 bg-[#06080E]/90 backdrop-blur-xl"
            onClick={() => setSelectedPhoto(null)}
          />

          <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0B101D] border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <span className="font-mono text-xs text-[#FF5E1E] font-bold uppercase tracking-wider">
                📍 {selectedPhoto.place} • {selectedPhoto.category}
              </span>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[0.65rem] text-[#94a3b8] hidden sm:inline">
                  [← → Arrow keys to navigate]
                </span>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="font-mono text-xs text-[#cbd5e1] hover:text-white px-3 py-1.5 rounded-lg border border-white/15 hover:border-white/40 transition-colors cursor-pointer"
                >
                  ESC [CLOSE]
                </button>
              </div>
            </div>

            {/* High-Res Photo Container */}
            <div className="w-full max-h-[520px] rounded-xl overflow-hidden bg-black/60 border border-white/10 mb-6 flex items-center justify-center">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="max-h-[520px] w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/landscape_bg.jpg";
                }}
              />
            </div>

            {/* Title & Caption */}
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-2">
              {selectedPhoto.title}
            </h2>
            <div className="font-mono text-xs text-[#F59E0B] mb-3">
              {selectedPhoto.place} {selectedPhoto.date ? `• ${selectedPhoto.date}` : ""}
            </div>
            <p className="font-body text-sm sm:text-base text-[#e2e8f0] leading-relaxed font-light">
              {selectedPhoto.caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
