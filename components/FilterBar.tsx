"use client";

export interface SortOption {
  value: string;
  label: string;
}

const selectStyle: React.CSSProperties = {
  border: "1.5px solid #e5e7eb",
  borderRadius: 10,
  padding: "8px 12px",
  fontSize: 13,
  fontWeight: 600,
  color: "#374151",
  background: "#fff",
  cursor: "pointer",
  outline: "none",
};

const priceInputStyle: React.CSSProperties = {
  width: 84,
  border: "1.5px solid #e5e7eb",
  borderRadius: 10,
  padding: "8px 10px",
  fontSize: 13,
  outline: "none",
  color: "#111",
};

export function FilterBar({
  brands,
  brand,
  onBrandChange,
  conditions,
  condition,
  onConditionChange,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
  sort,
  onSortChange,
  sortOptions,
  onReset,
  hasActiveFilters,
}: {
  brands: string[];
  brand: string;
  onBrandChange: (v: string) => void;
  conditions?: string[];
  condition?: string;
  onConditionChange?: (v: string) => void;
  minPrice: string;
  onMinPriceChange: (v: string) => void;
  maxPrice: string;
  onMaxPriceChange: (v: string) => void;
  sort: string;
  onSortChange: (v: string) => void;
  sortOptions: SortOption[];
  onReset: () => void;
  hasActiveFilters: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
        alignItems: "center",
        background: "#fff",
        border: "1.5px solid #e5e7eb",
        borderRadius: 14,
        padding: "12px 14px",
        marginBottom: 18,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <label style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase" }}>
          Brand
        </label>
        <select style={selectStyle} value={brand} onChange={(e) => onBrandChange(e.target.value)}>
          <option value="All">All Brands</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {conditions && (
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <label style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase" }}>
            Condition
          </label>
          <select
            style={selectStyle}
            value={condition}
            onChange={(e) => onConditionChange?.(e.target.value)}
          >
            <option value="All">Any Condition</option>
            {conditions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <label style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase" }}>
          Price Range
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <input
            type="number"
            min={0}
            placeholder="Min"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            style={priceInputStyle}
          />
          <span style={{ color: "#9ca3af", fontSize: 13 }}>–</span>
          <input
            type="number"
            min={0}
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            style={priceInputStyle}
          />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <label style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase" }}>
          Sort By
        </label>
        <select style={selectStyle} value={sort} onChange={(e) => onSortChange(e.target.value)}>
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {hasActiveFilters && (
        <button
          onClick={onReset}
          style={{
            marginLeft: "auto",
            alignSelf: "flex-end",
            background: "none",
            border: "1.5px solid #e5e7eb",
            borderRadius: 10,
            padding: "8px 14px",
            fontSize: 12,
            fontWeight: 700,
            color: "#6b7280",
            cursor: "pointer",
          }}
        >
          ✕ Reset Filters
        </button>
      )}
    </div>
  );
}
