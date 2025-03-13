/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import { categories, memories } from "../lib/data";
import MemoriesHero from "./memories/MemoriesHero";
import MemoriesFilter from "./memories/MemoriesFilter";
import MemoriesImageGrid from "./memories/MemoriesImageGrid";
import MemoriesModel from "./memories/MemoriesModel";
import { Memory } from "@/types";

const ModernMemoriesPage = () => {
  const [selectedImage, setSelectedImage] = useState<Memory | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState("all");
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const filteredMemories =
    activeFilter === "all"
      ? memories
      : memories.filter((m) => m.category === activeFilter);

  // Find the index of the selected image in the **filtered** list
  const selectedFilteredIndex = filteredMemories.findIndex(
    (m) => m.id === selectedImage?.id
  );

  const handleNext = () => {
    if (selectedFilteredIndex === -1) return;
    const nextIndex = (selectedFilteredIndex + 1) % filteredMemories.length;
    setSelectedImage(filteredMemories[nextIndex]);
  };

  const handlePrev = () => {
    if (selectedFilteredIndex === -1) return;
    const prevIndex =
      (selectedFilteredIndex - 1 + filteredMemories.length) %
      filteredMemories.length;
    setSelectedImage(filteredMemories[prevIndex]);
  };

  // Handle touch gestures
  const handleTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.touches[0].clientX);

  const handleTouchMove = (e: React.TouchEvent) =>
    setTouchEnd(e.touches[0].clientX);

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) handleNext();
    else if (distance < -50) handlePrev();
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "Escape") setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, selectedFilteredIndex, filteredMemories]);

  return (
    <div className="min-h-screen  bg-black text-white  max-w-6xl md:mx-auto ">
      {/* Hero Section 😘*/}
      <MemoriesHero />

      {/* Filter and Image Grid Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        {/* Filter 😆 */}
        <MemoriesFilter
          categories={categories}
          setActiveFilter={setActiveFilter}
          activeFilter={activeFilter}
        />

        {/* Image Grid 📸  */}
        <MemoriesImageGrid
          filteredMemories={filteredMemories}
          setSelectedImage={setSelectedImage}
          setSelectedIndex={setSelectedIndex}
        />
      </div>
      {/*Memories Model 😄*/}
      <MemoriesModel
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        handleTouchStart={handleTouchStart}
        handleTouchEnd={handleTouchEnd}
        handleTouchMove={handleTouchMove}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    </div>
  );
};

export default ModernMemoriesPage;
