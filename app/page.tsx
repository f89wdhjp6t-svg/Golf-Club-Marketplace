"use client";

import { useRef, useState } from "react";
import { CLUBS, CONDITIONS, conditionBadgeBg, conditionColor } from "@/lib/clubs";
import { NEW_CLUBS } from "@/lib/newClubs";
import type { AIResult, Club, NewClub } from "@/lib/types";
import { ClubCard } from "@/components/ClubCard";
import { NewClubCard } from "@/components/NewClubCard";
import { PriceComparison } from "@/components/PriceComparison";
import { PhotoGallery } from "@/components/PhotoGallery";
import { AIResultBody } from "@/components/AIResultBody";
import { StarRating, SpecRow } from "@/components/Shared";
import { SellView } from "@/components/SellView";
import { FilterBar } from "@/components/FilterBar";

type View = "listing" | "detail" | "newDetail" | "sell";
type BuyTab = "used" | "new";
type InputMode = "text" | "photo";

const TYPES = ["All", "Driver", "Iron Set", "Wedge", "Fairway Wood", "Hybrid", "Putter"];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export default function App() {
  const [allClubs, setAllClubs] = useState<Club[]>(CLUBS);
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [myClubInput, setMyClubInput] = useState("");
  const [aiResult, setAiResult] = useState<AIResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("All");
  const [usedBrand, setUsedBrand] = useState("All");
  const [usedCondition, setUsedCondition] = useState("All");
  const [usedMinPrice, setUsedMinPrice] = useState("");
  const [usedMaxPrice, setUsedMaxPrice] = useState("");
  const [usedSort, setUsedSort] = useState("featured");
  const [newFilter, setNewFilter] = useState("All");
  const [newBrand, setNewBrand] = useState("All");
  const [newMinPrice, setNewMinPrice] = useState("");
  const [newMaxPrice, setNewMaxPrice] = useState("");
  const [newSort, setNewSort] = useState("featured");
  const [view, setView] = useState<View>("listing");
  const [buyTab, setBuyTab] = useState<BuyTab>("used");
  const [selectedNewClub, setSelectedNewClub] = useState<NewClub | null>(null);
  const [cartItems, setCartItems] = useState<Club[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [myClubPhoto, setMyClubPhoto] = useState<{ data: string; mediaType: string } | null>(null);
  const [myClubPhotoPreview, setMyClubPhotoPreview] = useState<string | null>(null);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [photoResult, setPhotoResult] = useState<AIResult | null>(null);
  const [inputMode, setInputMode] = useState<InputMode>("text");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const usedBrands = Array.from(new Set(allClubs.map((c) => c.brand))).sort();
  const newBrands = Array.from(new Set(NEW_CLUBS.map((c) => c.brand))).sort();

  const filtered = allClubs
    .filter((c) => filter === "All" || c.type === filter)
    .filter((c) => usedBrand === "All" || c.brand === usedBrand)
    .filter((c) => usedCondition === "All" || c.condition === usedCondition)
    .filter((c) => !usedMinPrice || c.price >= Number(usedMinPrice))
    .filter((c) => !usedMaxPrice || c.price <= Number(usedMaxPrice))
    .sort((a, b) => {
      if (usedSort === "price-asc") return a.price - b.price;
      if (usedSort === "price-desc") return b.price - a.price;
      return 0;
    });

  const hasUsedFilters =
    filter !== "All" ||
    usedBrand !== "All" ||
    usedCondition !== "All" ||
    usedMinPrice !== "" ||
    usedMaxPrice !== "" ||
    usedSort !== "featured";

  const resetUsedFilters = () => {
    setFilter("All");
    setUsedBrand("All");
    setUsedCondition("All");
    setUsedMinPrice("");
    setUsedMaxPrice("");
    setUsedSort("featured");
  };

  const filteredNewClubs = NEW_CLUBS
    .filter((c) => newFilter === "All" || c.type === newFilter)
    .filter((c) => newBrand === "All" || c.brand === newBrand)
    .filter((c) => !newMinPrice || c.msrp >= Number(newMinPrice))
    .filter((c) => !newMaxPrice || c.msrp <= Number(newMaxPrice))
    .sort((a, b) => {
      if (newSort === "price-asc") return a.msrp - b.msrp;
      if (newSort === "price-desc") return b.msrp - a.msrp;
      return 0;
    });

  const hasNewFilters =
    newFilter !== "All" || newBrand !== "All" || newMinPrice !== "" || newMaxPrice !== "" || newSort !== "featured";

  const resetNewFilters = () => {
    setNewFilter("All");
    setNewBrand("All");
    setNewMinPrice("");
    setNewMaxPrice("");
    setNewSort("featured");
  };

  const handleSelectClub = (club: Club) => {
    setSelectedClub(club);
    setAiResult(null);
    setPhotoResult(null);
    setMyClubInput("");
    setMyClubPhoto(null);
    setMyClubPhotoPreview(null);
    setView("detail");
    window.scrollTo(0, 0);
  };

  const handleSelectNewClub = (club: NewClub) => {
    setSelectedNewClub(club);
    setView("newDetail");
    window.scrollTo(0, 0);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const d = ev.target?.result as string;
      const [prefix, data] = d.split(",");
      const mediaType = /data:(.*);base64/.exec(prefix)?.[1] || file.type || "image/jpeg";
      setMyClubPhoto({ data, mediaType });
      setMyClubPhotoPreview(d);
      setPhotoResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyzePhoto = async () => {
    if (!myClubPhoto || !selectedClub) return;
    setPhotoLoading(true);
    setPhotoResult(null);
    try {
      const res = await fetch("/api/analyze-photo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          club: selectedClub,
          imageBase64: myClubPhoto.data,
          mediaType: myClubPhoto.mediaType,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Analysis failed");
      setPhotoResult(data);
    } catch (err) {
      setPhotoResult({
        error: err instanceof Error ? err.message : "Could not analyze the photo. Please try a clearer image.",
      } as AIResult);
    }
    setPhotoLoading(false);
  };

  const handleAnalyzeText = async () => {
    if (!myClubInput.trim() || !selectedClub) return;
    setLoading(true);
    setAiResult(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ club: selectedClub, myClubInput }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Analysis failed");
      setAiResult(data);
    } catch (err) {
      setAiResult({
        error: err instanceof Error ? err.message : "Could not analyze. Please try again.",
      } as AIResult);
    }
    setLoading(false);
  };

  const addToCart = (club: Club) => {
    if (!cartItems.find((c) => c.id === club.id)) setCartItems([...cartItems, club]);
  };
  const inCart = selectedClub && cartItems.find((c) => c.id === selectedClub.id);
  const totalCart = cartItems.reduce((a, c) => a + c.price, 0);
  const activeResult = inputMode === "photo" ? photoResult : aiResult;
  const activeLoading = inputMode === "photo" ? photoLoading : loading;

  const navBtn = (label: string, targetView: View) => (
    <button
      onClick={() => setView(targetView)}
      style={{
        background: view === targetView ? "#16a34a" : "transparent",
        border: view === targetView ? "none" : "1.5px solid rgba(255,255,255,0.2)",
        borderRadius: 20,
        padding: "7px 18px",
        color: "#fff",
        fontWeight: 700,
        fontSize: 13,
        cursor: "pointer",
        transition: "all 0.15s",
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", minHeight: "100vh", background: "#f8fafc" }}>
      <header
        style={{
          background: "#0f1f0f",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 60,
          position: "sticky",
          top: 0,
          zIndex: 100,
          borderBottom: "2px solid #16a34a",
          boxShadow: "0 2px 16px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setView("listing")}>
            <span style={{ fontSize: 22 }}>⛳</span>
            <span style={{ fontFamily: "'Georgia', serif", fontWeight: 700, fontSize: 20, color: "#fff" }}>
              FairwayFind
            </span>
          </div>
          <div style={{ display: "flex", gap: 6, marginLeft: 8 }}>
            {navBtn("🛍️ Buy", "listing")}
            {navBtn("💰 Sell", "sell")}
          </div>
        </div>
        <button
          onClick={() => setCartOpen(!cartOpen)}
          style={{
            background: cartItems.length ? "#16a34a" : "transparent",
            border: "1.5px solid #16a34a",
            borderRadius: 20,
            padding: "6px 18px",
            color: cartItems.length ? "#fff" : "#16a34a",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          🛒 {cartItems.length > 0 ? `${cartItems.length} · $${totalCart}` : "Cart"}
        </button>
      </header>

      {cartOpen && (
        <div
          style={{
            position: "fixed",
            top: 60,
            right: 0,
            width: 340,
            background: "#fff",
            boxShadow: "-4px 0 32px rgba(0,0,0,0.14)",
            zIndex: 200,
            borderLeft: "2px solid #e5e7eb",
            padding: 20,
            maxHeight: "calc(100vh - 60px)",
            overflowY: "auto",
          }}
        >
          <div style={{ fontFamily: "'Georgia', serif", fontWeight: 700, fontSize: 20, marginBottom: 16 }}>
            🛒 Your Cart
          </div>
          {cartItems.length === 0 ? (
            <p style={{ color: "#9ca3af", fontSize: 14 }}>No items yet.</p>
          ) : (
            cartItems.map((c) => (
              <div key={c.id} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: "1px solid #f3f4f6", alignItems: "center" }}>
                <div style={{ width: 60, height: 60, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
                  <img
                    src={c.photos[0]}
                    alt={c.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#111", lineHeight: 1.3 }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>
                    {c.condition} · {c.type}
                  </div>
                </div>
                <div style={{ fontWeight: 800, color: "#16a34a", fontSize: 16 }}>${c.price}</div>
              </div>
            ))
          )}
          {cartItems.length > 0 && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, padding: "14px 0 10px", fontSize: 16 }}>
                <span>Total</span>
                <span style={{ color: "#16a34a" }}>${totalCart}</span>
              </div>
              <button
                style={{ width: "100%", background: "#16a34a", color: "#fff", border: "none", borderRadius: 12, padding: "14px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}
              >
                Checkout →
              </button>
            </>
          )}
        </div>
      )}

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "28px 16px" }}>
        {view === "sell" && (
          <SellView
            onListingCreated={(newListing) => {
              setAllClubs((prev) => [newListing, ...prev]);
              setView("listing");
              setBuyTab("used");
              resetUsedFilters();
            }}
          />
        )}

        {view === "listing" && (
          <>
            <div
              style={{
                background: "linear-gradient(135deg, #0f1f0f 0%, #14532d 100%)",
                borderRadius: 22,
                padding: "38px 36px",
                marginBottom: 28,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", right: -10, top: -10, fontSize: 120, opacity: 0.06, transform: "rotate(15deg)" }}>
                ⛳
              </div>
              <div style={{ fontFamily: "'Georgia', serif", fontSize: 30, fontWeight: 700, color: "#fff", marginBottom: 10 }}>
                Find Your Next Fairway Weapon
              </div>
              <p style={{ color: "#86efac", fontSize: 15, maxWidth: 500, margin: "0 0 20px" }}>
                AI-powered club analysis, photo scanning, and price comparison — all in one place.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => setView("sell")}
                  style={{ background: "#16a34a", color: "#fff", border: "none", borderRadius: 20, padding: "9px 22px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}
                >
                  💰 Sell Your Clubs →
                </button>
              </div>
            </div>

            {/* Used / New sub-tabs */}
            <div style={{ display: "flex", gap: 4, background: "#e5e7eb", borderRadius: 14, padding: 4, marginBottom: 22, maxWidth: 340 }}>
              {(
                [
                  ["used", "♻️ Used Clubs"],
                  ["new", "✨ New Clubs"],
                ] as const
              ).map(([tab, label]) => (
                <button
                  key={tab}
                  onClick={() => setBuyTab(tab)}
                  style={{
                    flex: 1,
                    padding: "10px 8px",
                    borderRadius: 10,
                    background: buyTab === tab ? "#fff" : "transparent",
                    border: "none",
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: "pointer",
                    color: buyTab === tab ? "#111" : "#6b7280",
                    boxShadow: buyTab === tab ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                    transition: "all 0.15s",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {buyTab === "used" && (
              <>
                <div style={{ display: "flex", gap: 8, marginBottom: 22, flexWrap: "wrap" }}>
                  {TYPES.map((t) => (
                    <button
                      key={t}
                      onClick={() => setFilter(t)}
                      style={{
                        background: filter === t ? "#16a34a" : "#fff",
                        color: filter === t ? "#fff" : "#374151",
                        border: filter === t ? "1.5px solid #16a34a" : "1.5px solid #e5e7eb",
                        borderRadius: 20,
                        padding: "7px 18px",
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <FilterBar
                  brands={usedBrands}
                  brand={usedBrand}
                  onBrandChange={setUsedBrand}
                  conditions={CONDITIONS}
                  condition={usedCondition}
                  onConditionChange={setUsedCondition}
                  minPrice={usedMinPrice}
                  onMinPriceChange={setUsedMinPrice}
                  maxPrice={usedMaxPrice}
                  onMaxPriceChange={setUsedMaxPrice}
                  sort={usedSort}
                  onSortChange={setUsedSort}
                  sortOptions={SORT_OPTIONS}
                  onReset={resetUsedFilters}
                  hasActiveFilters={hasUsedFilters}
                />
                <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 16, fontWeight: 500 }}>
                  {filtered.length} used club{filtered.length === 1 ? "" : "s"} available
                </div>
                {filtered.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "48px 0", color: "#9ca3af" }}>
                    <div style={{ fontSize: 32, marginBottom: 10 }}>🔍</div>
                    <p style={{ fontSize: 14, margin: 0 }}>No clubs match these filters. Try widening your search.</p>
                  </div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
                    {filtered.map((c) => (
                      <ClubCard key={c.id} club={c} onSelect={handleSelectClub} />
                    ))}
                  </div>
                )}
              </>
            )}

            {buyTab === "new" && (
              <>
                <div style={{ display: "flex", gap: 8, marginBottom: 22, flexWrap: "wrap" }}>
                  {TYPES.map((t) => (
                    <button
                      key={t}
                      onClick={() => setNewFilter(t)}
                      style={{
                        background: newFilter === t ? "#16a34a" : "#fff",
                        color: newFilter === t ? "#fff" : "#374151",
                        border: newFilter === t ? "1.5px solid #16a34a" : "1.5px solid #e5e7eb",
                        borderRadius: 20,
                        padding: "7px 18px",
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <FilterBar
                  brands={newBrands}
                  brand={newBrand}
                  onBrandChange={setNewBrand}
                  minPrice={newMinPrice}
                  onMinPriceChange={setNewMinPrice}
                  maxPrice={newMaxPrice}
                  onMaxPriceChange={setNewMaxPrice}
                  sort={newSort}
                  onSortChange={setNewSort}
                  sortOptions={SORT_OPTIONS}
                  onReset={resetNewFilters}
                  hasActiveFilters={hasNewFilters}
                />
                <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 16, fontWeight: 500 }}>
                  {filteredNewClubs.length} new club{filteredNewClubs.length === 1 ? "" : "s"} · compare prices across retailers
                </div>
                {filteredNewClubs.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "48px 0", color: "#9ca3af" }}>
                    <div style={{ fontSize: 32, marginBottom: 10 }}>🔍</div>
                    <p style={{ fontSize: 14, margin: 0 }}>No clubs match these filters. Try widening your search.</p>
                  </div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
                    {filteredNewClubs.map((c) => (
                      <NewClubCard key={c.id} club={c} onSelect={handleSelectNewClub} />
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}

        {view === "detail" && selectedClub && (
          <div>
            <button
              onClick={() => setView("listing")}
              style={{ background: "none", border: "none", color: "#16a34a", fontWeight: 700, fontSize: 14, cursor: "pointer", marginBottom: 20, padding: 0 }}
            >
              ← Back to listings
            </button>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div style={{ background: "#fff", borderRadius: 18, overflow: "hidden", border: "1.5px solid #e5e7eb", padding: 16 }}>
                  <PhotoGallery photos={selectedClub.photos} name={selectedClub.name} />
                </div>
                <div style={{ background: "#fff", borderRadius: 18, padding: 22, border: "1.5px solid #e5e7eb" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#16a34a", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>
                    {selectedClub.brand} · {selectedClub.type} · {selectedClub.year}
                  </div>
                  <h1 style={{ fontFamily: "'Georgia', serif", fontSize: 22, fontWeight: 700, margin: "0 0 8px", lineHeight: 1.3 }}>
                    {selectedClub.name}
                  </h1>
                  <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 14px", lineHeight: 1.6 }}>{selectedClub.description}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <span
                      style={{
                        background: conditionBadgeBg[selectedClub.condition],
                        color: conditionColor[selectedClub.condition],
                        fontSize: 12,
                        fontWeight: 700,
                        borderRadius: 20,
                        padding: "4px 14px",
                        border: `1.5px solid ${conditionColor[selectedClub.condition]}50`,
                      }}
                    >
                      {selectedClub.condition}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 10 }}>
                    <span style={{ fontSize: 32, fontWeight: 900, color: "#16a34a" }}>${selectedClub.price}</span>
                    <span style={{ fontSize: 15, color: "#9ca3af", textDecoration: "line-through" }}>${selectedClub.originalPrice}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#16a34a", background: "#f0fdf4", borderRadius: 8, padding: "3px 10px" }}>
                      Save ${selectedClub.originalPrice - selectedClub.price}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
                    <StarRating value={selectedClub.rating} />
                    <span style={{ fontSize: 13, color: "#6b7280" }}>
                      {selectedClub.rating} ({selectedClub.reviews} reviews) · <strong>{selectedClub.seller}</strong>
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(selectedClub)}
                    style={{
                      width: "100%",
                      background: inCart ? "#d1fae5" : "#16a34a",
                      color: inCart ? "#16a34a" : "#fff",
                      border: inCart ? "2px solid #16a34a" : "none",
                      borderRadius: 12,
                      padding: "14px",
                      fontWeight: 700,
                      fontSize: 15,
                      cursor: "pointer",
                    }}
                  >
                    {inCart ? "✓ Added to Cart" : `Add to Cart — $${selectedClub.price}`}
                  </button>
                </div>
                <div style={{ background: "#fff", borderRadius: 18, padding: 22, border: "1.5px solid #e5e7eb" }}>
                  <h2 style={{ fontFamily: "'Georgia', serif", fontSize: 16, fontWeight: 700, margin: "0 0 14px" }}>Full Specifications</h2>
                  <SpecRow label="Type" value={selectedClub.type} />
                  <SpecRow label="Loft" value={selectedClub.loft} />
                  <SpecRow label="Shaft" value={selectedClub.shaft} />
                  <SpecRow label="Head Size" value={selectedClub.specs.headSize} />
                  <SpecRow label="Adjustable" value={selectedClub.specs.adjustable ? "Yes" : "No"} />
                  <SpecRow label="Forgiveness" value={selectedClub.specs.forgiveness} />
                  <SpecRow label="Distance" value={selectedClub.specs.distance} />
                  <SpecRow label="Spin" value={selectedClub.specs.spin} />
                  <SpecRow label="Face Material" value={selectedClub.specs.material} />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div style={{ background: "#fff", borderRadius: 18, padding: 22, border: "1.5px solid #e5e7eb" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <span style={{ fontSize: 22 }}>🤖</span>
                    <div>
                      <h2 style={{ fontFamily: "'Georgia', serif", fontSize: 17, fontWeight: 700, margin: 0 }}>AI Club Advisor</h2>
                      <div style={{ fontSize: 12, color: "#9ca3af" }}>Get a personalized buy verdict</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", background: "#f3f4f6", borderRadius: 12, padding: 4, marginBottom: 18, gap: 4 }}>
                    {(
                      [
                        ["text", "✏️ Type Your Club"],
                        ["photo", "📷 Photo Scan"],
                      ] as const
                    ).map(([mode, label]) => (
                      <button
                        key={mode}
                        onClick={() => {
                          setInputMode(mode);
                          setAiResult(null);
                          setPhotoResult(null);
                        }}
                        style={{
                          flex: 1,
                          padding: "9px 4px",
                          borderRadius: 9,
                          background: inputMode === mode ? "#fff" : "transparent",
                          border: inputMode === mode ? "1.5px solid #e5e7eb" : "1.5px solid transparent",
                          fontWeight: 700,
                          fontSize: 13,
                          cursor: "pointer",
                          color: inputMode === mode ? "#111" : "#6b7280",
                          boxShadow: inputMode === mode ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  {inputMode === "text" && (
                    <>
                      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 12, lineHeight: 1.5 }}>
                        Tell us what club you currently use and our AI caddy will tell you if this is a real upgrade.
                      </p>
                      <input
                        value={myClubInput}
                        onChange={(e) => setMyClubInput(e.target.value)}
                        placeholder="e.g. 2020 TaylorMade SIM Driver..."
                        style={{ width: "100%", border: "1.5px solid #d1d5db", borderRadius: 10, padding: "12px 14px", fontSize: 14, outline: "none", boxSizing: "border-box", marginBottom: 10 }}
                        onFocus={(e) => (e.target.style.borderColor = "#16a34a")}
                        onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                        onKeyDown={(e) => e.key === "Enter" && handleAnalyzeText()}
                      />
                      <button
                        onClick={handleAnalyzeText}
                        disabled={loading || !myClubInput.trim()}
                        style={{
                          width: "100%",
                          background: loading || !myClubInput.trim() ? "#e5e7eb" : "#0f1f0f",
                          color: loading || !myClubInput.trim() ? "#9ca3af" : "#fff",
                          border: "none",
                          borderRadius: 10,
                          padding: "13px",
                          fontWeight: 700,
                          fontSize: 14,
                          cursor: "pointer",
                        }}
                      >
                        {loading ? "Analyzing..." : "Analyze & Compare →"}
                      </button>
                    </>
                  )}

                  {inputMode === "photo" && (
                    <>
                      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 14, lineHeight: 1.5 }}>
                        Take or upload a photo of your club — AI will identify it and compare.
                      </p>
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        style={{
                          border: myClubPhotoPreview ? "none" : "2px dashed #d1d5db",
                          borderRadius: 14,
                          cursor: "pointer",
                          marginBottom: 14,
                          overflow: "hidden",
                          background: myClubPhotoPreview ? "transparent" : "#fafafa",
                          minHeight: myClubPhotoPreview ? 0 : 130,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                        onMouseEnter={(e) => !myClubPhotoPreview && (e.currentTarget.style.borderColor = "#16a34a")}
                        onMouseLeave={(e) => !myClubPhotoPreview && (e.currentTarget.style.borderColor = "#d1d5db")}
                      >
                        {myClubPhotoPreview ? (
                          <div style={{ position: "relative" }}>
                            <img
                              src={myClubPhotoPreview}
                              alt="your club"
                              style={{ width: "100%", maxHeight: 220, objectFit: "cover", display: "block", borderRadius: 14 }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                background: "rgba(0,0,0,0.55)",
                                color: "#fff",
                                fontSize: 12,
                                padding: "8px",
                                fontWeight: 600,
                                textAlign: "center",
                                borderRadius: "0 0 14px 14px",
                              }}
                            >
                              Tap to change photo
                            </div>
                          </div>
                        ) : (
                          <>
                            <div style={{ fontSize: 40, marginBottom: 8 }}>📷</div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>Upload or take a photo</div>
                            <div style={{ fontSize: 12, color: "#9ca3af" }}>Best with good lighting</div>
                          </>
                        )}
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handlePhotoUpload}
                        style={{ display: "none" }}
                      />
                      {myClubPhotoPreview && (
                        <div style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "stretch" }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: "#6b7280", marginBottom: 5, textTransform: "uppercase" }}>
                              📷 Your Club
                            </div>
                            <img
                              src={myClubPhotoPreview}
                              alt="your club"
                              style={{ width: "100%", height: 100, objectFit: "cover", borderRadius: 10, border: "2px solid #e5e7eb", display: "block" }}
                            />
                          </div>
                          <div style={{ display: "flex", alignItems: "center", fontSize: 18, color: "#9ca3af", fontWeight: 700, paddingTop: 20 }}>
                            ↔
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: "#16a34a", marginBottom: 5, textTransform: "uppercase" }}>
                              🏷️ Listing
                            </div>
                            <img
                              src={selectedClub.photos[0]}
                              alt="listing"
                              style={{ width: "100%", height: 100, objectFit: "cover", borderRadius: 10, border: "2px solid #16a34a", display: "block" }}
                            />
                          </div>
                        </div>
                      )}
                      <button
                        onClick={handleAnalyzePhoto}
                        disabled={photoLoading || !myClubPhoto}
                        style={{
                          width: "100%",
                          background: photoLoading || !myClubPhoto ? "#e5e7eb" : "#0f1f0f",
                          color: photoLoading || !myClubPhoto ? "#9ca3af" : "#fff",
                          border: "none",
                          borderRadius: 10,
                          padding: "13px",
                          fontWeight: 700,
                          fontSize: 14,
                          cursor: "pointer",
                        }}
                      >
                        {photoLoading ? "Scanning your club..." : "📷 Scan & Compare →"}
                      </button>
                    </>
                  )}
                </div>

                {activeLoading && (
                  <div style={{ background: "#fff", borderRadius: 18, padding: 32, border: "1.5px solid #e5e7eb", textAlign: "center" }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>⛳</div>
                    <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>
                      {inputMode === "photo" ? "AI is scanning your club..." : "Consulting your AI caddy..."}
                    </p>
                  </div>
                )}

                {inputMode === "photo" && photoResult && !photoResult.error && (
                  <div style={{ background: "#fff", borderRadius: 18, border: "1.5px solid #e5e7eb", overflow: "hidden" }}>
                    <div style={{ background: "#0f1f0f", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 10, color: "#86efac", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                          AI Identified Your Club
                        </div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginTop: 3 }}>{photoResult.identifiedClub}</div>
                      </div>
                      <span
                        style={{
                          background: photoResult.confidence === "High" ? "#16a34a" : photoResult.confidence === "Medium" ? "#eab308" : "#ef4444",
                          color: "#fff",
                          fontSize: 11,
                          fontWeight: 700,
                          borderRadius: 20,
                          padding: "4px 12px",
                        }}
                      >
                        {photoResult.confidence} Confidence
                      </span>
                    </div>
                    {photoResult.conditionNote && (
                      <div style={{ padding: "10px 20px", background: "#fffbeb", borderBottom: "1px solid #fef3c7", fontSize: 12, color: "#92400e" }}>
                        <strong>Condition note:</strong> {photoResult.conditionNote}
                      </div>
                    )}
                    <AIResultBody result={photoResult} myClubLabel={photoResult.identifiedClub || "club"} />
                  </div>
                )}

                {inputMode === "text" && aiResult && !aiResult.error && (
                  <div style={{ background: "#fff", borderRadius: 18, border: "1.5px solid #e5e7eb", overflow: "hidden" }}>
                    <AIResultBody result={aiResult} myClubLabel={myClubInput} />
                  </div>
                )}

                {activeResult?.error && (
                  <div style={{ background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 14, padding: 16 }}>
                    <p style={{ color: "#ef4444", fontSize: 13, margin: 0 }}>{activeResult.error}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {view === "newDetail" && selectedNewClub && (
          <div>
            <button
              onClick={() => setView("listing")}
              style={{ background: "none", border: "none", color: "#16a34a", fontWeight: 700, fontSize: 14, cursor: "pointer", marginBottom: 20, padding: 0 }}
            >
              ← Back to listings
            </button>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div style={{ background: "#fff", borderRadius: 18, overflow: "hidden", border: "1.5px solid #e5e7eb", padding: 16 }}>
                  <PhotoGallery photos={selectedNewClub.photos} name={selectedNewClub.name} />
                </div>
                <div style={{ background: "#fff", borderRadius: 18, padding: 22, border: "1.5px solid #e5e7eb" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#16a34a", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>
                    {selectedNewClub.brand} · {selectedNewClub.type} · {selectedNewClub.year}
                  </div>
                  <h1 style={{ fontFamily: "'Georgia', serif", fontSize: 22, fontWeight: 700, margin: "0 0 8px", lineHeight: 1.3 }}>
                    {selectedNewClub.name}
                  </h1>
                  <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 14px", lineHeight: 1.6 }}>{selectedNewClub.description}</p>
                  <span
                    style={{
                      display: "inline-block",
                      background: "#eff6ff",
                      color: "#1d4ed8",
                      fontSize: 12,
                      fontWeight: 700,
                      borderRadius: 20,
                      padding: "4px 14px",
                      marginBottom: 14,
                      border: "1.5px solid #93c5fd",
                    }}
                  >
                    Brand New
                  </span>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 700, textTransform: "uppercase" }}>MSRP</span>
                    <span style={{ fontSize: 32, fontWeight: 900, color: "#111" }}>${selectedNewClub.msrp}</span>
                  </div>
                  <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>
                    See the price comparison panel to find the best current price →
                  </p>
                </div>
                <div style={{ background: "#fff", borderRadius: 18, padding: 22, border: "1.5px solid #e5e7eb" }}>
                  <h2 style={{ fontFamily: "'Georgia', serif", fontSize: 16, fontWeight: 700, margin: "0 0 14px" }}>Full Specifications</h2>
                  <SpecRow label="Type" value={selectedNewClub.type} />
                  <SpecRow label="Loft" value={selectedNewClub.loft} />
                  <SpecRow label="Shaft" value={selectedNewClub.shaft} />
                  <SpecRow label="Head Size" value={selectedNewClub.specs.headSize} />
                  <SpecRow label="Adjustable" value={selectedNewClub.specs.adjustable ? "Yes" : "No"} />
                  <SpecRow label="Forgiveness" value={selectedNewClub.specs.forgiveness} />
                  <SpecRow label="Distance" value={selectedNewClub.specs.distance} />
                  <SpecRow label="Spin" value={selectedNewClub.specs.spin} />
                  <SpecRow label="Face Material" value={selectedNewClub.specs.material} />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <PriceComparison club={selectedNewClub} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
